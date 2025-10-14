// @src/context/user-context.tsx
'use client';

import * as React from 'react';
import type { User } from '@src/@types/user';
import { authClient } from '@lib/auth/client';

export interface UserContextValue {
  user: User | null;
  error: string | null;
  isLoading: boolean;
  refetch: () => Promise<void>;
}

export const UserContext = React.createContext<UserContextValue | undefined>(undefined);

export interface UserProviderProps {
  children: React.ReactNode;
}

export function UserProvider({ children }: UserProviderProps): React.JSX.Element {
  const [state, setState] = React.useState<{
    user: User | null;
    error: string | null;
    isLoading: boolean;
  }>({
    user: null,
    error: null,
    isLoading: true,
  });

  const refetch = React.useCallback(async (): Promise<void> => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const { data, error } = await authClient.getUser();
      if (error) {
        setState({ user: null, error: 'Failed to load user data', isLoading: false });
        return;
      }
      setState({ user: data ?? null, error: null, isLoading: false });
    } catch (err) {
      setState({ user: null, error: 'Something went wrong', isLoading: false });
    }
  }, []);

  React.useEffect(() => {
    refetch().catch(() => {
      // noop
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserContext.Provider value={{ ...state, refetch }}>
      {children}
    </UserContext.Provider>
  );
}

export const UserConsumer = UserContext.Consumer;