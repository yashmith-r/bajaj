import React, { useState } from 'react';
import DataForm from './components/DataForm';
import ResponseDisplay from './components/ResponseDisplay';
import './App.css';

function App() {
    const [response, setResponse] = useState(null);

    return (
        <div className="App">
            <h1>yashmith Test</h1>
            <DataForm setResponse={setResponse} />
            {response && <ResponseDisplay response={response} />}
        </div>
    );
}

export default App;
