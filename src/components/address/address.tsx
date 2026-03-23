import type { AddressType } from '@/typings';

export default function Address({ address }: { address: AddressType }) {
  return (
    <div key={address.id} className="address">
      <div>
        <div>{address.firstname} {address.lastname}</div>
        <div>{address.street}</div>
        <div>{address.zipcode} {address.city}</div>
        <div>{address.country}</div>
      </div>
    </div>
  );
};