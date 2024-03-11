import useSWR from 'swr';
import { getReq, postReq } from './commons';
import useSWRMutation from 'swr/mutation';
import { BankAccount } from './bankAccounts';

export type CustomerCreateArgs = {
  name: string;
  ssn: string;
};

export type Customer = {
  id: string;
  name: string;
  ssn: string;
  createdAt: string;
  bankAccounts?: BankAccount[];
};

export const useCustomerCreate = () => {
  return useSWRMutation(
    '/customers',
    async (url, { arg }: { arg: CustomerCreateArgs }) => await postReq<CustomerCreateArgs, Customer>(url, arg)
  );
};

export const useCustomerList = () => {
  return useSWR('/customers', async (url) => await getReq<Customer[]>(url));
};

export const useCustomer = (customerId: string) => {
  return useSWR(`/customers/${customerId}`, async (url) => await getReq<Customer>(url));
};
