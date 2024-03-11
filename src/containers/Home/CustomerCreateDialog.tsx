'use client';
import { useEffect, useRef } from 'react';
import * as yup from 'yup';
import { styled } from '@mui/material';
import { Dialog } from '@/components/Dialog';
import { Form, FormInnerRef } from '@/components/Form';
import { TextInput } from '@/components/Input/TextInput';
import { useCustomerCreate } from '@/api/customers';
import { DialogInnerRef } from '@/components/Dialog/Dialog';
import { Alert } from '@/components/Alert';
import { numericRegex } from '@/utils/constants';

type CustomerCreateDialogProps = {
  onSuccess?: () => void;
};

type CustomerCreateFormValues = {
  name: string;
  ssn: string;
};

const Translations = {
  dialogHeader: 'Create Customer',
  openButtonText: 'Create Customer',
  nameInputLabel: 'Full name',
  ssnInputLabel: 'SSN',
  customerNameRequiredErrorMessage: 'Name is required',
  ssnIsRequiredErrorMessage: 'SSN is required',
  ssnMustBe11CharactersErrorMessage: 'SSN must be 11 characters',
  ssnMustBeANumberErrorMessage: 'SSN must be a number',
};

const FieldsWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const validationSchema = yup.object().shape({
  name: yup.string().required(Translations.customerNameRequiredErrorMessage),
  ssn: yup
    .string()
    .required(Translations.ssnIsRequiredErrorMessage)
    .length(11, Translations.ssnMustBe11CharactersErrorMessage)
    .matches(numericRegex, { message: Translations.ssnMustBeANumberErrorMessage }),
});

const initialValues: CustomerCreateFormValues = {
  name: '',
  ssn: '',
};

export const CustomerCreateDialog = ({ onSuccess }: CustomerCreateDialogProps) => {
  const dialogRef = useRef<DialogInnerRef>(null);
  const formRef = useRef<FormInnerRef>(null);
  const { trigger, error, reset } = useCustomerCreate();

  const errorMessage = error?.response?.data?.errors?.map((error: any) => error.msg).join(', ');

  const handleSubmit = () => {
    formRef.current?.submitForm?.();
  };

  useEffect(() => {
    reset();
    return () => {
      reset();
    };
  }, []);

  const onSubmit = async (values: CustomerCreateFormValues) => {
    try {
      await trigger(values);

      onSuccess?.();
      dialogRef.current?.openDialog?.(false);
    } catch {}
  };

  return (
    <Dialog
      title={Translations.dialogHeader}
      openButtonText={Translations.openButtonText}
      openButtonColor="inherit"
      openButtonVariant="text"
      onSubmit={handleSubmit}
      onClose={reset}
      innerRef={dialogRef}
      maxWidth="sm"
      fullWidth
    >
      {error && (
        <Alert severity="error" sx={{ marginBottom: '20px' }}>
          {errorMessage ?? error.message}
        </Alert>
      )}
      <Form<CustomerCreateFormValues>
        innerRef={formRef}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        values={initialValues}
      >
        {({ control }) => {
          return (
            <FieldsWrapper>
              <TextInput control={control} label={Translations.nameInputLabel} name="name" />
              <TextInput control={control} label={Translations.ssnInputLabel} name="ssn" />
            </FieldsWrapper>
          );
        }}
      </Form>
    </Dialog>
  );
};
