import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function Loading() {

  return (
    <div>
      <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100vh"
        >
          <CircularProgress color="primary" size={80} />
        </Box>
    </div>
  );
}

export default Loading;
