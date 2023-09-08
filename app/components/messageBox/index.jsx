import * as React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import List from "../lists";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    lineHeight: '2',
    overflow: "auto",
    width: '100%'
}));


export default function Elevation({ primary, time, editor }) {
    return (
        // <ThemeProvider theme={lightTheme}>
        <Item elevation={1}>
            <List
                primary={primary}
                time={time}
                editor={editor}
            />
        </Item>
        // </ThemeProvider>
    );
}