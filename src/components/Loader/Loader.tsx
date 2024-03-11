import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

type LoaderProps = {
  showLoader?: boolean;
};
export function Loader({ showLoader = false }: LoaderProps) {
  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={showLoader}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
