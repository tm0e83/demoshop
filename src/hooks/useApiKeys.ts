'use client';

import { ApiKey } from '@/typings/apiKey';
import { auth } from '@/config/firebase';
import { useEffect, useState } from 'react';
import { useUser } from '@/hooks';

const getIdToken = async (): Promise<string> => {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  return await user?.getIdToken();
}

const useApiKeys = () => {
  const { status } = useUser();
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (status !== 'authenticated') return;

    const getApiKeys = async () => {
      const idToken = await getIdToken();

      const res = await fetch('https://demoshop-rest-api.fly.dev/apikeys/list', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        }
      });

      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          setErrorMessage('You are not authorized to view this page');
          return;
        }

        setApiKeys([]);
      } else {
        setErrorMessage('');
        const apiKeys = await res.json();
        setApiKeys(apiKeys);
      }
    }

    getApiKeys();
  }, [status]);

  return {
    apiKeys,
    errorMessage
  }
}

export default useApiKeys;