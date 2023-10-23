import React from 'react'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import DeleteIcon from '@mui/icons-material/Delete';


export default function PreWorkup({ checksData, setChecksData, checksSection }) {
    return (
        <div>
            {checksData[checksSection].details.map((analysis, indx) => (
                <div key={indx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <FormControlLabel
                        style={{ display: "block" }}
                        control={
                            <Checkbox
                                disabled={checksData[checksSection].complete}
                                checked={analysis.done}
                                onChange={() => {
                                    setChecksData((prev) => {
                                        const newCheckState = prev[checksSection].details.map((detail, detailIndx) => {
                                            if (detailIndx !== indx) {
                                                return detail
                                            } else {
                                                return {
                                                    ...detail,
                                                    done: !detail.done
                                                }
                                            }
                                        });
                                        return {
                                            ...prev,
                                            [checksSection]: {
                                                complete: prev[checksSection].complete,
                                                details: newCheckState
                                            }
                                        }
                                    });
                                }}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        }
                        label={analysis.analysis}
                    />
                    <IconButton onClick={() => {
                        setChecksData((prev) => {
                            const deletedState = { ...prev }
                            deletedState[checksSection].details = deletedState[checksSection].details.filter((detail, detailIndx) => indx !== detailIndx);
                            return deletedState;
                        });
                    }} aria-label="delete" size="large">
                        <DeleteIcon style={{ color: "red" }} />
                    </IconButton>
                </div>
            ))}
        </div>
    );
}
