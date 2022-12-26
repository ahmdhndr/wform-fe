import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Add } from '@mui/icons-material';
import { Box, Container } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { addNewForm, fetchForms } from '../features/forms/formsActions';
import { changeStatus, getAllForms } from '../features/forms/formsSlice';

function HomePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { status } = useSelector((state) => state.forms);
  const forms = useSelector((state) => getAllForms(state));
  const dispatch = useDispatch();

  console.log(forms);

  const createNewFormHandler = async () => {
    setLoading(true);
    await dispatch(addNewForm()).then((data) => {
      try {
        const formId = data.payload._id || '';
        if (formId.length > 0) {
          navigate(`/forms/${formId}/edit`);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    });
    dispatch(changeStatus({ status: 'idle' }));
    setLoading(false);
  };

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchForms()).then(() =>
        dispatch(changeStatus({ status: 'idle' }))
      );
    }
  }, []);

  return (
    <Container
      component="section"
      maxWidth={false}
      sx={{ px: '0 !important', position: 'relative' }}
    >
      <Box sx={{ textAlign: 'right', mt: 2, px: 3 }}>
        <LoadingButton
          sx={{ color: '#fff' }}
          variant="contained"
          endIcon={<Add />}
          loading={loading}
          onClick={createNewFormHandler}
        >
          New Form
        </LoadingButton>
      </Box>
    </Container>
  );
}

export default HomePage;
