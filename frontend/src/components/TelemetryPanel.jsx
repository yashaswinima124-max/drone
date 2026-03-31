function TelemetryPanel({ data, connected }) {
    if (!data) return (
        <div style={styles.waiting}>
            <p>⏳ Waiting for telemetry...</p>
        </div>
    );

    return (
        <div style={styles.grid}>
            <Card title="✈️ Altitude" value={data.altitude?.toFixed(2)} unit="m" />
            <Card title="🔋 Battery" value={data.battery?.toFixed(2)} unit="V" color={data.battery < 11 ? '#ff4444' : '#00ff88'} />
            <Card title="🛸 Mode" value={data.mode} unit="" />
            <Card title="📡 Status" value={connected ? 'CONNECTED' : 'DISCONNECTED'} unit="" color={connected ? '#00ff88' : '#ff4444'} />
            <Card title="📍 Latitude" value={data.lat?.toFixed(6)} unit="°" />
            <Card title="📍 Longitude" value={data.lon?.toFixed(6)} unit="°" />
            <Card title="➡️ Speed X" value={data.vx?.toFixed(2)} unit="m/s" />
            <Card title="⬆️ Speed Y" value={data.vy?.toFixed(2)} unit="m/s" />
            <Card title="⬇️ Speed Z" value={data.vz?.toFixed(2)} unit="m/s" />
        </div>
    );
}

function Card({ title, value, unit, color }) {
    return (
        <div style={styles.card}>
            <p style={styles.cardTitle}>{title}</p>
            <p style={{ ...styles.cardValue, color: color || '#00bfff' }}>
                {value ?? '--'} <span style={styles.unit}>{unit}</span>
            </p>
        </div>
    );
}

const styles = {
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px',
        padding: '16px',
    },
    card: {
        background: '#1a1a1a',
        border: '1px solid #2a2a2a',
        borderRadius: '8px',
        padding: '12px 16px',
        textAlign: 'center',
    },
    cardTitle: {
        color: '#666',
        fontSize: '11px',
        marginBottom: '4px',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        margin: '0 0 6px 0',
    },
    cardValue: {
        fontSize: '18px',
        fontWeight: 'bold',
        margin: 0,
    },
    unit: {
        fontSize: '11px',
        color: '#555',
    },
    waiting: {
        color: '#888',
        textAlign: 'center',
        padding: '40px',
    }
};

export default TelemetryPanel;
