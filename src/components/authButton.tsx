// components/AuthButton.tsx
import { useAuth0 } from '@auth0/auth0-react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { loginSuccess, logoutSuccess } from '../store/authSlice';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';

const AuthButton: React.FC = () => {
	const { user, error, isLoading } = useUser();
	const router = useRouter()
  const dispatch = useAppDispatch();

  if (user) {    
    dispatch(loginSuccess(user));
  }

  const handleLogout = () => {
    router.push("/api/auth/logout")
  };

	const loginWithRedirect = () => {
		router.push("/api/auth/login")
	}

  return (
    <div>
      {!user ? (
        <button onClick={() => loginWithRedirect()}>Log in</button>
      ) : (
         <div>
          <button onClick={handleLogout}>Log out</button>
        </div>
			)}
    </div>
  );
};

export default AuthButton;
