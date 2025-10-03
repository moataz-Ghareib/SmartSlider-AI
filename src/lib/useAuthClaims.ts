import { useEffect, useState, useCallback } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

export interface AuthClaimsState {
  user: User | null;
  claims: Record<string, any> | null;
  loading: boolean;
  refreshClaims: () => Promise<void>;
}

export function useAuthClaims(): AuthClaimsState {
  const [user, setUser] = useState<User | null>(null);
  const [claims, setClaims] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const readClaims = useCallback(async (current: User | null) => {
    if (!current) {
      setClaims(null);
      return;
    }
    try {
      const res = await current.getIdTokenResult();
      setClaims(res.claims || {});
    } catch {
      setClaims(null);
    }
  }, []);

  const refreshClaims = useCallback(async () => {
    const current = auth.currentUser;
    if (!current) return;
    try {
      await current.getIdToken(true);
      const res = await current.getIdTokenResult();
      setClaims(res.claims || {});
    } catch {}
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      setUser(fbUser);
      await readClaims(fbUser);
      setLoading(false);
    });
    return () => unsub();
  }, [readClaims]);

  return { user, claims, loading, refreshClaims };
}


