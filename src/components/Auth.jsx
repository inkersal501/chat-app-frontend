import { useEffect, useState } from 'react'; 
import auth from "../js/auth";
import { ClipLoader } from 'react-spinners';
import { useDispatch, useSelector } from "react-redux";
import { login, selectIsLogin, updateIsLogin } from "../redux/authSlice";
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Logo from './Logo';


const Auth = () => {

  const isLogin = useSelector(selectIsLogin);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const onSubmit  = async (data) => { 

    setLoading(true);
    
    try {
      if (isLogin) {
        const user = await auth.signIn(data);
        if (user) {
          dispatch(login({ ...user }));
          navigate("/home");
        }
      } else {
        const signUp = await auth.signUp(data);
        if (signUp) {
          dispatch(updateIsLogin(true));
        }
      }
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  useEffect(() => { 
    reset({ username: "", email: "", password: "" });
    //eslint-disable-next-line
  }, [isLogin]);

  return (
    <div className="w-full">
      
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md mx-auto relative border-e-4 border-b-4 border-slate-400">

          {loading && (
            <div className="absolute inset-0 bg-opacity-50 backdrop-blur-[1.5px] flex items-center justify-center z-50 rounded-2xl">
              <ClipLoader color="#1A2980" size={50} />
            </div>
          )}
           
          <div className="flex flex-col md:flex-row items-center md:space-x-4 mb-6">
            <Logo />
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold text-gray-800">
                {isLogin ? 'Sign In' : 'Sign Up'}
              </h2>
              <p className="text-sm text-gray-500">
                {isLogin ? 'Welcome back to ChatApp' : 'Create a new ChatApp account'}
              </p>
            </div>
          </div>
          
          <form className="space-y-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
            {!isLogin && (
              <div className="group focus-within:text-[#1A2980]">
                <label htmlFor="username" className="text-gray-400 group-focus-within:text-[#1A2980]">
                  Username
                </label>
                <input 
                  id="username"
                  type="text"
                  placeholder="Enter Your Username" 
                  autoComplete='on'
                  {...register("username", { required: true })} 
                  className="w-full px-4 py-2 text-black font-medium border border-zinc-300 rounded-lg focus-visible:outline-none focus-visible:border focus-visible:border-[#1A2980]"
                />
                {errors.username && <p className="text-red-500 text-sm mt-1">Username is required</p>}
              </div>
            )}
            <div className="group focus-within:text-[#1A2980]">
              <label htmlFor="email" className="text-gray-400 group-focus-within:text-[#1A2980]">
                Email
              </label>
              <input 
                type="email"
                id="email"
                placeholder="Enter Your Email" 
                autoComplete='on'
                {...register("email", { required: true })}
                className="w-full px-4 py-2 text-black font-medium border border-zinc-300 rounded-lg focus-visible:outline-none focus-visible:border focus-visible:border-[#1A2980]"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">Email is required</p>}
            </div>
            <div className="group focus-within:text-[#1A2980]">
              <label htmlFor="password" className="text-gray-400 group-focus-within:text-[#1A2980]">
                Password
              </label>
              <input 
                type="password"
                id="password"
                placeholder="Enter Your Password"
                autoComplete='off'
                {...register("password", { required: true, minLength: 8 })}
                className="w-full px-4 py-2 text-black font-medium border border-zinc-300 rounded-lg focus-visible:outline-none focus-visible:border focus-visible:border-[#1A2980]"
              />
              {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                Password must be at least 8 characters
              </p>
            )}
            </div>
            {/* <button
              type="submit"
              className="w-full bg-[#1A2980] text-white font-medium py-2 rounded-lg hover:bg-[#26D0CE] transition duration-300 cursor-pointer"
            >
              {isLogin ? 'Sign In' : 'Sign Up'}
            </button> */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white font-medium py-2 rounded-lg transition duration-300 cursor-pointer ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#1A2980] hover:bg-[#26D0CE]'
              }`}
            >
              {isLogin ? 'Sign In' : 'Sign Up'}
            </button> 
          </form>
  
          <div className="text-center mt-4 text-sm text-gray-600">
            {isLogin ? (
              <>
                Don’t have an account?{' '}
                <button
                  onClick={() => dispatch(updateIsLogin(false))}
                  className="text-[#1A2980] hover:underline font-medium cursor-pointer underline"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  onClick={() => dispatch(updateIsLogin(true))}
                  className="text-[#1A2980] hover:underline font-medium cursor-pointer underline"
                >
                  Sign In
                </button>
              </>
            )}
          </div>
   
        </div> 
    </div>
  );
};

export default Auth;
