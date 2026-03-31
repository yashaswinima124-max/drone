import axios from 'axios';

export async function changeMode(modeName) {
    try {
        const response = await axios.post('http://localhost:8000/mode', {
            mode: modeName
        });
        return response.data;
    } catch (err) {
        return { success: false, error: err.message };
    }
}
