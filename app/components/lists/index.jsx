import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const SecondaryContent = ({ leftContent, rightContent }) => {
    return (
        <div style={{ display: "flex", justifyContent: "space-between", color: "#636363", padding: "0 16px" }}>
            <p>{rightContent}</p>
            <p>{leftContent}</p>
        </div>
    );
}

export default function FolderList({ primary, time, editor }) {
    return (
        <List sx={{ width: '100%', maxWidth: 360, backgroundColor: "#F7F7F7", padding: 0 }}>
            <ListItem>
                <ListItemText sx={{ color: 'rgba(0, 0, 0, 0.87)' }} primary={primary} />
            </ListItem>
            <SecondaryContent leftContent={time} rightContent={editor} />
        </List>
    );
}