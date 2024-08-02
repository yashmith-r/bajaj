import React, { useState } from 'react';
import axios from 'axios';
import './DataForm.css';  // Import the CSS file

const DataForm = ({ setResponse }) => {
    const [jsonInput, setJsonInput] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const parsedInput = JSON.parse(jsonInput);
            const {
                data = [],
                user_id = 'rajj',
                email = 'rajj123@gmail.com',
                roll_number = 'AP21110011218'
            } = parsedInput;

            if (!data || !Array.isArray(data)) {
                setError('Invalid input. Please provide data as an array.');
                return;
            }

            const response = await axios.post('https://bajaj-65le.onrender.com/bfhl', {
                data,
                user_id,
                email,
                roll_number
            });

            setResponse(response.data);
        } catch (error) {
            console.error('Error submitting form:', error); 
            setError('Invalid JSON input or server error.');
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="form">
                <textarea
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    placeholder='{"data": ["7", "H", "k", "R", "18"]}'
                    rows="10"
                    cols="50"
                    className="textarea"
                />
                <button
                    type="submit"
                    className="submit-button"
                >
                    Submit
                </button>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default DataForm;
