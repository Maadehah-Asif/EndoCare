export type SessionUser = {
  id: string;
  email: string;
};

export async function getCurrentUser(): Promise<SessionUser | null> {
  return null;
}

