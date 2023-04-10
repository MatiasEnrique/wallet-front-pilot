'use client';
import { signIn } from 'next-auth/react';
import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      username: email,
      password,
      redirect: false
    });

    console.log(res);
  };

  return (
    <div>
      <form>
        <input
          type="text"
          name=""
          id=""
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          name=""
          id=""
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={(e) => handleSubmit(e)}>LOGIN</button>
      </form>
    </div>
  );
};

export default Login;
