import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Add } from '@mui/icons-material';
import { Box, Container } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { addNewForm, addNewQuestion, getForms } from '../services/api';
import Toast from '../components/Toast';

function HomePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formsData, getFormsData] = useState([]);
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFormsData = async () => {
      const res = await getForms();
      getFormsData(res.data);
      console.log(res);
      if (res.code === 'ERR_NETWORK') {
        res.message = 'ERR_NETWORK';
        setOpen(true);
        setAlertMessage(res.message);
        setLoading(false);
      } else if (res.status === 'fail') {
        setOpen(true);
        setAlertMessage(res.message);
        setLoading(false);
      }

      if (
        res.message === 'INVALID_REFRESH_TOKEN' ||
        res.message === 'REFRESH_TOKEN_EXPIRED'
      ) {
        navigate('/login');
      }
    };

    fetchFormsData();
  }, []);

  const createFormFn = async () => {
    setLoading(true);
    const res = await addNewForm();
    console.log('ADDED FORM', res);
    if (res.code === 'ERR_NETWORK') {
      res.message = 'ERR_NETWORK';
      setOpen(true);
      setAlertMessage(res.message);
      setLoading(false);
    } else if (res.status === 'fail') {
      setOpen(true);
      setAlertMessage(res.message);
      setLoading(false);
    }
    if (res.status === 'success') {
      const { addedForm } = res.data;
      console.log('addedForm', addedForm);
      const questionRes = await addNewQuestion(addedForm._id);
      if (questionRes.code === 'ERR_NETWORK') {
        questionRes.message = 'ERR_NETWORK';
        setOpen(true);
        setAlertMessage(questionRes.message);
        setLoading(false);
      } else if (questionRes.status === 'fail') {
        setOpen(true);
        setAlertMessage(questionRes.message);
        setLoading(false);
      }
      console.log(questionRes);
      setLoading(false);
    }
    setLoading(false);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Container component="section" sx={{ px: 0, mt: 2, position: 'relative' }}>
      {open && (
        <Toast
          open={open}
          handleClose={handleClose}
          alertMessage={t(alertMessage)}
          status="error"
        />
      )}
      <Box sx={{ textAlign: 'right' }}>
        <LoadingButton
          sx={{ color: '#fff' }}
          variant="contained"
          endIcon={<Add />}
          loading={loading}
          onClick={createFormFn}
        >
          New Form
        </LoadingButton>
      </Box>
    </Container>
  );
}

export default HomePage;
