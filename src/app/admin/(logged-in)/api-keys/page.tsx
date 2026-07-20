'use client';

import Card from '@/components/card';
import PageTitle from '@/components/page-title';
import useApiKeys from '@/hooks/useApiKeys';

export default function ApiKeys() {
  const { apiKeys, errorMessage } = useApiKeys();

  return <Card>
    <PageTitle>API Keys</PageTitle>
    {errorMessage && <p>{errorMessage}</p>}
    {!errorMessage && apiKeys && (
      <>
        <pre>{JSON.stringify(apiKeys, null, 2)}</pre>
      </>
    )}
  </Card>;
}