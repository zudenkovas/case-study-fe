import * as React from 'react';
import MuiAlert, { AlertProps as MuiAlertProps } from '@mui/material/Alert';

export type AlertProps = MuiAlertProps;

export const Alert = ({ children, ...rest }: AlertProps) => {
  return <MuiAlert {...rest}>{children}</MuiAlert>;
};
