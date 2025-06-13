import { useFetchData } from "../../custom-hooks/fetch"
import { BorrowStatusView, ReturnStatusView } from "../statusview"
import { useState } from "react"
import Listboxcomp from "../Listbox"
import { ListboxOption } from "@headlessui/react"
import TableLoading from "../tableloading"

export default function RecentData(){
    const[dataView, setDataView] = useState('borrow')

    return(
        <div className="h-full">
            <p>Recent Activities</p>
            <div className="w-36 mt-2 mb-3">
                <Listboxcomp value={dataView} onChange={setDataView}
                buttonText={dataView === 'borrow'? 'Borrowing ':'Returning '}
                content={
                <div className="h-full">
                    <ListboxOption className="hover:bg-gray-100 duration-150 transition-all px-3 py-1" value={'borrow'}>Borrow</ListboxOption>
                    <ListboxOption className="hover:bg-gray-100 duration-150 transition-all px-3 py-1" value={'return'}>Return</ListboxOption>
                </div>
            }/>    
            </div>

            {dataView === 'borrow' ? (<RecentBorrowTable/>) : (<RecentReturnTable/>)}    
        </div>
    )
}

const RecentBorrowTable = () => {

        const {data} = useFetchData("/admin/dashboard/borrowing")

    const borrowData = data?.recentborrows || []

    return(
        <div className="h-full overflow-x-auto ">
            {borrowData.length === 0 ? (
                <TableLoading/>
            ):(
                <table className='w-full rounded-xl'>
                    <thead>
                        <tr className='text-gray-400 shadow-md rounded-xl'>
                            <td className='p-3 w-10 rounded-l-xl bg-ultralight-blue'>ID</td>
                            <td className='p-3 bg-ultralight-blue'>Item</td>
                            <td className='p-3 bg-ultralight-blue'>User</td>
                            <td className='p-3 bg-ultralight-blue'>Quantity</td>
                            <td className='p-3 rounded-r-xl bg-ultralight-blue'>Status</td>
                        </tr>
                    </thead> 
                    <tbody>
                        {borrowData.map((item:any) => (
                        <tr className='border-b-2 border-gray-200 font-normal' key={item.id}>
                            <td className='p-3'>{item.id}</td>
                            <td className='p-3'>{item.item.name}</td>
                            <td className='p-3'>{item.user.username}</td>
                            <td className='p-3'>{item.quantity}</td>
                            <td className='p-3'>
                                <div className='flex items-center'>
                                    <BorrowStatusView status={item.status}/>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
            
        </div>
    )
}

const RecentReturnTable = () => {

    const {data} = useFetchData("/admin/dashboard/returning")

    const returnData = data?.recentreturnings || []


    return(
        <div className="h-full overflow-x-auto">
            {returnData.length === 0 ? (
                <TableLoading/>
            ):(
                <table className="w-full rounded-xl">
                    <thead>
                        <tr className='text-gray-400 shadow-md rounded-xl'>
                    <td className='p-3 w-10 rounded-l-xl bg-ultralight-blue'>ID</td>
                    <td className='p-3 bg-ultralight-blue'>Borrow Id</td>
                    <td className='p-3 bg-ultralight-blue'>Item</td>
                    <td className='p-3 bg-ultralight-blue'>User</td>
                    <td className='p-3 bg-ultralight-blue'>Returned Quantity</td>
                    <td className='p-3 rounded-r-xl bg-ultralight-blue'>Status</td>
                        </tr>
                    </thead> 
                    <tbody>
                        {returnData.map((item:any) => (
                        <tr className='border-b-2 border-gray-200 font-normal' key={item.id}>
                        <td className="p-3">{item.id}</td>
                    <td className="p-3">{item.borrow_id}</td>
                    <td className="p-3">{item.borrowing.item.name}</td>
                    <td className="p-3">{item.borrowing.user.username}</td>
                    <td className="p-3">{item.returned_quantity}</td>
                    <td className="p-3">
                        <div className="flex items-center">
                            <ReturnStatusView status={item.handled_by}/>
                        </div>
                    </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}