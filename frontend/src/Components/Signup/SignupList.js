import React, { useState, useEffect } from "react";
import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Button,
  Modal,
  Typography,
  Container,
  Box,
  Paper,
  IconButton,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getFormsFromServer, removeTaskFromList, deleteFormsFromServer } from "../../Slice/UserSlice";
import DeleteIcon from "@mui/icons-material/Delete";

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196F3',
    },
    secondary: {
      main: '#FF5722',
    },
    error: {
      main: '#FF0000',
    },
  },
});

const SignupList = () => {
  const { FormList } = useSelector((state) => state.Forms);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFormsFromServer());
  }, [dispatch]);

  const deleteTask = (form) => {
    if (window.confirm("Are you sure you want to delete this Form?")) {
      console.log("Unwanted Form");
      dispatch(deleteFormsFromServer(form))
        .unwrap()
        .then(() => {
          dispatch(removeTaskFromList(form));
        });
    }
  };

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDelete = () => {
    setShowConfirmation(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Box mt={4}>
          <Typography variant="h4" align="center" color="error">
            Client Form List
          </Typography>
        </Box>
        <Paper
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(10px)",
            padding: "16px",
            borderRadius: "8px",
          }}
        >
          <Table striped bordered hover>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>created By</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {FormList &&
                FormList.map((form, index) => {
                  return (
                    <TableRow key={form.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        {form.username || form.username1}
                      </TableCell>
                      <TableCell>{form.email}</TableCell>
                      <TableCell>{form.createdby}</TableCell>
                      <TableCell>
                        <IconButton
                          color="error"
                          onClick={() => setShowConfirmation(true)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>

          <Modal open={showConfirmation} onClose={() => setShowConfirmation(false)}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 300,
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 2,
                textAlign: "center",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Confirmation
              </Typography>
              <Typography variant="body2">
                Are you sure you want to delete this Form?
              </Typography>
              <Box mt={2}>
                <Button variant="contained" color="default" onClick={() => setShowConfirmation(false)}>
                  Cancel
                </Button>
                <Button variant="contained" color="error" onClick={handleDelete}>
                  Delete
                </Button>
              </Box>
            </Box>
          </Modal>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default SignupList;
