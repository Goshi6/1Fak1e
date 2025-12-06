# app/models.py

from sqlalchemy import (
    BigInteger,
    Column,
    String,
    ForeignKey,
    DateTime,
    func,
    UniqueConstraint,
    Integer,
    Boolean,
    Text,
)
from sqlalchemy.orm import relationship

from .db import Base


class User(Base):
    __tablename__ = "users"

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    email = Column(String(255), unique=True, nullable=True)
    name = Column(String(255), nullable=True)
    avatar_url = Column(String(512), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    oauth_accounts = relationship(
        "OAuthAccount",
        back_populates="user",
        cascade="all, delete-orphan",
    )


class OAuthAccount(Base):
    __tablename__ = "oauth_accounts"

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    user_id = Column(
        BigInteger,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
    )
    # 'google', 'yandex', 'faceit', ...
    provider = Column(String(32), nullable=False)
    # google sub, yandex id, faceit player_id и т.п.
    provider_user_id = Column(String(255), nullable=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="oauth_accounts")

    __table_args__ = (
        UniqueConstraint("provider", "provider_user_id", name="uq_provider_user"),
    )


# ================= КУРСЫ / ТЕОРИЯ =================


class Course(Base):
    __tablename__ = "courses"

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    order = Column(Integer, nullable=False, default=0)
    is_active = Column(Boolean, nullable=False, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    sections = relationship(
        "Section",
        back_populates="course",
        cascade="all, delete-orphan",
    )


class Section(Base):
    __tablename__ = "sections"

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    course_id = Column(
        BigInteger,
        ForeignKey("courses.id", ondelete="CASCADE"),
        nullable=False,
    )
    # "lectures" | "records" | "guides" | "streams"
    type = Column(String(32), nullable=False)
    title = Column(String(255), nullable=False)

    course = relationship("Course", back_populates="sections")
    materials = relationship(
        "Material",
        back_populates="section",
        cascade="all, delete-orphan",
    )

    __table_args__ = (
        UniqueConstraint("course_id", "type", name="uq_course_section_type"),
    )


class Material(Base):
    __tablename__ = "materials"

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    section_id = Column(
        BigInteger,
        ForeignKey("sections.id", ondelete="CASCADE"),
        nullable=False,
    )
    title = Column(String(255), nullable=False)
    content = Column(Text, nullable=True)        # для текста/описания
    external_url = Column(String(1024), nullable=True)  # ссылка на видео/стрим/гайд
    order = Column(Integer, nullable=False, default=0)
    is_published = Column(Boolean, nullable=False, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    section = relationship("Section", back_populates="materials")
