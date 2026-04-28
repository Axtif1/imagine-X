import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { verifyEmail, resendOtp, reset } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
import { Hexagon, Loader } from 'lucide-react';
import { Button } from '../components/Button';

export const VerifyEmailPage = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [cooldown, setCooldown] = useState(60);
  const inputRefs = useRef([]);
  
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  const email = location.state?.email || localStorage.getItem('verifyEmail');
  
  const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!email) {
      navigate('/register');
    }
  }, [email, navigate]);

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(c => c - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset());
    }
    if (isSuccess && message === "Email verified successfully. You can now log in.") {
      toast.success(message);
      localStorage.removeItem('verifyEmail');
      dispatch(reset());
      navigate('/login');
    }
  }, [isError, isSuccess, message, navigate, dispatch]);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }
    
    dispatch(verifyEmail({ email, otp: otpValue }));
  };

  const handleResend = () => {
    if (cooldown > 0) return;
    
    dispatch(resendOtp({ email })).then((res) => {
      if(!res.error) {
        toast.success("OTP resent successfully!");
        setCooldown(60);
      }
    });
  };

  if(isLoading && !otp.join('')) {
      return <Loader />
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-zinc-950 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-600/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-3xl shadow-2xl animate-fadeIn">
        <div className="flex flex-col items-center mb-8">
          <Link to="/" className="flex items-center gap-2 group mb-6">
            <div className="bg-gradient-to-tr from-violet-600 to-purple-500 rounded-xl p-1.5 shadow-lg shadow-violet-500/20 group-hover:scale-110 transition-transform">
              <Hexagon className="h-8 w-8 text-white" />
            </div>
          </Link>
          <h2 className="text-3xl font-bold text-white mb-2">Verify Email</h2>
          <p className="text-zinc-400 text-sm text-center">
            We sent a 6-digit code to <br/> <span className="text-violet-400 font-medium">{email}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-2 sm:gap-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                ref={(el) => (inputRefs.current[index] = el)}
                value={digit}
                onChange={(e) => handleChange(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-14 text-center text-2xl font-bold text-white bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
              />
            ))}
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 text-md mt-4"
            isLoading={isLoading}
          >
            Verify Email
          </Button>
        </form>

        <div className="mt-8 text-center text-sm">
          <p className="text-zinc-400">
            Didn't receive the code?{' '}
            <button
              type="button"
              onClick={handleResend}
              disabled={cooldown > 0}
              className={`font-medium transition-colors ${
                cooldown > 0 ? 'text-zinc-600 cursor-not-allowed' : 'text-violet-400 hover:text-violet-300'
              }`}
            >
              {cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend Code'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
