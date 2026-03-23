'use client';

import styles from './page.module.css'

import type { SubmitHandler } from 'react-hook-form';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { useForm } from "react-hook-form"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getUser } from '@/services/firebase.service';
import { auth } from '@/config/firebase';
import Button from '@/components/button';
import Title from '@/components/title';
import Input from '@/components/input';
import Card from '@/components/card/card';
import { useUser } from '@/hooks';
import { userStore } from '@/store';

type Inputs = {
  email: string
  password: string
}

export default function Login() {
  const router = useRouter();
  const { user } = useUser();
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
    mode: 'onChange',
  })

  if (user?.uid) {
    router.push('/profile');
  }
  
  const onSubmitForm: SubmitHandler<Inputs> = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
    .then((userCredential) => getUser(userCredential.user.uid))
    .then((userData) => {
        userStore.setUser(userData);
        router.push('/profile');
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <div className={styles.login}>
      <h1>Login</h1>
      <div className="d-flex gap-4 flex-wrap">
        <Card className="flex-1">        
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <Input
              id="email"
              label="Email"
              className={errors.email ? 'is-invalid' : ''}
              type="email"
              {...register('email', { required: 'Email is required' })}
              error={errors.email?.message}
            />
            <Input
              id="password"
              label="Password"
              type="password"
              className={errors.password ? 'is-invalid' : ''}
              {...register('password', { required: 'Password is required' })}
              error={errors.password?.message}
            />
            <Button>Login</Button>
          </form>
        </Card>

        <Card>
          <Title level={2}>Don't have an account?</Title>
          <Link href="/signup">
            <Button>Sign Up</Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
