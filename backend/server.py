from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import asyncio
from backend import data_layer
from backend import control_layer
from pydantic import BaseModel

app = FastAPI()

# Allow frontend to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

# This defines what the POST /mode request body looks like
class ModeRequest(BaseModel):
    mode: str

# Connect to SITL when server starts
@app.on_event("startup")
async def startup():
    data_layer.connect()
    print("SITL connected!")

# REST endpoint - get telemetry once
@app.get("/telemetry")
def get_telemetry():
    return data_layer.get_telemetry()

# REST endpoint - change flight mode
@app.post("/mode")
def change_mode(request: ModeRequest):
    return control_layer.set_flight_mode(request.mode)

# WebSocket endpoint - push telemetry every second
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await asyncio.get_event_loop().run_in_executor(
                None, data_layer.get_telemetry
            )
            await websocket.send_json(data)
            await asyncio.sleep(1)
    except Exception as e:
        print(f"WebSocket disconnected: {e}")
