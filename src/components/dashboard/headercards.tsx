import DashboardContainer from "../dashboardContainer"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useFetchData } from "../../custom-hooks/fetch"
import { Link } from "react-router"

export default function HeaderCards(){

    const{data} = useFetchData('/admin/dashboard')

    return(
        <>
        <div className="col-span-4 sm:col-span-2 lg:col-span-1">
            <DashboardContainer>
                <div className="w-full relative">
                   <p className="ml-1 text-gray-400">Total Users</p>
                    <div className="flex w-full items-center m-1">
                    <Icon className="text-gray-400" height={32} icon="mdi:users"/>
                    <p className="text-gray-700 text-4xl ml-2">{data?.userCount  || <Loading/>}</p>
                    </div>
                    <Link to='/users'>
                        <Icon height={32} className="absolute top-0 right-0 text-gray-400 hover:bg-gray-100 hover:rounded-full transition-all duration-150" icon="solar:arrow-right-up-outline"/> 
                    </Link>
                </div>
            </DashboardContainer>    
        </div>
       <div className="col-span-4 sm:col-span-2 lg:col-span-1">
            <DashboardContainer>
                <div className="w-full relative">
                   <p className="ml-1 text-gray-400">Total Items</p>
                    <div className="flex w-full items-center m-1">
                    <Icon className="text-gray-400" height={32} icon="mdi:invoice-line-items"/>
                    <p className="text-gray-700 text-4xl ml-2">{data?.itemCount  || <Loading/>}</p>
                    </div>
                    <Link to='/items'>
                        <Icon height={32} className="absolute top-0 right-0 text-gray-400 hover:bg-gray-100 hover:rounded-full transition-all duration-150" icon="solar:arrow-right-up-outline"/> 
                    </Link>
                </div>
            </DashboardContainer>    
        </div>
        <div className="col-span-4 sm:col-span-2 lg:col-span-1">
            <DashboardContainer>
                <div className="w-full relative">
                   <p className="ml-1 text-gray-400">Total Borrows</p>
                    <div className="flex w-full items-center m-1">
                    <Icon className="text-gray-400" height={30} icon="streamline:give-gift-solid"/>
                    <p className="text-gray-700 text-4xl ml-2">{data?.borrowingCount  || <Loading/>}</p>
                    </div>
                    <Link to='/borrows'>
                        <Icon height={32} className="absolute top-0 right-0 text-gray-400 hover:bg-gray-100 hover:rounded-full transition-all duration-150" icon="solar:arrow-right-up-outline"/> 
                    </Link>
                </div>
            </DashboardContainer>    
        </div>
        <div className="col-span-4 sm:col-span-2 lg:col-span-1">
            <DashboardContainer>
                <div className="w-full relative">
                   <p className="ml-1 text-gray-400">Total Returns</p>
                    <div className="flex w-full items-center m-1">
                    <Icon className="text-gray-400" height={32} icon="material-symbols:assignment-return"/>
                    <p className="text-gray-700 text-4xl ml-2">{data?.returningCount  || <Loading/>}</p>
                    </div>
                    <Link to='/returns'>
                        <Icon height={32} className="absolute top-0 right-0 text-gray-400 hover:bg-gray-100 hover:rounded-full transition-all duration-150" icon="solar:arrow-right-up-outline"/> 
                    </Link>
                </div>
            </DashboardContainer>    
        </div>
        </>
    )
}

const Loading = () => {
    return(
        <div className='w-full flex justify-center items-center'>
            <Icon className='animate-spin' height={50} icon='eos-icons:loading'/>  
        </div>
    )
}