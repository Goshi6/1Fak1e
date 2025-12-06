# app/lessons_routes.py

from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import get_async_session
from app.models import Course, Section, Material

router = APIRouter(
    prefix="",
    tags=["lessons"],
)


# ===== Pydantic-схемы для публичного API =====

class MaterialPublic(BaseModel):
    id: int
    title: str
    content: Optional[str] = None
    external_url: Optional[str] = None
    order: int

    class Config:
        orm_mode = True


class SectionPublic(BaseModel):
    id: int
    type: str
    title: str
    materials: List[MaterialPublic]

    class Config:
        orm_mode = True


class CoursePublic(BaseModel):
    id: int
    title: str
    description: Optional[str] = None

    class Config:
        orm_mode = True


class CourseWithTheory(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    sections: List[SectionPublic]

    class Config:
        orm_mode = True


# ===== Публичные эндпоинты =====

@router.get("/courses", response_model=List[CoursePublic])
async def list_public_courses(
    session: AsyncSession = Depends(get_async_session),
):
    """
    Список активных курсов для вкладки 'Теория'.
    """
    result = await session.execute(
        select(Course)
        .where(Course.is_active == True)  # noqa: E712
        .order_by(Course.order, Course.id)
    )
    courses = result.scalars().all()
    return courses


@router.get("/courses/{course_id}/theory", response_model=CourseWithTheory)
async def get_course_theory(
    course_id: int,
    session: AsyncSession = Depends(get_async_session),
):
    """
    Курс со всеми секциями и материалами:
    Лекции / Записи / Гайды / Трансляции.
    """
    course = await session.get(Course, course_id)
    if not course or not course.is_active:
        raise HTTPException(status_code=404, detail="Course not found")

    # Загружаем секции курса
    result_sections = await session.execute(
        select(Section)
        .where(Section.course_id == course_id)
        .order_by(Section.id)
    )
    sections = result_sections.scalars().all()

    sections_public: List[SectionPublic] = []

    for section in sections:
        # Для каждой секции загружаем материалы
        result_materials = await session.execute(
            select(Material)
                .where(
                    Material.section_id == section.id,
                    Material.is_published == True,  # noqa: E712
                )
                .order_by(Material.order, Material.id)
        )
        material_models = result_materials.scalars().all()

        materials_public = [
            MaterialPublic.from_orm(m) for m in material_models
        ]

        sections_public.append(
            SectionPublic(
                id=section.id,
                type=section.type,
                title=section.title,
                materials=materials_public,
            )
        )

    return CourseWithTheory(
        id=course.id,
        title=course.title,
        description=course.description,
        sections=sections_public,
    )
