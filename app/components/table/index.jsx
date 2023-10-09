"use client"
import React, { useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import axios from '@/app/axiosInstance';
import { API_URL } from '@/app/apiConfig';


export const Example = ({ headers, data, setNewData, hide }) => {
    const dispach = useDispatch();

    const columns = useMemo(
        //column definitions...
        () => headers,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
        //end
    );

    const handleSaveRow = async ({ exitEditingMode, row, values }) => {

        const edittingUserID = data[row.index]._id;
        const { data: edittedUser } = await axios.put(`${API_URL}/api/users/${edittingUserID}`, values);

        //if using flat data and simple accessorKeys/ids, you can just do a simple assignment here.
        let tempCloneData = [...data];
        tempCloneData[row.index] = edittedUser;
        //send/receive api updates here
        dispach(setNewData([...tempCloneData]));
        exitEditingMode(); //required to exit editing mode
    };

    return (
        <MaterialReactTable
            columns={columns}
            data={data}
            enableRowActions
            initialState={{
                columnVisibility: { [hide]: false }
            }}
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
                            (async function () {
                                const deleteResponse = await axios.delete(`${API_URL}/api/users/${data[row.index]._id}`);
                                if (deleteResponse.status === 200) {
                                    tempCloneData.splice(row.index, 1); //assuming simple data table
                                    dispach(setNewData([...tempCloneData]))
                                }
                            })()
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
