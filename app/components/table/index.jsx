"use client"
import React, { useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useDispatch } from 'react-redux';


export const Example = ({ headers, data, setNewData }) => {
    const dispach = useDispatch();

    const columns = useMemo(
        //column definitions...
        () => headers,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
        //end
    );

    const handleSaveRow = async ({ exitEditingMode, row, values }) => {
        //if using flat data and simple accessorKeys/ids, you can just do a simple assignment here.
        let tempCloneData = [...data];
        tempCloneData[row.index] = values;
        //send/receive api updates here
        dispach(setNewData([...tempCloneData]));
        exitEditingMode(); //required to exit editing mode
    };

    return (
        <MaterialReactTable
            columns={columns}
            data={data}
            enableRowActions
            renderRowActions={({ row, table }) => (
                <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
                    <IconButton
                        color="secondary"
                        onClick={() => {
                            table.setEditingRow(row);
                        }}
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        color="error"
                        onClick={() => {
                            if (
                                !confirm(`Are you sure you want to delete ${row.getValue('fullName')}`)
                            ) {
                                return;
                            }
                            let tempCloneData = [...data];
                            tempCloneData.splice(row.index, 1); //assuming simple data table
                            dispach(setNewData([...tempCloneData]))
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Box>
            )}
            onEditingRowSave={handleSaveRow}
        />
    );
};

export default Example;
