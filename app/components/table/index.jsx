"use client"
import React, { useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { data as initialData } from './makeData';

export const Example = () => {
    const columns = useMemo(
        //column definitions...
        () => [
            {
                accessorKey: 'fullName',
                header: 'Full Name',
            },
            {
                accessorKey: 'password',
                header: 'Password',
            }
        ],
        [],
        //end
    );

    const [data, setData] = useState(initialData);

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
                            data.splice(row.index, 1); //assuming simple data table
                            setData([...data]);
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Box>
            )}
            onEditingRowSave={() => {
                console.log("asdasd");
            }}
        />
    );
};

export default Example;
