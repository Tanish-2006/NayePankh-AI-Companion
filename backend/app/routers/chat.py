from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import uuid

from app.database import get_db
from app.models.user import User
from app.models.chat import ChatHistory, ChatMessage
from app.schemas.chat import ChatRequest, ChatResponse
from app.middleware.auth import get_current_user
from app.services.ai_service import ai_service

router = APIRouter(prefix="/api/chat", tags=["Chat"])


@router.post("/", response_model=ChatResponse)
async def chat(
    data: ChatRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    session_id = data.session_id or str(uuid.uuid4())

    session = db.query(ChatHistory).filter(
        ChatHistory.session_id == session_id
    ).first()

    if not session:
        session = ChatHistory(session_id=session_id, user_id=current_user.id)
        db.add(session)
        db.commit()

    history = db.query(ChatMessage).filter(
        ChatMessage.session_id == session_id
    ).order_by(ChatMessage.created_at.asc()).all()

    history_list = [{"role": m.role, "content": m.content} for m in history]

    user_msg = ChatMessage(session_id=session_id, role="user", content=data.message)
    db.add(user_msg)

    reply = await ai_service.chat(data.message, history_list)

    ai_msg = ChatMessage(session_id=session_id, role="assistant", content=reply)
    db.add(ai_msg)
    db.commit()

    return ChatResponse(reply=reply, session_id=session_id)


@router.get("/history")
def get_chat_history(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    sessions = db.query(ChatHistory).filter(
        ChatHistory.user_id == current_user.id
    ).order_by(ChatHistory.created_at.desc()).all()

    result = []
    for session in sessions:
        messages = db.query(ChatMessage).filter(
            ChatMessage.session_id == session.session_id
        ).order_by(ChatMessage.created_at.asc()).all()
        result.append({
            "session_id": session.session_id,
            "title": session.title,
            "messages": [
                {"role": m.role, "content": m.content, "created_at": m.created_at.isoformat() if m.created_at else None}
                for m in messages
            ],
            "created_at": session.created_at.isoformat() if session.created_at else None,
        })
    return result
