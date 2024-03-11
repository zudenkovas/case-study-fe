'use server';
import { CustomerCreateArgs } from '@/api/customers';
import { API_URL } from '@/config';

export const createCustomer = async (args: CustomerCreateArgs) => {
  try {
    const response = await fetch(`${API_URL}/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(args),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    if ('message' in (error as Error)) {
      throw new Error((error as Error).message);
    }

    throw new Error('An error occurred while creating the customer');
  }
};
