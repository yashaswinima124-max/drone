from pymavlink import mavutil
from backend import data_layer

MODE_IDS = {
    "STABILIZE": 0,
    "ALT_HOLD":  2,
    "LOITER":    5
}

def set_flight_mode(mode_name):
    mode_id = MODE_IDS.get(mode_name.upper())
    
    if mode_id is None:
        return {"success": False, "error": "Unknown mode"}
    
    data_layer.connection.mav.set_mode_send(
        data_layer.connection.target_system,
        mavutil.mavlink.MAV_MODE_FLAG_CUSTOM_MODE_ENABLED,
        mode_id
    )
    
    return {"success": True, "mode": mode_name}
