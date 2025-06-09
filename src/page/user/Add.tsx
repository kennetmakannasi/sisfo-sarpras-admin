import ModalLayout from "../../components/layouts/modal";
import axios from "axios";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router";
import { Icon } from "@iconify/react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function AddUser({trigger}){
    var token = localStorage.getItem("auth_token"); 
    let navigate = useNavigate();
    const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm();
  const [viewpw, setViewPw] = useState(false);

    async function onSubmit(data) {
    try{
      const res = await axios.post('http://127.0.0.1:8000/api/admin/users',{
        username: data.username,
        password: data.password
      },{
        headers:{
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
      },
    );
    
    toast.success('User Created!')
    trigger();
    setTimeout(() => {
      navigate(0)  
    }, 500);

    }catch(error){
      console.error(error)

          if (error.response) {
          const status = error.response.status;

            if (status === 422) {
                toast.error("Username already taken");
            }
        } else {
            toast.error("Network error or unknown error");
        }
    }
	};

  function triggerViewPw(){
    setViewPw(!viewpw);
  }

    return(
        <ModalLayout>
          <Toaster/>
            <form className="relative" onSubmit={handleSubmit(onSubmit)}>
                <h1 className="text-3xl font-semibold"> Add User</h1>
                <p>Add new users</p>
                <button type="button" onClick={trigger} className="size-10 flex items-center justify-center absolute top-0 right-0 rounded-full hover:bg-gray-100 duration-150 transition-all">
                  <Icon height={25} width={25} icon="proicons:cancel"/>
                </button>
                <div className="mt-10">
                    <div className="w-full mt-5">
                        <label htmlFor="username" className="font-semibold">Username</label>
                        <input className="bg-ultralight-blue focus:outline-blue-400 w-full h-10 rounded-lg px-3" id="username" placeholder="username" type="text" {...register('username', { required: true })}/>
                        {errors.username && <div>Name is required</div>}
                    </div>
                    <div className="w-full mt-5">
                        <label htmlFor="password" className="font-semibold">Password</label>
                        <div className="w-full relative">
                          <input className="mt-2 bg-ultralight-blue focus:outline-blue-400 w-full h-10 rounded-lg px-3" id="password" placeholder="Enter Your password" type={viewpw === false ? 'password' : 'text'} 
                          {...register('password', { required: true, minLength: 8 })} />  
                          <button type="button" onClick={triggerViewPw} className="absolute right-3 h-full flex items-center top-1 text-gray-400">
                            <Icon icon={viewpw === false ? 'carbon:view-off-filled' : 'carbon:view-filled'}/>
                          </button>
                        </div>
                        {errors.password && <div>Password must be at least 8 characters long</div>}
                    </div> 
                    <div className="w-full mt-10">
                        <button type="submit" className="w-full h-10 text-center bg-blue-400 hover:bg-blue-500 text-white rounded-lg duration-150">Add</button>
                    </div> 
                </div>
            </form>
        </ModalLayout>
    )
}