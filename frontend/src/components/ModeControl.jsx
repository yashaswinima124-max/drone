function ModeControl({ onModeChange, status, currentMode }) {
    const modes = [
        { name: 'STABILIZE', icon: '🎮' },
        { name: 'ALT_HOLD', icon: '📏' },
        { name: 'LOITER', icon: '🔄' },
    ];

    return (
        <div style={styles.container}>
            <p style={styles.label}>FLIGHT MODE</p>
            <div style={styles.buttonRow}>
                {modes.map((mode) => {
                    const isActive = currentMode === mode.name;
                    return (
                        <button
                            key={mode.name}
                            onClick={() => onModeChange(mode.name)}
                            style={{
                                ...styles.button,
                                background: isActive ? '#00bfff' : 'transparent',
                                color: isActive ? '#000' : '#00bfff',
                                boxShadow: isActive ? '0 0 12px #00bfff55' : 'none',
                            }}
                        >
                            <span style={styles.icon}>{mode.icon}</span>
                            <span style={styles.modeName}>{mode.name}</span>
                        </button>
                    );
                })}
            </div>
            {status && (
                <p style={{
                    ...styles.status,
                    color: status.includes('✅') ? '#00ff88' : '#ff4444'
                }}>
                    {status}
                </p>
            )}
        </div>
    );
}

const styles = {
    container: {
        padding: '12px 16px',
        background: '#1a1a1a',
        borderRadius: '8px',
        margin: '0 16px 16px 16px',
        border: '1px solid #2a2a2a',
    },
    label: {
        color: '#666',
        fontSize: '11px',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        margin: '0 0 10px 0',
    },
    buttonRow: {
        display: 'flex',
        gap: '10px',
    },
    button: {
        padding: '8px 18px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '12px',
        fontWeight: 'bold',
        letterSpacing: '1px',
        border: '1px solid #00bfff',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        transition: 'all 0.2s',
        fontFamily: 'monospace',
    },
    icon: {
        fontSize: '14px',
    },
    modeName: {
        fontSize: '11px',
    },
    status: {
        marginTop: '10px',
        fontSize: '12px',
        margin: '10px 0 0 0',
    }
};

export default ModeControl;
