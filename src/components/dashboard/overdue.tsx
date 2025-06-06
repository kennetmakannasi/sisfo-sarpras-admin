import { useFetchData } from "../../custom-hooks/fetch"

export default function OverdueTable(){

    const {data} = useFetchData("/admin/dashboard/overdue");

    const overdueData = data.overdueBorrows || [];

    console.log(data)

    return(
        <div>
            <h1 className="text-3xl mb-3">{data?.dueStats?.overdueCount || '...'}</h1>
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
        </div>
    )
}