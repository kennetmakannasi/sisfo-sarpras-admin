import { useLocation, useNavigate, Outlet, Link } from 'react-router';
import SideBar from "../sidebar";

export default function Layout(){
    const location = useLocation();

    return(
        <div className="flex min-h-screen">
            <div className="sticky top-0 h-screen z-20">
                <SideBar/>    
            </div>
            <div className=" size-full mt-5 px-4 md:px-6 text-gray-700 overflow-y-hidden">
                <div className='text-gray-400 mb-3'>
                    <a className='hover:text-gray-500 transition-all duration-150' href='/'>Dashboard</a>
                    <a href={location.pathname}>{location.pathname === '/' ? '' : ' / '}</a>
                    <a className='hover:text-gray-500 transition-all duration-150' href={location.pathname}>{location.pathname === '/' ? '' : `${location.pathname.substring(1,2).toUpperCase() + location.pathname.substring(2)}`}</a>
                </div>
                <Outlet/>
            </div>
        </div>
    )

}