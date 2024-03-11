import useSWRMutation from 'swr/mutation';
import { postReq } from './commons';

export type BankAccount = {
  id: string;
  createdAt: string;
  name: string;
  number: string;
  currency: string;
  customerId: string;
};

export type CreateBankAccountArgs = Pick<BankAccount, 'name' | 'number' | 'currency' | 'customerId'>;

export const useBankAccountCreate = () => {
  return useSWRMutation(
    '/bank-accounts',
    async (url, { arg }: { arg: CreateBankAccountArgs }) => await postReq<CreateBankAccountArgs, BankAccount>(url, arg)
  );
};
