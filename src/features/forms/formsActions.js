import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from './internal';

const fetchForms = createAsyncThunk('forms/fetchForms', async () => {
  const response = await axiosInstance.get('/forms');
  return response;
});

const addNewForm = createAsyncThunk('forms/addNewForm', async () => {
  const sendRequest = async () => {
    const response = await axiosInstance.post('/forms', {
      title: 'Untitled form',
      description: 'Form description'
    });
    return response;
  };

  const { data } = await sendRequest();
  const response = await axiosInstance.post(`/forms/${data.newForm._id}/questions`, { question: 'Untitled question', type: 'text', required: false });
  const newForm = {
    ...data.newForm,
    questions: response.data.addedQuestion
  };
  return newForm;
});

const getFormById = createAsyncThunk('forms/getFormById', async (id, { title, description }) => {
  const response = await axiosInstance.get(`/forms/${id}`, { title, description });
  return response;
});

const updateForms = createAsyncThunk('forms/updateForms', async ({ id, title, description }) => {
  const response = await axiosInstance.put(`/forms/${id}`, { title, description });
  return response;
});

export { fetchForms, addNewForm, getFormById, updateForms };