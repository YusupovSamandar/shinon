import React from 'react'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';


export default function PreWorkup({ checksData, setChecksData, checksSection }) {
    return (
        <div>
            {checksData[checksSection].details.map((analysis, indx) => (
                <FormControlLabel
                    style={{ display: "block" }}
                    key={indx}
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
            ))}
        </div>
    );
}
