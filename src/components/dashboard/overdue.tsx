import { useFetchData } from "../../custom-hooks/fetch"
import { Icon } from "@iconify/react/dist/iconify.js";
import TableLoading from "../tableloading";
import { Tab } from "@headlessui/react";
import { useState, useEffect } from "react";

export default function OverdueTable(){

    const {data} = useFetchData("/admin/dashboard/overdue");

    const overdueData = data?.overdueBorrows|| [];

    return(
        <div>
            <div className="flex mb-3 items-center  ">
                <Icon className="mr-2 text-gray-400" height={30} icon="material-symbols:warning"/>
                <h1 className="text-3xl">{data?.dueStats?.overdueCount === 0 ? 
                    ("0"):
                    (data?.dueStats?.overdueCount || <Icon className="animate-spin" icon='eos-icons:loading'/>)}
                </h1>    
            </div>
            <p className="mt-4 mb-1">Recent Overdues</p>
            {overdueData.length === 0 ? (
                <div className="h-46 w-full flex items-center justify-center">
                    {data?.dueStats?.overdueCount === 0 ? ('No Overdue Borrowings'):( <Icon height={50} className="animate-spin" icon='eos-icons:loading'/>)}
                </div>
            ):(
                <table className='w-full rounded-xl'>
                    <thead>
                        <tr className='text-gray-400 shadow-md rounded-xl'>
                            <td className='p-3 w-10 rounded-l-xl bg-ultralight-blue'>ID</td>
                            <td className='p-3 bg-ultralight-blue'>Item Id</td>
                            <td className='p-3 bg-ultralight-blue'>Qty</td>
                        </tr>
                    </thead> 
                    <tbody>
                        {overdueData.map((item) => (
                        <tr className='border-b-2 border-gray-200 font-normal' key={item.id}>
                            <td className='p-3'>{item.id}</td>
                            <td className='p-3'>{item.item_id}</td>
                            <td className='p-3'>{item.quantity}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}