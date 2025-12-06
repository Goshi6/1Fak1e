# app/admin_routes.py

from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Response, status
from pydantic import BaseModel

from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import get_async_session
from app.models import Course, Section, Material

router = APIRouter(
    prefix="/admin",
    tags=["admin"],
)


# ====== auth-заглушка: потом сюда проверку is_admin ======

async def admin_required():
    # TODO: заменить на реальную проверку JWT/куки и флага is_admin
    return True


# ====== Pydantic-схемы ======

class CourseBase(BaseModel):
    title: str
    description: Optional[str] = None
    order: int = 0
    is_active: bool = True


class CourseOut(CourseBase):
    id: int

    class Config:
        orm_mode = True


class SectionBase(BaseModel):
    course_id: int
    type: str        # "lectures" | "records" | "guides" | "streams"
    title: str


class SectionOut(SectionBase):
    id: int

    class Config:
        orm_mode = True


class MaterialBase(BaseModel):
    section_id: int
    title: str
    content: Optional[str] = None
    external_url: Optional[str] = None
    order: int = 0
    is_published: bool = True


class MaterialOut(MaterialBase):
    id: int

    class Config:
        orm_mode = True


# ====== CRUD: COURSES ======

@router.get("/courses", response_model=List[CourseOut])
async def list_courses(
    response: Response,
    _=Depends(admin_required),
    session: AsyncSession = Depends(get_async_session),
):
    total = await session.scalar(select(func.count()).select_from(Course))
    response.headers["X-Total-Count"] = str(total or 0)

    result = await session.execute(
        select(Course).order_by(Course.order, Course.id)
    )
    courses = result.scalars().all()
    return courses


@router.get("/courses/{course_id}", response_model=CourseOut)
async def get_course(
    course_id: int,
    _=Depends(admin_required),
    session: AsyncSession = Depends(get_async_session),
):
    course = await session.get(Course, course_id)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course


@router.post("/courses", response_model=CourseOut, status_code=status.HTTP_201_CREATED)
async def create_course(
    payload: CourseBase,
    _=Depends(admin_required),
    session: AsyncSession = Depends(get_async_session),
):
    course = Course(**payload.dict())
    session.add(course)
    await session.commit()
    await session.refresh(course)
    return course


@router.put("/courses/{course_id}", response_model=CourseOut)
async def update_course(
    course_id: int,
    payload: CourseBase,
    _=Depends(admin_required),
    session: AsyncSession = Depends(get_async_session),
):
    course = await session.get(Course, course_id)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    for key, value in payload.dict().items():
        setattr(course, key, value)

    await session.commit()
    await session.refresh(course)
    return course


@router.delete("/courses/{course_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_course(
    course_id: int,
    _=Depends(admin_required),
    session: AsyncSession = Depends(get_async_session),
):
    course = await session.get(Course, course_id)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    await session.delete(course)
    await session.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)


# ====== CRUD: SECTIONS ======

@router.get("/sections", response_model=List[SectionOut])
async def list_sections(
    response: Response,
    course_id: Optional[int] = None,
    _=Depends(admin_required),
    session: AsyncSession = Depends(get_async_session),
):
    query = select(Section)
    if course_id is not None:
        query = query.where(Section.course_id == course_id)

    total = await session.scalar(
        select(func.count()).select_from(query.subquery())
    )
    response.headers["X-Total-Count"] = str(total or 0)

    result = await session.execute(
        query.order_by(Section.course_id, Section.id)
    )
    sections = result.scalars().all()
    return sections


@router.get("/sections/{section_id}", response_model=SectionOut)
async def get_section(
    section_id: int,
    _=Depends(admin_required),
    session: AsyncSession = Depends(get_async_session),
):
    section = await session.get(Section, section_id)
    if not section:
        raise HTTPException(status_code=404, detail="Section not found")
    return section


@router.post("/sections", response_model=SectionOut, status_code=status.HTTP_201_CREATED)
async def create_section(
    payload: SectionBase,
    _=Depends(admin_required),
    session: AsyncSession = Depends(get_async_session),
):
    section = Section(**payload.dict())
    session.add(section)
    await session.commit()
    await session.refresh(section)
    return section


@router.put("/sections/{section_id}", response_model=SectionOut)
async def update_section(
    section_id: int,
    payload: SectionBase,
    _=Depends(admin_required),
    session: AsyncSession = Depends(get_async_session),
):
    section = await session.get(Section, section_id)
    if not section:
        raise HTTPException(status_code=404, detail="Section not found")

    for key, value in payload.dict().items():
        setattr(section, key, value)

    await session.commit()
    await session.refresh(section)
    return section


@router.delete("/sections/{section_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_section(
    section_id: int,
    _=Depends(admin_required),
    session: AsyncSession = Depends(get_async_session),
):
    section = await session.get(Section, section_id)
    if not section:
        raise HTTPException(status_code=404, detail="Section not found")

    await session.delete(section)
    await session.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)


# ====== CRUD: MATERIALS ======

@router.get("/materials", response_model=List[MaterialOut])
async def list_materials(
    response: Response,
    section_id: Optional[int] = None,
    _=Depends(admin_required),
    session: AsyncSession = Depends(get_async_session),
):
    query = select(Material)
    if section_id is not None:
        query = query.where(Material.section_id == section_id)

    total = await session.scalar(
        select(func.count()).select_from(query.subquery())
    )
    response.headers["X-Total-Count"] = str(total or 0)

    result = await session.execute(
        query.order_by(Material.section_id, Material.order, Material.id)
    )
    materials = result.scalars().all()
    return materials


@router.get("/materials/{material_id}", response_model=MaterialOut)
async def get_material(
    material_id: int,
    _=Depends(admin_required),
    session: AsyncSession = Depends(get_async_session),
):
    material = await session.get(Material, material_id)
    if not material:
        raise HTTPException(status_code=404, detail="Material not found")
    return material


@router.post("/materials", response_model=MaterialOut, status_code=status.HTTP_201_CREATED)
async def create_material(
    payload: MaterialBase,
    _=Depends(admin_required),
    session: AsyncSession = Depends(get_async_session),
):
    material = Material(**payload.dict())
    session.add(material)
    await session.commit()
    await session.refresh(material)
    return material


@router.put("/materials/{material_id}", response_model=MaterialOut)
async def update_material(
    material_id: int,
    payload: MaterialBase,
    _=Depends(admin_required),
    session: AsyncSession = Depends(get_async_session),
):
    material = await session.get(Material, material_id)
    if not material:
        raise HTTPException(status_code=404, detail="Material not found")

    for key, value in payload.dict().items():
        setattr(material, key, value)

    await session.commit()
    await session.refresh(material)
    return material


@router.delete("/materials/{material_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_material(
    material_id: int,
    _=Depends(admin_required),
    session: AsyncSession = Depends(get_async_session),
):
    material = await session.get(Material, material_id)
    if not material:
        raise HTTPException(status_code=404, detail="Material not found")

    await session.delete(material)
    await session.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
