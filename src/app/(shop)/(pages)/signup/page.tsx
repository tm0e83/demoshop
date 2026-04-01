'use client';

import type { SubmitHandler } from 'react-hook-form';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, database } from '@/config/firebase';
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks';
import { createUser } from '@/services/firebase.service';
import { userStore } from '@/store';
import { push, ref, serverTimestamp } from 'firebase/database';
import Button from '@/components/button';
import Card from '@/components/card/card';
import Input from '@/components/input';
import Select from '@/components/select';
import Title from '@/components/title';

type Inputs = {
  birthdate: string;
  firstname: string;
  lastname: string;
  street: string;
  zipcode: string;
  city: string;
  country: string;
  email: string;
  password: string;
}

export default function SignUpPage() {
  const router = useRouter();
  const { user } = useUser();
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()

  if (user?.uid) {
    return router.push('/profile');
  }

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const addressKey = push(ref(database, 'temp')).key;

    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => createUser({
        addresses: {
          [addressKey]: {
            city: data.city,
            country: data.country,
            firstname: data.firstname,
            id: addressKey,
            lastname: data.lastname,
            street: data.street,
            zipcode: data.zipcode,
          }
        },
        birthdate: data.birthdate,
        createdAt: serverTimestamp(),
        defaultBillingAddress: addressKey,
        defaultShippingAddress: addressKey,
        email: data.email,
        firstname: data.firstname,
        lastname: data.lastname,
        role: 'customer',
        uid: userCredential.user.uid,
      }))
      .then((userData) => {
        if (!userData) {
          throw new Error('User data not found after creation');
        }
        userStore.setUser(userData);
        router.push('/profile');
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <div>
      <Title>Register</Title>

      <div className="d-flex gap-4 flex-wrap">
        <Card className="flex-1">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              id="firstname"
              label="Firstname"
              type="text"
              {...register("firstname", {
                required: "First name is required",
                pattern: {
                  value: /^[a-zA-ZäöüÄÖÜß]+$/,
                  message: "First name must contain only letters"
                }
              })}
              error={errors.firstname?.message}
            />

            <Input
              id="lastname"
              label="Lastname"
              type="text"
              {...register("lastname", {
                required: "Last name is required",
                pattern: {
                  value: /^[a-zA-ZäöüÄÖÜß]+([ -][a-zA-ZäöüÄÖÜß]+)*$/,
                  message: "Last name must contain only letters"
                }
              })}
              error={errors.lastname?.message}
            />

            <Input
              id="email"
              label="Email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address"
                }
              })}
              error={errors.email?.message}
            />

            <Input
              id="password"
              label="Password"
              type="password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                  message: "Password must be at least 6 characters long and contain both letters and numbers"
                }
              })}
              error={errors.password?.message}
            />

            <Input
              id="street"
              label="Street"
              type="text"
              {...register("street", {
                required: "Street is required",
                pattern: {
                  value: /^[a-zA-ZäöüÄÖÜß]+\.?([ -][a-zA-ZäöüÄÖÜß]+\.?)*\s\d+[a-zA-Z]?(?:-\d+[a-zA-Z]?)?$/,
                  message: "Invalid street format"
                }
              })}
              error={errors.street?.message}
            />

            <Input
              id="zipcode"
              label="Zipcode"
              type="text"
              {...register("zipcode", {
                required: "Zipcode is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Zipcode must contain only numbers"
                }
              })}
              error={errors.zipcode?.message}
            />

            <Input
              id="city"
              label="City"
              type="text"
              {...register("city", {
                required: "City is required",
                pattern: {
                  value: /^[a-zA-ZäöüÄÖÜß]+(-[a-zA-ZäöüÄÖÜß]+)?$/,
                  message: "Invalid city name"
                }
              })}
              error={errors.city?.message}
            />

            <Select
              id="country"
              label="Country"
              options={[
                { value: "Germany", label: "Germany" },
                { value: "Austria", label: "Austria" },
                { value: "Switzerland", label: "Switzerland" },
              ]}
              {...register("country", {
                required: "Country is required"
              })}
              error={errors.country?.message}
            >
            </Select>

            <Input
              id="birthdate"
              label="Birthdate"
              type="date"
              {...register("birthdate", {
                required: "Birthdate is required"
              })}
              error={errors.birthdate?.message}
            />

            <div className="d-flex justify-end">
              <Button>Register</Button>
            </div>
          </form>
        </Card>
        <Card>
          <Title level={2}>Your data is safe with us!</Title>
        </Card>
      </div>
    </div>
  );
}