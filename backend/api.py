from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from backend.chatbot import ask_chatbot

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    question: str


@app.post("/chat")
def chat(request: ChatRequest):

    answer = ask_chatbot(request.question)

    return {
        "answer": answer
    }