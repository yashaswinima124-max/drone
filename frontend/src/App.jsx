import { useEffect, useState } from 'react';
import { subscribeTelemetry, unsubscribe } from './layers/dataLayer';
import { changeMode } from './layers/controlLayer';
import TelemetryPanel from './components/TelemetryPanel';
import ModeControl from './components/ModeControl';

function App() {
    const [telemetry, setTelemetry] = useState(null);
    const [status, setStatus] = useState('');

    useEffect(() => {
        subscribeTelemetry((data) => {
            setTelemetry(data);
        });

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
        <div>
            <h1>Drone Ground Control</h1>
            <TelemetryPanel data={telemetry} />
            <ModeControl onModeChange={handleModeChange} status={status} />
        </div>
    );
}

export default App;
