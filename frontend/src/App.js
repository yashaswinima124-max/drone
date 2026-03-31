import { useEffect, useState } from 'react';
import { subscribeTelemetry, unsubscribe } from './layers/dataLayer';
import { changeMode } from './layers/controlLayer';
import TelemetryPanel from './components/TelemetryPanel';
import ModeControl from './components/ModeControl';

function App() {
    const [telemetry, setTelemetry] = useState(null);
    const [status, setStatus] = useState('');
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        subscribeTelemetry(
            (data) => {
                setTelemetry(data);
                setConnected(true);
            },
            () => setConnected(false)
        );
        return () => unsubscribe();
    }, []);

    const handleModeChange = async (mode) => {
        const result = await changeMode(mode);
        if (result.success) {
            setStatus('✅ Mode set to ' + mode);
        } else {
            setStatus('❌ Failed: ' + result.error);
        }
    };

    return (
        <div style={styles.app}>
            <div style={styles.header}>
                <h1 style={styles.title}>🚁 Drone Ground Control</h1>
                <p style={styles.subtitle}>SITL Integrated Interface</p>
            </div>
            <TelemetryPanel data={telemetry} connected={connected} />
            <ModeControl
                onModeChange={handleModeChange}
                status={status}
                currentMode={telemetry?.mode}
            />
        </div>
    );
}

const styles = {
    app: {
        background: '#121212',
        minHeight: '100vh',
        fontFamily: 'monospace',
        color: '#fff',
    },
    header: {
        padding: '24px',
        borderBottom: '1px solid #333',
        background: '#1a1a1a',
    },
    title: {
        margin: 0,
        fontSize: '24px',
        color: '#00bfff',
        letterSpacing: '2px',
    },
    subtitle: {
        margin: '4px 0 0 0',
        color: '#555',
        fontSize: '12px',
        letterSpacing: '1px',
    }
};

export default App;
