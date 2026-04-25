import React, { useEffect, useState } from 'react';
import { Input } from './Input';
import { Button } from './Button';
import { Link, useNavigate } from 'react-router-dom';
import { Hexagon, Loader } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/auth/authSlice';
import { toast } from 'react-toastify';

export const RegisterForm = () => {

  
  
  const { user , isLoading , isError , isSuccess , message} = useSelector(state => state.auth);
  
  const [formData , setFormData] = useState({
    name : "" ,
    email : "" ,
    phone : "" ,
    password : "" ,
    bio : "" ,
    
  })
  
  const {name , email , phone , password , bio} = formData
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name] : e.target.value
    })
  }
  
  
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const handleSubmit = (e) => {
    e.preventDefault();


    //Register User 
    dispatch(registerUser(formData))
    
    // Simulate API delay
    setTimeout(() => {
      navigate('/feed');
    }, 1000);
  };


  useEffect(() => {
    if(user){
      navigate("/")
    }

    if(isError && message) {
      toast.error(message , {position : "top-center"})
    }

  }, [user , isError , message])


  if(isLoading) {
    return (
      <Loader/>
    )
  }



  return (
    <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-3xl shadow-2xl animate-fadeIn">
      <div className="flex flex-col items-center mb-8">
        <Link to="/" className="flex items-center gap-2 group mb-6">
          <div className="bg-gradient-to-tr from-violet-600 to-purple-500 rounded-xl p-1.5 shadow-lg shadow-violet-500/20 group-hover:scale-110 transition-transform">
            <Hexagon className="h-8 w-8 text-white" />
          </div>
        </Link>
        <h2 className="text-3xl font-bold text-white mb-2">Join Imaginex</h2>
        <p className="text-zinc-400 text-sm">Create an account to save your creations</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input 
          label="Username" 
          type="text" 
          required 
          name = 'name'
          value={name}
          onChange={handleChange}
          placeholder="artvault"
        />
        <Input 
          label="Email address" 
          type="email" 
          required 
          name = 'email'
          value={email}
          onChange={handleChange}
          placeholder="you@example.com"
        />
        <Input 
          label="Phone Number"
          type="phone" 
          required 
          name = 'phone' 
          value={phone}
          onChange={handleChange}
          placeholder="+919123456789"
        />
        <Input 
          label="Password"
          type="password" 
          required 
          name = 'password'
          value={password}
          onChange={handleChange}
          placeholder="••••••••"
        />
        <Input 
          label="Bio"
          type="text" 
          required 
          name = 'bio'
          value={bio}
          onChange={handleChange}
          placeholder="Enter Your Bio"
        />
        
        
        <p className="text-xs text-zinc-500 mt-2">
          By signing up, you agree to our Terms of Service and Privacy Policy.
        </p>

        <Button 
          type="submit" 
          className="w-full mt-4 h-12 text-md" 
          isLoading={isLoading}
        >
          {isLoading ? 'Creating account...' : 'Create account'}
        </Button>
      </form>

      <div className="mt-8 text-center text-sm text-zinc-400">
        Already have an account?{' '}
        <Link to="/login" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
          Log in
        </Link>
      </div>
    </div>
  );
};
