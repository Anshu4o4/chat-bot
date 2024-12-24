import React, { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import './Chatbot.css'; 
import { reportWebVitals } from 'web-vitals';

function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false); 

    const sendMessage = async () => {
        if (input.trim() === '') return;

        const userMessage = { sender: 'user', text: input };
        setMessages([...messages, userMessage]);
        
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/chat', { query: input });
            const botMessage = { sender: 'bot', text: response.data.answer };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            const errorMessage = { sender: 'bot', text: 'Error connecting to server.' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false); 
            setInput('');
        }
    };

    return (
        <Box sx={{ width: 400, margin: '0 auto', padding: 2 }}>
            <Paper elevation={5} className="paper" sx={{ padding: 2 }}>
                <Typography variant="h5" align="center" sx={{ fontWeight: 'bold', color: '#fff' }}>Chat with Us</Typography>
                <Box sx={{ maxHeight: 350, overflowY: 'auto', marginBottom: 2 }}>
                    {messages.map((msg, index) => (
                        <Box key={index} className={`message ${msg.sender}`}>
                            <Typography variant="body1">
                                {msg.sender === 'user' ? "You" : "Bot"}: {msg.text}
                            </Typography>
                        </Box>
                    ))}
                    {isLoading && (
                        <Box className="message bot">
                            <Typography variant="body1">Bot is typing...</Typography>
                        </Box>
                    )}
                </Box>
                <Box display="flex">
                    <TextField
                        variant="outlined"
                        fullWidth
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        sx={{
                            borderRadius: '20px',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderRadius: '20px',
                                },
                            },
                        }}
                    />
                    <Button variant="contained" color="secondary" onClick={sendMessage} sx={{ borderRadius: '20px', marginLeft: 1 }}>Send</Button>
                </Box>
            </Paper>
        </Box>
    );
}

export default Chatbot;
