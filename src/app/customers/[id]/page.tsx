'use client';

import { CustomerContainer } from '@/containers/Customer/CustomerContainer';

type CustomerProps = {
  params: {
    id: string;
  };
};
export default function Customer({ params }: CustomerProps) {
  return <CustomerContainer customerId={params.id} />;
}
