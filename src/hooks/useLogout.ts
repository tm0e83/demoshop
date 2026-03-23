'use client';

import { auth } from '@/config/firebase';
import { CART_STORAGE_KEY } from '@/constants';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { cartStore } from '@/store';
import { useDispatch } from 'react-redux';

type UseLogoutOptions = {
	redirectPath: string;
};

const useLogout = ({ redirectPath }: UseLogoutOptions) => {
	const router = useRouter();
	const dispatch = useDispatch();

	const logout = async (): Promise<void> => {
		await signOut(auth);
		dispatch(cartStore.clearCart());
		localStorage.removeItem(CART_STORAGE_KEY);
		router.push(redirectPath);
	};

	return logout;
};

export default useLogout;