import { createSlice } from '@reduxjs/toolkit';
import { addNewForm, fetchForms, getFormById, updateForms } from './formsActions';

const initialState = {
  status: 'idle',
  forms: [],
  notification: {
    open: false,
    type: 'info',
    message: '',
  },
};

const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    changeStatus(state, action) {
      state.status = action.payload.status;
    },
    clearNotification(state) {
      state.notification.open = false;
      state.notification.type = 'info';
      state.notification.message = '';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchForms.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchForms.fulfilled, (state, action) => {
        state.status = 'succes';
        state.forms = action.payload.data.forms;
      })
      .addCase(fetchForms.rejected, (state, action) => {
        console.log(action.error);
        if (action.error.code) action.error.message = action.error.code;
        state.status = 'idle';
        state.notification = {
          open: true,
          type: 'error',
          message: action.error.message,
        };
      })
      .addCase(addNewForm.fulfilled, (state, action) => {
        state.notification = {
          open: true,
          type: 'success',
          message: 'CREATE_FORM_SUCCESS'
        };
        state.forms.items.push(action.payload);
        state.status = 'success';
      })
      .addCase(addNewForm.rejected, (state, action) => {
        if (action.error.code) action.error.message = action.error.code;
        state.notification = {
          open: true,
          type: 'error',
          message: action.error.message
        };
        state.status = 'idle';
      })
      .addCase(getFormById.fulfilled, (state) => {
        state.status = 'success';
      })
      .addCase(getFormById.rejected, (state, action) => {
        if (action.error.code) action.error.message = action.error.code;
        state.notification = {
          open: true,
          type: 'error',
          message: action.error.message
        };
        state.status = 'idle';
      })
      .addCase(updateForms.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateForms.fulfilled, (state) => {
        state.status = 'success';
      })
      .addCase(updateForms.rejected, (state, action) => {
        if (action.error.code) action.error.message = action.error.code;
        state.notification = {
          open: true,
          type: 'error',
          message: action.error.message
        };
        state.status = 'idle';
      });
  }

});

const { actions, reducer } = formsSlice;
export const { changeStatus, clearNotification, changeTitle, changeDesc } = actions;
export default reducer;

export const getAllForms = ((state) => state.forms.forms);
// export const getFormsById = ((state, formId) => state.forms.forms.items.find((form) => form._id === formId));