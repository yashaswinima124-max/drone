from pymavlink import mavutil

connection = mavutil.mavlink_connection('udp:127.0.0.1:14550')

connection.wait_heartbeat()
print("Connected to drone!")

while True:
    msg = connection.recv_match(
        type=['GLOBAL_POSITION_INT', 'BATTERY_STATUS', 'HEARTBEAT'],
        blocking=True
    )
    if msg:
        print(msg)
