import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate, Outlet, Link } from 'react-router';
import { useFetchData } from "../custom-hooks/fetch";
import { Icon } from '@iconify/react';
import toast,{Toaster} from "react-hot-toast";
import ModalTransition from "./modaltransition";
import DeleteDialog from "./deletedialog";

export default function SideBar(){
    const [logoutDialog, setLogoutDialog]= useState(false)
    const location = useLocation();
    let navigate = useNavigate();
    var token = localStorage.getItem("auth_token")
    const isActive = (url: string) => {
        return location.pathname === url;
    };

    const [SidebarOpen, setSidebarOpen] = useState(false)

    function triggerSidebar(){
        setSidebarOpen(!SidebarOpen)
    }

    async function logout() {
        try{
            const res = await axios.get('http://127.0.0.1:8000/api/auth/logout',{
                headers: {
                Authorization: `Bearer ${token}`,
                },
            });
            localStorage.removeItem("auth_token");  
            navigate('/login')  
        }catch(error){
            console.error(error)
        }
    }

    const { data } = useFetchData("/auth/self");

    return(
    <>
    <Toaster/>
          <ModalTransition open={logoutDialog} onclose={()=>setLogoutDialog(false)} 
          content={
            <DeleteDialog text="you will have to log in again if you log out"
            cancel={()=>setLogoutDialog(false)}
            action={logout}
            buttonText="Logout"/>
          }/>
    <div className=" absolute top-0 lg:relative">
        <div className={`h-screen w-52 rounded-r-2xl bg-ultralight-blue duration-300 shadow-md lg:translate-x-0 ${SidebarOpen? '-translate-x-full': 'translate-x-0'}`}>
            <div className=" p-2 text-gray-400 gap-3 h-full w-full relative">
                <div className="w-full absolute px-2 top-3 inset-x-0">
                    <div className="flex pl-2 bg-white size-full py-3 shadow-md relative rounded-lg text-gray-700">
                        <div className="flex items-center">
                            <div className="size-8 rounded-full bg-blue-600" ></div>
                            <div className="ml-3">
                                <p className="font-semibold text-sm">Sisfo Sarpras</p>   
                            </div>    
                        </div>
                        <button type="button" onClick={triggerSidebar} className=" absolute right-2 text-gray-300 rounded-full hover:bg-gray-100 duration-150 transition-all">
                            <Icon className="lg:hidden" width={16} icon="weui:back-filled"/>
                        </button>
                    </div>
                </div>
                <div className="mt-24">
                    <h1 className="ml-2 text-sm">General</h1>
                    <Link to="/" className={`flex items-center w-full p-1.5 mt-1 pl-2 rounded-md duration-200 ${isActive('/') ? 'bg-blue-300 text-blue-500 hover:bg-blue-400' : 'hover:bg-ultralight-blue-hover'}`}>
                        <Icon height={22} icon="material-symbols:dashboard" />
                        <a className="ml-1.5">Dashboard</a>
                    </Link>
                </div>
                <div className="mt-6">
                    <h1 className="ml-2 text-sm">Master Data</h1>
                    <Link to="/users" className={`flex items-center w-full p-1.5 mt-1 pl-2 rounded-md duration-200 ${isActive('/users') ? 'bg-blue-300 text-blue-500 hover:bg-blue-400' : 'hover:bg-ultralight-blue-hover'}`}>
                        <Icon height={22} icon="mdi:users"/>
                        <a className="ml-1.5">Users</a>
                    </Link>    
                    <Link to="/items" className={`flex items-center w-full p-1.5 mt-1 pl-2 rounded-md duration-200 ${isActive('/items') ? 'bg-blue-300 text-blue-500 hover:bg-blue-400' : 'hover:bg-ultralight-blue-hover'}`}>
                        <Icon height={22} icon="mdi:invoice-line-items"/>
                        <a className="ml-1.5">Items</a>
                    </Link>
                    <Link to="/categories" className={`flex items-center w-full p-1.5 mt-1 pl-2 rounded-md duration-200 ${isActive('/categories') ? 'bg-blue-300 text-blue-500 hover:bg-blue-400' : 'hover:bg-ultralight-blue-hover'}`}>
                        <Icon height={22} icon="mdi:category-plus"/>
                        <a className="ml-1.5">Categories</a>
                    </Link>    
                </div>
                <div className="mt-6">
                    <h1 className="ml-2 text-md">Item Activities</h1>
                    <Link to="/borrows" className={`flex items-center w-full p-1.5 mt-1 pl-2 rounded-md duration-200 ${isActive('/borrows') ? 'bg-blue-300 text-blue-500 hover:bg-blue-400' : 'hover:bg-ultralight-blue-hover'}`}>
                        <Icon height={20} icon="streamline:give-gift-solid"/>
                        <a className="ml-2">Borrows</a>
                    </Link>    
                    <Link to="/returns" className={`flex items-center w-full p-1.5 mt-1 pl-2 rounded-md duration-200 ${isActive('/returns') ? 'bg-blue-300 text-blue-500 hover:bg-blue-400' : 'hover:bg-ultralight-blue-hover'}`}>
                        <Icon height={22} icon="material-symbols:assignment-return"/>
                        <a className="ml-1.5">Returns</a>
                    </Link>        
                </div>
                
                
                <div className="w-full absolute bottom-3 inset-x-0 px-2">
                    <div className="flex pl-2 bg-white size-full py-3 shadow-md relative rounded-lg text-gray-700">
                        <div className="flex items-center">
                            <img className="size-8 rounded-full" src="assets/user.png" alt="" />
                            <div className="ml-3">
                                <p className="font-semibold text-sm">{data?.username?.length <= 12 ? data?.username || '': data?.username?.substring(0,9)+'...'}</p>
                                <p className="text-xs">Admin</p>   
                            </div>    
                        </div>
                        <button type="button" onClick={()=>setLogoutDialog(true)} className=" absolute right-0 text-gray-300 rounded-full p-1.5 hover:bg-gray-100 duration-150 transition-all">
                            <Icon width={22} icon="material-symbols:logout"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>    
    </div>
    <button onClick={triggerSidebar} className={`absolute w-5 p-1 mt-1 lg:hidden text-gray-400 bg-white rounded-r-full hover:bg-ultralight-blue-hover duration-200 ${SidebarOpen? 'block': 'hidden'}`}>
        <Icon className="lg:hidden rotate-180" width={12} icon="weui:back-filled"/>
    </button>
    </>   
    )
}