'use client';
import { PropsWithChildren, ReactNode, RefObject, useImperativeHandle, useState } from 'react';
import MuiDialog, { DialogProps as MuiDialogProps } from '@mui/material/Dialog';
import MuiDialogActions from '@mui/material/DialogActions';
import MuiDialogContent from '@mui/material/DialogContent';
import MuiDialogTitle from '@mui/material/DialogTitle';
import { Button, ButtonProps } from '@/components/Button';
import { styled } from '@mui/material';

const Translations = {
  cancelButtonText: 'Cancel',
  submitButtonText: 'Submit',
  openButtonText: 'Open form dialog',
};

type DialogProps = PropsWithChildren<
  {
    title: ReactNode;
    openButtonText?: string;
    openButtonVariant?: ButtonProps['variant'];
    openButtonColor?: ButtonProps['color'];
    cancelButtonText?: string;
    submitButtonText?: string;
    onSubmit?: () => void;
    innerRef?: RefObject<DialogInnerRef>;
    onClose?: () => void;
  } & Omit<MuiDialogProps, 'open' | 'onClose'>
>;

export type DialogInnerRef = {
  openDialog?: (open: boolean) => void;
};

const Content = styled('div')`
  padding-top: 12px;
`;

export const Dialog = ({
  title,
  children,
  onSubmit,
  onClose,
  openButtonColor,
  openButtonVariant,
  openButtonText = Translations.openButtonText,
  cancelButtonText = Translations.cancelButtonText,
  submitButtonText = Translations.submitButtonText,
  innerRef,
  ...rest
}: DialogProps) => {
  const [open, setOpen] = useState(false);

  useImperativeHandle(
    innerRef,
    () => ({
      openDialog: (open: boolean) => setOpen(open),
    }),
    []
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  return (
    <>
      <Button variant={openButtonVariant} color={openButtonColor} onClick={handleClickOpen}>
        {openButtonText}
      </Button>
      <MuiDialog {...rest} open={open} onClose={handleClose}>
        <MuiDialogTitle>{title}</MuiDialogTitle>
        <MuiDialogContent>
          <Content>{children}</Content>
        </MuiDialogContent>
        <MuiDialogActions>
          <Button onClick={handleClose}>{cancelButtonText}</Button>
          <Button onClick={onSubmit}>{submitButtonText}</Button>
        </MuiDialogActions>
      </MuiDialog>
    </>
  );
};
