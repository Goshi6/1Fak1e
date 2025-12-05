# app/models.py
from sqlalchemy import (
    BigInteger,
    Column,
    String,
    ForeignKey,
    DateTime,
    func,
    UniqueConstraint,
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
