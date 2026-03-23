'use client';

import styles from './page.module.css';

import type { SubmitHandler } from 'react-hook-form';
import { useForm } from "react-hook-form"
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { getUser } from '@/services/firebase.service';
import Button from '@/components/button';
import Card from '@/components/card';
import Input from '@/components/input';
import Title from '@/components/title';
import { useUser } from '@/hooks';
import { userStore } from '@/store';

type Inputs = {
  email: string
  password: string
}

export default function LoginPage() {
  const router = useRouter();
  const { user } = useUser();

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
    mode: 'onChange',
  })

  if (user?.role === 'admin') {
    router.push('/admin/dashboard');
    return;
  }

  const onSubmitForm: SubmitHandler<Inputs> = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => getUser(userCredential.user.uid))
      .then((userData) => {
        userStore.setUser(userData);
        router.push('/admin/dashboard');
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <div className={styles.loginPage}>
      <div className="description-column">
        <Title className="text-center">Administration</Title>
      </div>
      <Card className="form-column">        
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <Input
            id="email"
            label="Email"
            type="email"
            {...register('email', { required: 'Email is required' })}
            error={errors.email?.message}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            {...register('password', { required: 'Password is required' })}
            error={errors.password?.message}
          />
          <div className="d-flex justify-end">
            <Button>Login</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

