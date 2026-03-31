from pymavlink import mavutil

connection = None

def connect():
    global connection
    connection = mavutil.mavlink_connection('udp:127.0.0.1:14550')
    connection.wait_heartbeat()
    print("Connected to SITL!")

def get_telemetry():
    msg_gps = connection.recv_match(type='GLOBAL_POSITION_INT', blocking=True, timeout=1)
    msg_bat = connection.recv_match(type='BATTERY_STATUS', blocking=True, timeout=1)
    msg_hb  = connection.recv_match(type='HEARTBEAT', blocking=True, timeout=1)

    return {
        "altitude": msg_gps.relative_alt / 1000 if msg_gps else None,
        "lat":      msg_gps.lat / 1e7 if msg_gps else None,
        "lon":      msg_gps.lon / 1e7 if msg_gps else None,
        "vx":       msg_gps.vx / 100 if msg_gps else None,
        "vy":       msg_gps.vy / 100 if msg_gps else None,
        "vz":       msg_gps.vz / 100 if msg_gps else None,
        "heading":  msg_gps.hdg / 100 if msg_gps else None,
        "battery":  msg_bat.voltages[0] / 1000 if msg_bat else None,
        "mode":     get_flight_mode(msg_hb) if msg_hb else None
    
    }

def get_flight_mode(heartbeat_msg):
    mode_map = {0: "STABILIZE", 2: "ALT_HOLD", 5: "LOITER", 4: "GUIDED", 6: "RTL", 3: "AUTO"}
    print(f"Mode number received: {heartbeat_msg.custom_mode}")
    return mode_map.get(heartbeat_msg.custom_mode, "UNKNOWN")
