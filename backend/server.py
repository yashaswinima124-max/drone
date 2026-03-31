from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import asyncio
from backend import data_layer
from backend import control_layer
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

class ModeRequest(BaseModel):
    mode: str

@app.on_event("startup")
async def startup():
    data_layer.connect()
    print("SITL connected!")

@app.get("/telemetry")
def get_telemetry():
    return data_layer.get_telemetry()

@app.post("/mode")
def change_mode(request: ModeRequest):
    return control_layer.set_flight_mode(request.mode)

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await asyncio.get_event_loop().run_in_executor(
                None, data_layer.get_telemetry
            )
            await websocket.send_json(data)
            await asyncio.sleep(0.1)
    except Exception as e:
        print(f"WebSocket disconnected: {e}")
