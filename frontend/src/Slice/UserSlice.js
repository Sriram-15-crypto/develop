// Importing necessary libraries and dependencies
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state of the FormsSlice
const initialState = {
    FormList:[],
    selectedTask:{},
    isLoading:false,
    error:''
}

// URL for server requests
const MY_URL = 'http://localhost:4008/signup'

// Async thunk for getting forms from the server
export const getFormsFromServer = createAsyncThunk(
    "Forms/getFormsFromServer",
    async (_,{rejectWithValue}) => {
        // Sending a fetch request to the server
        const response = await fetch('http://localhost:4008/signup/get')
        if (response.ok) {
            const jsonResponse = await response.json()
            return jsonResponse
        } else {
            return rejectWithValue({error:'Forms not Found'})
        }
    }
)

// Async thunk for adding forms to the server
export const addFormsToServer = createAsyncThunk(
    "Forms/addFormsToServer",
    async (form,{rejectWithValue}) => {
        // Configuring the request options
        const options = {
            method:'POST',
            body: JSON.stringify(form),
            headers: {
                "Content-type":"application/json",
                "Authorization": sessionStorage.getItem("authToken")
            }
        }
        // Retrieving authorization token from sessionStorage
        const token = sessionStorage.getItem("authToken")

        // Sending a fetch request to the server
        const response = await fetch('http://localhost:4008/signup',options)
        console.log(response)
        console.log("added successfully")

        if (response.ok) {
            const jsonResponse = await response.json()
            return jsonResponse
        } else {
            return rejectWithValue({error:'your form is not added'})
        }
    }
)

// Async thunk for deleting forms from the server
export const deleteFormsFromServer = createAsyncThunk(
    "Forms/deleteFormsFromServer",
    async (form,{rejectWithValue}) => {
        // Configuring the request options
        const options = {
            method:'DELETE',
        }
        // Sending a fetch request to the server
        const response = await fetch(`http://localhost:4008/signup/deletesignup/${form._id}`, options);
        if (response.ok) {
            const jsonResponse = await response.json()
            return jsonResponse
        } else {
            return rejectWithValue({error:'forms Not Delete'})
        }
    }
)

// Async thunk for sending a password reset email
export const sendPasswordResetEmail = createAsyncThunk(
    "User/sendPasswordResetEmail",
    async (email, thunkAPI) => {
      try {
        // Sending a POST request to the server
        const response = await axios.post(
          "http://localhost:4008/login/FORGOTPASSWORD",
          { email }
        );
        return response.data.message;
      } catch (error) {
        return thunkAPI.rejectWithValue("An error occurred");
      }
    }
);

// Async thunk for resetting password
export const resetPassword = createAsyncThunk(
    "User/resetPassword",
    async ({ token, passwords }, thunkAPI) => {
      try {
        // Sending a POST request to the server with the token in the URL
        const response = await fetch(
          `http://localhost:4008/RESETPASSWORD/${token}`, 
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ passwords }),
          }
        );
  
        const data = await response.json();
        return data.message;
      } catch (error) {
        return thunkAPI.rejectWithValue("An error occurred");
      }
    }
);  

// Creating the FormsSlice
const FormsSlice = createSlice({
    name:'FormsSlice',
    initialState,
    reducers: {
        // Reducer for removing a task from the list
        removeTaskFromList:(state,action) => {
            state.FormList = state.FormList.filter((form) => form.id !== action.payload.id)
        },
        // Reducer for setting a selected task
        setSelectedTask:(state,action) => {
            state.selectedTask = action.payload
        }
    },
    extraReducers:(builder) => {
        builder
            // Reducers for handling pending, fulfilled, and rejected states of getFormsFromServer
            .addCase(getFormsFromServer.pending,(state) => {
                state.isLoading = true
            })
            .addCase(getFormsFromServer.fulfilled,(state,action) => {
                state.isLoading = false
                state.error = ''
                state.FormList = action.payload
            })
            .addCase(getFormsFromServer.rejected,(state,action) => {
                state.isLoading = false
                state.FormList = []
            })
            // Reducers for handling pending, fulfilled, and rejected states of addFormsToServer
            .addCase(addFormsToServer.pending,(state) => {
                state.isLoading = true
            })
            .addCase(addFormsToServer.fulfilled,(state,action) => {
                state.isLoading = false
                state.error = ''
                state.FormList.push(action.payload)
            })
            .addCase(addFormsToServer.rejected,(state,action) => {
                state.isLoading = false
            })
            // Reducers for handling pending, fulfilled, and rejected states of deleteFormsFromServer
            .addCase(deleteFormsFromServer.pending,(state) => {
                state.isLoading = true
            })
            .addCase(deleteFormsFromServer.fulfilled,(state,action) => {
                state.isLoading = false
                state.error = ''
            })
            .addCase(deleteFormsFromServer.rejected,(state,action) => {
                state.isLoading = false
            })
            // Reducers for handling fulfilled state of sendPasswordResetEmail
            .addCase(sendPasswordResetEmail.fulfilled, (state, action) => {
                state.resetMessage = action.payload;
              })
              // Reducers for handling fulfilled and rejected states of resetPassword
              .addCase(resetPassword.fulfilled, (state, action) => {
                state.resetPassword.message = action.payload;
                state.resetPassword.error = "";
              })
              .addCase(resetPassword.rejected, (state, action) => {
                state.resetPassword.message = "";
                state.resetPassword.error = action.error.message;
              });
    }
})

// Exporting actions and reducer
export const {addTaskToList,removeTaskFromList,updateTaskInList,setSelectedTask} = FormsSlice.actions
export default FormsSlice.reducer
