import { Box, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';

// eslint-disable-next-line react/prop-types
function FormTabs({ status }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newNumber) => {
    setValue(newNumber);
  };
  return (
    <Box sx={{ width: '100%', bgcolor: 'custom.main' }}>
      <Typography sx={{ px: 2 }} variant="body2">
        {status === 'loading' ? 'Saving...' : 'All changes saved in database'}
      </Typography>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab
          sx={{ textTransform: 'none', color: '#262626' }}
          label="Questions"
        />
        <Tab
          sx={{ textTransform: 'none', color: '#262626' }}
          label="Responses"
        />
      </Tabs>
    </Box>
  );
}

export default FormTabs;
