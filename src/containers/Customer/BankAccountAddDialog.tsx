'use client';

import { useRef } from 'react';
import { styled } from '@mui/material';
import * as yup from 'yup';
import { CreateBankAccountArgs, useBankAccountCreate } from '@/api/bankAccounts';
import { Dialog } from '@/components/Dialog';
import { Form, FormInnerRef } from '@/components/Form';
import { TextInput } from '@/components/Input';
import { Select } from '@/components/Select';
import { DialogInnerRef } from '@/components/Dialog/Dialog';
import { numericRegex } from '@/utils/constants';
import { validateAccountNumberMod11 } from '@/utils/validation';

type BankAccountAddDialogProps = { customerId: string; onSuccess?: () => void };
type BankAccountFormValues = Omit<CreateBankAccountArgs, 'customerId'>;

const Translations = {
  dialogHeader: 'Add Bank Account',
  openButtonText: 'Add Bank Account',
  nameLabel: 'Name',
  accountNumberLabel: 'Number',
  currencyLabel: 'Currency',
  accountNumberRequiredErrorMessage: 'Account number is required',
  accountNameRequiredErrorMessage: 'Name is required',
  mustBeNumberErrorMessage: 'Must be a number',
  invalidAccountNumberErrorMessage: 'Invalid account number',
  currencyRequiredErrorMessage: 'Currency is required',
  invalidCurrencyErrorMessage: 'Invalid currency',
};

const FieldsWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const currencyOptions = [
  { label: 'US Dollar (USD)', value: 'USD' },
  { label: 'Norwegian Kroner (NOK)', value: 'NOK' },
  { label: 'Euro (EUR)', value: 'EUR' },
];

const validationSchema = yup.object().shape({
  name: yup.string().required(Translations.accountNameRequiredErrorMessage),
  number: yup
    .string()
    .required(Translations.accountNumberRequiredErrorMessage)
    .matches(numericRegex, { message: Translations.mustBeNumberErrorMessage })
    .test('mod11', Translations.invalidAccountNumberErrorMessage, validateAccountNumberMod11),
  currency: yup
    .string()
    .required(Translations.currencyRequiredErrorMessage)
    .oneOf(
      currencyOptions.map((option) => option.value),
      Translations.invalidCurrencyErrorMessage
    ),
});

const initialValues: BankAccountFormValues = {
  name: '',
  number: '',
  currency: '',
};

export const BankAccountAddDialog = ({ customerId, onSuccess }: BankAccountAddDialogProps) => {
  const { trigger, error } = useBankAccountCreate();
  const dialogRef = useRef<DialogInnerRef>(null);
  const formRef = useRef<FormInnerRef>(null);

  const onSubmit = async (values: BankAccountFormValues) => {
    try {
      await trigger({ ...values, customerId });
      onSuccess?.();
      dialogRef.current?.openDialog?.(false);
    } catch {}
  };

  const handleSubmit = () => {
    formRef.current?.submitForm?.();
  };

  return (
    <Dialog
      title={Translations.dialogHeader}
      openButtonText={Translations.openButtonText}
      openButtonColor="inherit"
      openButtonVariant="text"
      maxWidth="sm"
      innerRef={dialogRef}
      onSubmit={handleSubmit}
      fullWidth
    >
      <Form<BankAccountFormValues>
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        values={initialValues}
        innerRef={formRef}
      >
        {({ control }) => {
          return (
            <FieldsWrapper>
              <TextInput control={control} label={Translations.nameLabel} name="name" />
              <TextInput control={control} label={Translations.accountNumberLabel} name="number" />
              <Select
                control={control}
                label={Translations.currencyLabel}
                name="currency"
                options={currencyOptions}
                variant="outlined"
              />
            </FieldsWrapper>
          );
        }}
      </Form>
    </Dialog>
  );
};
