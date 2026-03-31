let socket = null;

export function subscribeTelemetry(onData, onDisconnect) {
    socket = new WebSocket('ws://localhost:8000/ws');

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        onData(data);
    };

    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
        if (onDisconnect) onDisconnect();
    };
}

export function unsubscribe() {
    if (socket) {
        socket.close();
    }
}
