import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';



export default function AlignItemsList({ reportList, ptName }) {


    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        lineHeight: '60px',
    }));

    return (
        <Item elevation={0}>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>

                <div>
                    <ListItem alignItems="flex-start">
                        <div>
                            <React.Fragment>
                                <Typography style={{ color: "rgb(25, 118, 210)" }} gutterBottom>
                                    {ptName}
                                </Typography>
                                {reportList.map((report, indx) => (
                                    <div key={indx}>
                                        <div style={{ display: "flex" }} >
                                            <DoneAllIcon style={{ color: "#0ea2bd" }} fontSize={'small'} />
                                            <Typography style={{ paddingLeft: "10px", display: "inline-block" }} gutterBottom>
                                                <span >
                                                    {report.content}
                                                </span>
                                            </Typography>
                                        </div>
                                        {/* <Typography component={'div'} style={{ display: "flex", alignItems: "center", gap: "10px" }} gutterBottom>
                                            <div style={{ backgroundColor: "#333", width: "10px", height: "1px" }}></div>
                                            <p style={{ fontSize: "0.8rem" }}><i>{report.editor}</i></p>
                                        </Typography> */}
                                    </div>
                                ))}
                            </React.Fragment>
                        </div>
                    </ListItem>
                </div>

                <Divider variant="inset" style={{ margin: "0 20px" }} component="li" />
            </List>
        </Item>
    );
}