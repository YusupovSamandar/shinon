'use client'
import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import axios from '@/app/axiosInstance';
import { API_URL } from '@/app/apiConfig';
import { useRouter } from 'next/navigation';

export default function CustomizedInputBase({ updatingPatientId, updatePatientUpdates }) {
    const [inputText, setInputText] = React.useState('');
    const router = useRouter();

    const handleSendUpdate = async () => {
        const editorId = localStorage.getItem('currentUserID');
        if (editorId && inputText.length > 0) {
            const postedUpdate = await axios.post(`${API_URL}/api/updates`, {
                patientId: updatingPatientId,
                date: new Date().toISOString(),
                editorId,
                content: inputText
            });
            if (postedUpdate.status === 200) {
                updatePatientUpdates((prev) => [postedUpdate.data, ...prev]);
                setInputText('');
            }
        } else {
            router.push('/login');
        }
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
                <IconButton disabled={!(inputText.length > 0)} onClick={handleSendUpdate} color="primary" sx={{ p: '10px' }} aria-label="directions">
                    <SendIcon />
                </IconButton>
            </Paper>
        </>
    );
}