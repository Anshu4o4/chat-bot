import React from 'react';
import Chatbot from './components/Chatbot';
import { ThemeProvider, createTheme } from '@mui/material';

function App() {
    const theme = createTheme();

    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <header className="App-header">
                    <h1>E-commerce Sales Chatbot</h1>
                </header>
                <Chatbot />
            </div>
        </ThemeProvider>
    );
}

export default App;
