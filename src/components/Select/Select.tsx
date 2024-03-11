import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import MuiSelect, { SelectChangeEvent, SelectProps as MuiSelectProps } from '@mui/material/Select';
import { FormHelperText } from '@mui/material';
import { Control, FieldValues, Path, useController } from 'react-hook-form';

export type SelectOption = {
  label: string;
  value: string;
};

type SelectProps<T extends FieldValues = {}> = {
  name: Path<T>;
  control: Control<T>;
  options: SelectOption[];
} & MuiSelectProps;

export function Select<T extends FieldValues = {}>({ name, control, options, label }: SelectProps<T>) {
  const { field, fieldState } = useController({ name, control });

  return (
    <FormControl sx={{ minWidth: 120 }} size="small" error={!!fieldState.error?.message}>
      <InputLabel id="select-label">{label}</InputLabel>
      <MuiSelect {...field} labelId="select-label" id="demo-select-small" label={label}>
        {options.map((option) => (
          <MenuItem key={`${option.value}-${option.label}`} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
      <FormHelperText>{fieldState.error?.message}</FormHelperText>
    </FormControl>
  );
}
