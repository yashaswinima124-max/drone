
It is a simple web based control station 
This project does
1. connects to sitl running in computer
2. shows live telemetry data like altitude,battery,gps,speed etc
3. automatically updates data withour refreshing
4.you can also change the flight mode

used tech
Ardupilot
pymavlink
Fastapi
websocket
react.js

structure of project

drone_tel/
├── backend/
│   ├── data_layer.py      → connects to SITL and reads telemetry
│   ├── control_layer.py   → sends flight mode commands to drone
│   └── server.py          → FastAPI server with REST and WebSocket endpoints
└── frontend/
    └── src/
        ├── layers/
        │   ├── dataLayer.js      → receives telemetry via WebSocket
        │   └── controlLayer.js   → sends mode change commands to backend
        ├── components/
        │   ├── TelemetryPanel.jsx → displays telemetry cards
        │   └── ModeControl.jsx    → displays mode change buttons
        └── App.js                 → main component that ties everything together

how to set up and run

1. start sitl
cd ardupilot/ArduCopter
sim_vehicle.py -v ArduCopter --console --map

2.set up backend
cd drone_tel
python3 -m venv venv
source venv/bin/activate
pip install fastapi uvicorn pymavlink websockets
run backend
uvicorn backend.server:app --reload --port 8000

3.set up frontend
cd frontend
npm install
run frontend
npm start

open browser at  http://localhost:3000

data flow

SITL generates MAVLink messages
        ↓
data_layer.py reads GLOBAL_POSITION_INT, BATTERY_STATUS, HEARTBEAT
        ↓
converts units (mm to meters, mV to volts, cm/s to m/s)
        ↓
server.py pushes data every second via WebSocket
        ↓
dataLayer.js in browser receives the data
        ↓
App.js updates the state
        ↓
TelemetryPanel.jsx displays updated values on screen

control flow

User clicks LOITER button
        ↓
ModeControl.jsx calls onModeChange function
        ↓
App.js calls changeMode from controlLayer.js
        ↓
controlLayer.js sends POST request to /mode endpoint
        ↓
server.py receives request and calls control_layer.py
        ↓
control_layer.py converts LOITER to mode number 5
        ↓
sends MAVLink set_mode command to SITL
        ↓
SITL changes flight mode
        ↓
next HEARTBEAT message contains new mode
        ↓
WebSocket pushes updated telemetry to browser
        ↓
UI shows new mode and highlights the active button
