import React, { useCallback, useEffect, useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import axios from "@/app/axiosInstance";
import { API_URL } from "@/app/apiConfig";

const Example = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState(() => []);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    (async function () {
      const response = await axios.get(`${API_URL}/api/hospitals`);
      setTableData(response.data);
    })();
  }, []);

  const handleCreateNewRow = async (values) => {
    if (values.hospitalName.length > 0) {
      const response = await axios.post(`${API_URL}/api/hospitals`, values);
      if (response.status) {
        setTableData([...tableData, values]);
      }
    }
  };

  const handleDeleteRow = useCallback(
    (row) => {
      if (
        !confirm(
          `Are you sure you want to delete ${row.getValue("hospitalName")}`
        )
      ) {
        return;
      }
      //send api delete request here, then refetch or update local table data for re-render
      (async function () {
        const response = await axios.delete(
          `${API_URL}/api/hospitals/${tableData[row.index].hospitalName}`
        );
        console.log(response);
        if (response.status === 200) {
          tableData.splice(row.index, 1);
          setTableData([...tableData]);
        }
      })();
    },
    [tableData]
  );

  const columns = [
    {
      accessorKey: "hospitalName",
      header: "Hospital",
    },
    {
      accessorKey: "desc",
      header: "Description",
    },
  ];

  return (
    <>
      <MaterialReactTable
        displayColumnDefOptions={{
          "mrt-row-actions": {
            muiTableHeadCellProps: {
              align: "left"
            },
            size: 10,
          },
        }}
        columns={columns}
        data={tableData}
        editingMode="modal" //default
        enableColumnOrdering
        enableEditing
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: "flex" }}>
            <Tooltip arrow title="Delete">
              <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <Button
            color="secondary"
            onClick={() => setCreateModalOpen(true)}
            variant="contained"
          >
            Add Hospital
          </Button>
        )}
      />
      <CreateNewAccountModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
    </>
  );
};

//example of creating a mui dialog modal for creating new rows
export const CreateNewAccountModal = ({ open, columns, onClose, onSubmit }) => {
  const [inputTxt, setInputTxt] = useState("create");
  const [values, setValues] = useState(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ""] = "";
      return acc;
    }, {})
  );

  const handleSubmit = async () => {
    //put your validation logic here
    setInputTxt("creating");
    await onSubmit(values);
    setInputTxt("create");
    onClose();
    setValues(() =>
      columns.reduce((acc, column) => {
        acc[column.accessorKey ?? ""] = "";
        return acc;
      }, {})
    );
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create New Hospital</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: "100%",
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              gap: "1.5rem",
            }}
          >
            {columns.map((column) => (
              <TextField
                key={column.accessorKey}
                label={column.header}
                name={column.accessorKey}
                onChange={(e) => {
                  setValues({
                    ...values,
                    [e.target.name]: e.target.value.trim(),
                  });
                }}
              />
            ))}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button
          onClick={() => {
            onClose();
            setValues(() =>
              columns.reduce((acc, column) => {
                acc[column.accessorKey ?? ""] = "";
                return acc;
              }, {})
            );
          }}
        >
          Cancel
        </Button>
        <Button
          disabled={inputTxt === "creating"}
          color="secondary"
          onClick={handleSubmit}
          variant="contained"
        >
          {inputTxt}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Example;
