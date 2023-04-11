'use client';
import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import UserInformation from './UserInformation.jsx';

const LoginButton = () => {
  const { data: session } = useSession();
  console.log(session);
  if (session) {
    return (
      <>
        <UserInformation data={session.accessToken} />
        <button onClick={() => signOut()}>Sign Out</button>
      </>
    );
  }

  return (
    <>
      Not Signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
};

export default LoginButton;
