import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SendIcon from '@mui/icons-material/Send';

export default function CustomizedInputBase() {
    const [inputText, setInputText] = React.useState('');

    const handleSendUpdate = () => {
        alert("good")
    }

    return (
        <>

            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', position: 'fixed', bottom: '0', width: "100%", borderTop: "1px solid #F7F7F7" }}
                onSubmit={(e) => {
                    e.preventDefault();
                    // Send the Message to the server
                    handleSendUpdate();
                }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    value={inputText}
                    onChange={(e) => {
                        setInputText(e.target.value);
                    }}
                    placeholder="type update..."
                    inputProps={{ 'aria-label': 'search google maps' }}
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton onClick={handleSendUpdate} color="primary" sx={{ p: '10px' }} aria-label="directions">
                    <SendIcon />
                </IconButton>
            </Paper>
        </>
    );
}