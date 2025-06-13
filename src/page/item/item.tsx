import ItemTable from "../../components/tables/itemtable"
import BaseCard from "../../components/basecard";
import { useFetchData } from "../../custom-hooks/fetch";

export default function Item(){

    const {data} = useFetchData('/admin/dashboard')

    return(
        <>
        <BaseCard>
            <div className="flex h-7 items-center relative">
                <h1 className="text-2xl font-semibold">Items</h1>   
                <p className="text-sm ml-3 text-gray-400">{data?.itemCount || 0} items</p>
            </div>
            <ItemTable/>    
        </BaseCard>
        </>
    )
}