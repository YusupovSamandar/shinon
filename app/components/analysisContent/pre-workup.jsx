import React from 'react'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';


export default function PreWorkup({ checksData, setChecksData }) {
    return (
        <div>
            {checksData.details.map((analysis, indx) => (
                <FormControlLabel
                    style={{ display: "block" }}
                    key={indx}
                    control={
                        <Checkbox
                            disabled={checksData.complete}
                            checked={analysis.done}
                            onChange={() => {
                                setChecksData((prev) => {
                                    const newCheckState = prev.details.map((detail, detailIndx) => {
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
                                        complete: prev.complete,
                                        details: newCheckState
                                    }
                                });
                            }}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                    }
                    label={analysis.analysisName}
                />
            ))}
        </div>
    );
}
