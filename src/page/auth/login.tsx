import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router";
import axios from "axios"
import AuthFormLayout from "../../components/layouts/authlayout";
import { useState } from "react";
import { Icon } from "@iconify/react";
import toast, {Toaster} from "react-hot-toast";

export default function Login(){
  let navigate = useNavigate();
  const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm();
  const [viewpw, setViewPw] = useState(false)

async function onSubmit(data:any) {
    try {
        const res = await toast.promise(
            axios.post('http://127.0.0.1:8000/api/auth/login', {
                username: data.username,
                password: data.password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            {
                loading: 'Logging In...',
                success: <b>Success!</b>,
            }
        );

        const resdata = res.data.data.token;

        localStorage.setItem('auth_token', resdata);
        navigate("/");

    } catch (error:any) {
        if (error.response) {
            const status = error.response.status;

            if (status === 400) {
                toast.error("Wrong password or username");
            } else if (status === 500) {
                toast.error("Something wrong in our server");
            } else {
                toast.error("An unexpected error occurred");
            }
        } else {
            toast.error("Network error or unknown error");
        }

        console.error(error);
    }
}

  function triggerViewPw(){
    setViewPw(!viewpw);
  }
  
    return(
      <div className="md:grid md:grid-cols-5">
        <Toaster/>
        <AuthFormLayout>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1 className="text-3xl font-semibold">Welcome Back</h1>
                <p>Log In to your account</p>
                <div className="mt-10">
                    <div className="w-full mt-5 relative">
                        <label htmlFor="username" className="font-semibold">Username</label>
                        <input className="mt-2 bg-ultralight-blue focus:outline-blue-400 w-full h-10 rounded-lg px-3 " id="username" placeholder="Enter Your Username" type="text" 
                        {...register('username', { required: true })}/>
                        {errors.username && <div className="absolute">Name is required</div>}
                    </div>
                    <div className="w-full mt-7 relative">
                        <label htmlFor="password" className="font-semibold">Password</label>
                        <div className="w-full relative">
                          <input className="mt-2 bg-ultralight-blue focus:outline-blue-400 w-full h-10 rounded-lg px-3" id="password" placeholder="Enter Your password" type={viewpw === false ? 'password' : 'text'} 
                          {...register('password', { required: true, minLength: 8 })} />  
                          <button type="button" onClick={triggerViewPw} className="absolute right-3 h-full flex items-center top-1 text-gray-400">
                            <Icon icon={viewpw === false ? 'carbon:view-off-filled' : 'carbon:view-filled'}/>
                          </button>
                        </div>
                        {errors.password && <div className="absolute">Password must be at least 8 characters long</div>}
                          
                    </div> 
                    <div className="w-full mt-10">
                        <button type="submit" className="w-full h-10 text-center bg-blue-400 hover:bg-blue-500 text-white rounded-lg duration-150">Log In</button>
                    </div> 
                    <div className="w-full mt-10 flex justify-center">
                        <p>Didnt't have a account? </p>
                        <Link className="ml-2 text-blue-400 underline underline-offset-2 hover:text-blue-500" to='/register'>Register</Link>
                    </div> 
                </div>    
            </form>
        </AuthFormLayout>
        <div className="w-full hidden md:col-span-2 h-screen py-5 pr-5 md:flex justify-center">
          <img className="w-full rounded-xl shadow-md object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSJW0Psbr1T-o2WOqbHu_AlqxEOvEavTe9Wg&s" alt="" />  
        </div>
      </div>
        
    )
}