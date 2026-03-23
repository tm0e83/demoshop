import styles from './cart-item.module.css';
import type { CartItemType } from '@/typings';
import Link from 'next/link';
import { Trash } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { cartStore } from '@/store';
import { formatCurrency } from '@/utils';
import Button from '@/components/button';
import QuantityInput from '@/components/input/quantity-input';

type CartItemProps = {
  cartItem: CartItemType;
  quantityChangeable?: boolean;
  removable?: boolean;
};

export default function CartItem({ cartItem, quantityChangeable = false, removable = false }: CartItemProps) {
  const dispatch = useDispatch();

  const handleQuantityChange = (newQuantity: number) => {
    dispatch(cartStore.updateQuantity({ id: cartItem.id, quantity: newQuantity }));
  };

  const handleRemove = () => {
    dispatch(cartStore.removeFromCart(cartItem.id));
  };

  return (
    <div className={styles.cartItem}>
      <div className={styles.cartItemImage}>
        <Link href={`/product/${cartItem.id}`}>
          <img
            src={cartItem.image || 'https://placehold.co/300x225?text=No+Image'}
            alt={cartItem.title}
          />
        </Link>
      </div>
      <div className={styles.cartItemDetails}>
        <div className={styles.cartItemName}><Link href={`/product/${cartItem.id}`}>{cartItem.title}</Link></div>
        <div className={styles.cartItemQuantity}>
          <label htmlFor={`quantity-${cartItem.id}`}>Quantity:</label>
          {quantityChangeable ? (
            <QuantityInput value={cartItem.quantity} onChange={handleQuantityChange} />
          ) : (<span>{cartItem.quantity}</span>)}
        </div>
        {removable && (
          <div className="cart-item-actions">
            <Button variant="text" color="danger" onClick={handleRemove}>
              <Trash size={16} /> <span>Remove</span>
            </Button>
          </div>
        )}
      </div>
      <div className={styles.cartItemPrice}>
        <span className={styles.cartItemPriceTotal}>{formatCurrency(cartItem.quantity * cartItem.price)}</span><br />
        <span className={styles.cartItemPricePerPiece}>{formatCurrency(cartItem.price)} / Piece</span>
      </div>
    </div>
  );
};

