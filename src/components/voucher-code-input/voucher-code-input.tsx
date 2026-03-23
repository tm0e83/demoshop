'use client';
import styles from './voucher-code-input.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Check } from 'lucide-react';
import { toast } from 'react-toastify';
import BaseInput from '@/components/input/base-input';
import Button from '@/components/button';
import { getDiscountByCode } from '@/services/firebase.service';
import { cartStore } from '@/store';

export default function VoucherCodeInput() {
  const [voucherCode, setVoucherCode] = useState('');
  const dispatch = useDispatch();

  const handleVoucherCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVoucherCode(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleVoucherApply();
    }
  };

  const handleVoucherApply = async () => {
    const discount = await getDiscountByCode(voucherCode);
    if (discount) {
      dispatch(cartStore.addDiscount(discount));
    } else {
      toast.error(<span>Invalid voucher code</span>);
    }
    setVoucherCode('');
  };

  return (
    <div className={styles.voucherCodeInput}>
      <BaseInput 
        placeholder="Voucher Code"
        className="mb-0"
        value={voucherCode}
        onChange={handleVoucherCodeChange} 
        onKeyDown={handleKeyDown}
      />
      <Button
        color="primary"
        className="apply-voucher-btn"
        disabled={!voucherCode}
        onClick={handleVoucherApply}
      >
        <Check size={16} />
      </Button>
    </div>
  );
}