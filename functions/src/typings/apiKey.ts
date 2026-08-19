export type ApiKey = {
  id: string;
  label: string;
  createdAt: string;
  lastUsedAt: string | null;
  revoked: boolean;
  hash: string;
};
