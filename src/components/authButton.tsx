// components/AuthButton.tsx
import { useAppDispatch } from '../store/store';
import { loginSuccess } from '../store/authSlice';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import { styled } from '@mui/system';

const CustomButton = styled("button")`
  width: 25vw;
  height: 35px;
  font-size: 22px;
  margin: 16px 0;
  cursor: pointer;
  background-color: #0A1928;
  border: none;
  color: white;
`

const AuthButton: React.FC = () => {
	const { user } = useUser();
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
        <CustomButton onClick={() => loginWithRedirect()}>Log in</CustomButton>
      ) : (
         <div>
          <CustomButton onClick={handleLogout}>Log out</CustomButton>
        </div>
			)}
    </div>
  );
};

export default AuthButton;
