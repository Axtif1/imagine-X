import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
import { Hexagon, ArrowLeft } from 'lucide-react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!email) return toast.error("Please enter your email");

    setLoading(true);
    const res = await dispatch(forgotPassword({ email }));
    setLoading(false);

    if (!res.error) {
      toast.success("Password reset OTP sent to your email");
      navigate('/reset-password', { state: { email } });
    } else {
      toast.error(res.payload || "Failed to send OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-zinc-950 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-600/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-3xl shadow-2xl animate-fadeIn">
        <Link to="/login" className="inline-flex items-center text-sm text-zinc-400 hover:text-white transition-colors mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to login
        </Link>
        
        <div className="flex flex-col items-center mb-8">
          <div className="bg-gradient-to-tr from-violet-600 to-purple-500 rounded-xl p-1.5 shadow-lg shadow-violet-500/20 mb-6">
            <Hexagon className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Forgot Password</h2>
          <p className="text-zinc-400 text-sm text-center">
            Enter your email address and we'll send you a 6-digit code to reset your password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input 
            label="Email address" 
            type="email" 
            required 
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />

          <Button 
            type="submit" 
            className="w-full mt-6 h-12 text-md" 
            isLoading={loading}
          >
            Send Reset Code
          </Button>
        </form>
      </div>
    </div>
  );
};
