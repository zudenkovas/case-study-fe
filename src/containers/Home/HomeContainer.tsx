'use client';

import { styled } from '@mui/material/styles';
import { Header } from '@/components/Header';
import { Container } from '@/components/Container';
import { CustomerCreateDialog } from './CustomerCreateDialog';
import { useCustomerList } from '@/api/customers';
import { CustomerList } from './CustomerList';
import { Loader } from '@/components/Loader';
import { Layout } from '@/components/Layout';

const Translations = {
  customersHeader: 'Customers',
  createCustomerLabel: 'Create Customer',
  noCustomers: 'No customers',
};

const HeaderContentWrapper = styled('div')`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

export const HomeContainer = () => {
  const { data, mutate, isLoading } = useCustomerList();

  return (
    <Layout
      headerContent={
        <>
          {Translations.customersHeader} <CustomerCreateDialog onSuccess={mutate} />
        </>
      }
    >
      <Loader showLoader={isLoading} />
      {data?.length ? <CustomerList customersData={data} /> : Translations.noCustomers}
    </Layout>
  );
};
