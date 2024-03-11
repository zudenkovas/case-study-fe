import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Customer } from '@/api/customers';
import { Link } from '@/components/Link';

type CustomerListsProps = {
  customersData: Customer[];
};

const Translations = {
  customerNameTableHeader: 'Full Name',
  customerSsnTableHeader: 'SSN',
  customerBankAccountsCountTableHeader: 'Bank Accounts Count',
};

export const CustomerList = ({ customersData }: CustomerListsProps) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>{Translations.customerNameTableHeader} </TableCell>
            <TableCell align="right">{Translations.customerSsnTableHeader}</TableCell>
            <TableCell align="right">{Translations.customerBankAccountsCountTableHeader}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customersData.map((customer) => (
            <TableRow key={customer.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                <Link href={`/customers/${customer.id}`}>{customer.name}</Link>
              </TableCell>
              <TableCell align="right" component="th" scope="row">
                {customer.ssn}
              </TableCell>
              <TableCell align="right">{customer.bankAccounts?.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
