import ItemTable from "../../components/tables/itemtable"
import BaseCard from "../../components/basecard";
import { useFetchData } from "../../custom-hooks/fetch";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Item(){

    const {data} = useFetchData('/admin/dashboard')

    return(
        <>
        <BaseCard>
            <div className="flex h-7 items-center relative">
                <h1 className="text-2xl font-semibold">Items</h1>   
                <p className="text-sm ml-3 text-gray-400">{data?.itemCount || 0} items</p>
                {/* <div className="grid grid-cols-3 w-38 gap-1 absolute right-0">
                <button className='flex h-full justify-center items-center w-10 p-1 border-2 border-gray-200 hover:bg-gray-100 duration-150 transition-all shadow-md rounded-lg'>
                          <Icon height={24} icon={'material-symbols:download-rounded'}/>
                        </button>
                        <button className="size-full h-full col-span-2 flex items-center justify-center text-center shadow-md bg-blue-400 hover:bg-blue-500 text-white rounded-lg duration-150">
                          <Icon height={22} icon={'material-symbols:add-rounded'}/>  
                          <p className=''>Add</p>  
                        </button>      
                </div> */}
                
            </div>
            <ItemTable/>    
        </BaseCard>
        </>
    )
}