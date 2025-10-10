from fastapi import FastAPI
from contextlib import asynccontextmanager
import uvicorn

from config import database
from handler.practice_sample_handler import router as practice_sample_router


# FastAPIアプリケーションのインスタンスを作成
app = FastAPI(
    docs_url="/docs",
    redoc_url="/redoc",
    title="Sample FastAPI Application",
)

# ルーターをアプリケーションに追加
# 例えば、ユーザー関連のエンドポイントをまとめたルーターを追加
# ここでは、practice_sample_handler.pyで定義したルーターを追加
app.include_router(practice_sample_router)

# アプリケーションの起動時にデータベース接続を確立
@app.on_event("startup")
async def startup():
    await database.connect()

# アプリケーションのシャットダウン時にデータベース接続を切断
@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

# 開発用サーバーの起動（localhost:8000でアクセス）
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)