import { Box, Card, Container, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import FormTabs from '../components/FormTabs';
import NotFoundPage from './NotFoundPage';
import { getFormById, updateForms } from '../features/forms/formsActions';
import { changeStatus } from '../features/forms/formsSlice';

const CustomTextField = styled(TextField)({
  '& .MuiInput-root:before': {
    borderBottom: '1px solid transparent',
  },
  '& .MuiInput-root:focus:before': {
    borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
  },
  '& .MuiInput-root:hover:not(.Mui-disabled):before': {
    borderBottom: '1px solid transparent',
  },
  '& .MuiInput-input': {
    fontSize: '24pt',
    fontWeight: 400,
    color: '#262626',
  },
});

function DetailForms() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.forms);
  const dispatch = useDispatch();
  const [initializing, setInitializing] = useState(true);
  const [form, setForm] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const getFormDetail = async () => {
      dispatch(getFormById(id)).then((result) => {
        dispatch(changeStatus({ status: 'idle' }));
        setInitializing(false);
        if (result.payload !== undefined) {
          const { data } = result.payload;
          setForm(data.form);
          setTitle(data.form.title);
          setDescription(data.form.description);
        } else if (
          result.error !== undefined &&
          result.error.message === 'FORBIDDEN_ACCESS'
        )
          navigate('/');
      });
    };
    getFormDetail();
  }, []);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (form !== null) {
      const delayFn = setTimeout(() => {
        dispatch(updateForms({ id, title, description })).then(() =>
          dispatch(changeStatus({ status: 'idle' }))
        );
      }, 700);
      return () => clearTimeout(delayFn);
    }
  }, [title, description]);

  if (initializing) {
    return null;
  }

  if (form === null) {
    return <NotFoundPage />;
  }

  return (
    <Container
      component="section"
      maxWidth={false}
      sx={{ px: '0 !important', position: 'relative' }}
    >
      <FormTabs status={status} />
      <Container maxWidth="md" sx={{ pt: '12px' }}>
        <Card
          sx={{
            bgcolor: '#fff',
            color: '#262626',
            position: 'relative',
            borderRadius: '8px',
          }}
        >
          <Box className="top-line" />
          <Box sx={{ py: 3, textAlign: 'center' }}>
            <Box sx={{ px: 3 }}>
              <CustomTextField
                variant="standard"
                name="title"
                placeholder="Form title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
              />
              <CustomTextField
                variant="standard"
                name="description"
                placeholder="Form description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                multiline
                fullWidth
                sx={{
                  mt: 2,
                  '& .MuiInput-input': {
                    fontSize: '11pt',
                  },
                }}
                onFocus={(e) => e.target.select()}
              />
            </Box>
          </Box>
        </Card>
      </Container>
    </Container>
  );
}

export default DetailForms;
