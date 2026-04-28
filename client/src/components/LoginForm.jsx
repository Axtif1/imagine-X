import React, { useEffect, useState } from 'react';
import { Input } from './Input';
import { Button } from './Button';
import { Link, useNavigate } from 'react-router-dom';
import { Hexagon, Loader } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/auth/authSlice';
import { toast } from 'react-toastify';

export const LoginForm = () => {

  const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const { email, password } = formData

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }


  const navigate = useNavigate()
  const dispatch = useDispatch()


  const handleSubmit = (e) => {
    e.preventDefault();


    //Login User 
    dispatch(loginUser(formData))

  }


  useEffect(() => {
    if (isSuccess || user) {
      navigate("/feed")
    }

    if (isError && message) {
      toast.error(message, { position: "top-center" })
    }

  }, [user, isError, message])


  return (
    <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-3xl shadow-2xl animate-fadeIn">
      <div className="flex flex-col items-center mb-8">
        <Link to="/" className="flex items-center gap-2 group mb-6">
          <div className="bg-gradient-to-tr from-violet-600 to-purple-500 rounded-xl p-1.5 shadow-lg shadow-violet-500/20 group-hover:scale-110 transition-transform">
            <Hexagon className="h-8 w-8 text-white" />
          </div>
        </Link>
        <h2 className="text-3xl font-bold text-white mb-2">Welcome back</h2>
        <p className="text-zinc-400 text-sm">Log in to discover new inspiration</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Email address"
          name="email"
          value={email}
          onChange={handleChange}
          type="email"
          required
          placeholder="you@example.com"
        />
        <div>
          <Input
            label={
              <span className="flex w-full items-center justify-between">
                Password
                <Link to="/forgot-password" className="text-xs text-violet-400 hover:text-violet-300 transition-colors">Forgot password?</Link>
              </span>
            }
            type="password"
            name="password"
            required
            value={password}
            onChange={handleChange}
            placeholder="••••••••"
          />
        </div>

        <Button
          type="submit"
          className="w-full mt-2 h-12 text-md"
          isLoading={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>

      <div className="mt-8 text-center text-sm text-zinc-400">
        Don't have an account?{' '}
        <Link to="/register" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
          Sign up
        </Link>
      </div>
    </div>
  );
};
