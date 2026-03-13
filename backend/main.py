# from import
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests, os
from  dotenv import load_dotenv

load_dotenv()
app=FastAPI()

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_methods=["*"],
  allow_headers=["*"],
)

class Msg(BaseModel):
  text:str

# 허깅페이스 접속정보
HF_URL = "https://router.huggingface.co/v1/chat/completions"
HF_MODEL = "Qwen/Qwen2.5-72B-Instruct"

# 채팅요청함수
def ask_ai(q):
  token=os.getenv("HF_TOKEN")
  headers = {"Authorization": f"Bearer {token}"}
  payload={
    "model":HF_MODEL,
    "messages":[{"role":"user", "content":q}],
    "max_tokens":300
  }
  res=requests.post(HF_URL,headers=headers,json=payload)
  #json 자바스크립트 객체 문법와 유사한 데이터베이스 형식
  data=res.json()
  return data["choices"][0]["message"]["content"]
#스웨거
@app.post("/chat")
def chat(msg : Msg):
  reply=ask_ai(msg.text)
  return {"reply":reply}