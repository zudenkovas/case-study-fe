'use client';

import { TextField, TextFieldProps } from '@mui/material';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

type TextInputProps<T extends FieldValues = {}> = {
  name: Path<T>;
  control: Control<T>;
} & TextFieldProps;

export const TextInput = <T extends FieldValues = {}>({
  control,
  name,
  size = 'small',
  ...rest
}: TextInputProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField {...rest} size={size} {...field} error={!!fieldState.error} helperText={fieldState.error?.message} />
      )}
    />
  );
};
