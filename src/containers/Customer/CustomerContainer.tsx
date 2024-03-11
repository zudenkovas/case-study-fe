'use client';
import { useCustomer } from '@/api/customers';
import { Layout } from '@/components/Layout';
import { Loader } from '@/components/Loader';
import { styled } from '@mui/material';
import { BankAccountAddDialog } from './BankAccountAddDialog';
import { BankAccountList } from './BankAccountList';

type CustomerContainerProps = { customerId: string };

const Translations = {
  fullNameLabel: 'Full Name: ',
  ssnLabel: 'SSN: ',
  noBankAccounts: 'No bank accounts',
};

const HeaderWrapper = styled('div')`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
export const CustomerContainer = ({ customerId }: CustomerContainerProps) => {
  const { data, isLoading, mutate } = useCustomer(customerId);

  const handleRefresh = () => {
    mutate();
  };

  return (
    <Layout
      headerContent={
        <HeaderWrapper>
          <span>
            {Translations.fullNameLabel}
            {data?.name}
          </span>

          <span>
            {Translations.ssnLabel}
            {data?.ssn}
          </span>
          <BankAccountAddDialog customerId={customerId} onSuccess={handleRefresh} />
        </HeaderWrapper>
      }
    >
      <Loader showLoader={isLoading} />
      {data?.bankAccounts?.length ? (
        <BankAccountList bankAccountData={data.bankAccounts} />
      ) : (
        Translations.noBankAccounts
      )}
    </Layout>
  );
};
