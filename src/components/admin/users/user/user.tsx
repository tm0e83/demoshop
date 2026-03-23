import type { UserType } from '@/typings';

export default function User({ user }: { user: UserType }) {
  return (
    <div className="item">
      <div className="item-column">
        <div className="item-label">Name:</div>
        <div className="item-value">{user.lastname}, {user.firstname}</div>
      </div>
      <div className="item-column">
        <div className="item-label">Role:</div>
        <div className="item-value">{`${user.role.charAt(0).toUpperCase()}${user.role.slice(1)}`}</div>
      </div>
      <div className="item-column">
        <div className="item-label">ID:</div>
        <div className="item-value">{user.uid}</div>
      </div>
    </div>
  );
};
