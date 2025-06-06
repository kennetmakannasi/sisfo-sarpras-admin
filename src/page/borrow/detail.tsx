import ModalLayout from "../../components/layouts/modal"
import { BorrowStatusView } from "../../components/statusview"
import { useFetchData } from "../../custom-hooks/fetch"
import { Icon } from "@iconify/react"

export default function BorrowDetail({id, trigger}){
    const{data} = useFetchData(`/admin/borrows/${id}`)

    return(
        <ModalLayout>
            <div className="relative">
                <h1 className="text-3xl font-semibold">Details</h1>   
                <p>borrowing details</p>
                <div className="flex items-center absolute top-0 right-0">
                    {/* <div className={`w-24 rounded-lg py-0.5 text-center mr-2 ${
                        data.status === 'pending'? 'text-yellow-500 bg-yellow-100 ':
                        data.status === 'approved'? 'text-green-500 bg-green-100': 
                        data.status === 'rejected'? 'text-red-500 bg-red-100': 
                        data.status === 'returned' ? 'text-blue-700 bg-blue-100': 'text-black'
                        }`}>
                        {data.status}
                    </div>  */}
                    <button onClick={trigger} className="size-10 flex items-center justify-center rounded-full hover:bg-gray-100 duration-150 transition-all">
                        <Icon height={25} width={25} icon="proicons:cancel"/>
                    </button>    
                </div>
                <p className="mt-5">Item</p>
                <div className="flex h-16 items-center mt-2 relative">
                    <img className="size-16 rounded-lg object-cover" src={data?.item?.image_url || 'assets/placeholder.png'} alt="" />
                    <div className=" ml-4">
                        <p>{data?.item?.name || 'Loading...'}</p>
                        <p className="text-sm">{data?.item?.sku || 'Loading...'}</p>
                    </div>
                    <p className="absolute right-0">Qty: {data?.quantity || 'Loading...'}</p>
                </div>
                <div className="flex relative w-full mt-7">
                    <p>Borrowing Date</p>
                    <p className="absolute right-0">{data?.created_at?.substring(0,10) || 'Loading...'}</p>
                </div>
                 <div className="flex relative h-full items-center w-full mt-2">
                    <p>Status</p>
                    <div className="absolute right-0">
                        <BorrowStatusView status={data.status}/>
                    </div>
                </div>
                <div className="flex relative mt-8 w-full">
                    <p>borrowing user</p>
                    <p className="absolute right-0">{data?.user?.username || 'Loading...'}</p>
                </div>
                
                {/* <img className="w-full h-80 rounded-lg object-cover" src={data?.item?.image_url || 'assets/placeholder.png'} alt="" />   
                <p>borrowed item: {data?.item?.name || 'a'}</p>
                <p>borrowing quantity: {data?.quantity || 'a'}</p> 
                <p>borrowing user: {data?.user?.username || 'a'}</p> */}
            </div>
        </ModalLayout>
    )
}