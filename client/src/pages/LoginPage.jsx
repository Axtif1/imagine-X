import React from 'react';
import { LoginForm } from '../components/LoginForm';

export const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-zinc-950 relative overflow-hidden">
      <div className="absolute -top-[300px] -left-[300px] w-[600px] h-[600px] bg-violet-600/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-[300px] -right-[300px] w-[600px] h-[600px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
};
