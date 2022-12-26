import { Container, Skeleton, TextField } from '@mui/material';

function FormDetailSkeleton() {
  return (
    <Container maxWidth="md" sx={{ pt: '12px' }}>
      <Skeleton
        sx={{
          borderRadius: '8px',
          maxWidth: '100%',
        }}
        variant="rectangular"
        animation="wave"
      >
        <TextField
          variant="standard"
          name="title"
          placeholder="Form title"
          fullWidth
          sx={{
            '& .MuiInput-root:before': {
              borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
            },
            '& .MuiInput-root:hover:not(.Mui-disabled):before': {
              borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
            },
            '& .MuiInput-input': {
              fontSize: '24pt',
              fontWeight: 400,
              color: '#262626',
            },
          }}
        />
        <TextField
          variant="standard"
          name="description"
          multiline
          placeholder="Form description"
          fullWidth
          sx={{
            '& .MuiInput-root:before': {
              borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
            },
            '& .MuiInput-root:hover:not(.Mui-disabled):before': {
              borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
            },
            '& .MuiInput-input': {
              fontSize: '24pt',
              fontWeight: 400,
              color: '#262626',
            },
          }}
        />
      </Skeleton>
    </Container>
  );
}

export default FormDetailSkeleton;
