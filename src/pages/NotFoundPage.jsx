import { Button, Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <Container
      component="section"
      maxWidth="xs"
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
        {t('NOT_FOUND')}
      </Typography>
      <Button variant="contained">
        <Link to="/" style={{ color: '#fff' }}>
          {t('BACK')}
        </Link>
      </Button>
    </Container>
  );
}

export default NotFoundPage;
