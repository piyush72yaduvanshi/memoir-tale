import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

interface AdminAuthState {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  error: string | null;
}

/**
 * Secure Admin Authentication Hook
 * Checks both Firebase Auth AND Firestore role
 */
export function useAdminAuth(): AdminAuthState {
  const [state, setState] = useState<AdminAuthState>({
    user: null,
    isAdmin: false,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setState({
          user: null,
          isAdmin: false,
          loading: false,
          error: null,
        });
        return;
      }

      try {
        // Check user role in Firestore
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          const isAdmin = userData.role === 'admin' && userData.isActive === true;

          setState({
            user,
            isAdmin,
            loading: false,
            error: isAdmin ? null : 'Access denied: Admin privileges required',
          });
        } else {
          setState({
            user,
            isAdmin: false,
            loading: false,
            error: 'User role not found in database',
          });
        }
      } catch (error: any) {
        console.error('Error checking admin status:', error);
        setState({
          user,
          isAdmin: false,
          loading: false,
          error: error.message,
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return state;
}
