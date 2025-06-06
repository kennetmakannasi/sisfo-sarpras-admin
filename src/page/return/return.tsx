import ReturnTable from "../../components/tables/returntable"
import BaseCard from "../../components/basecard"
import { useFetchData } from "../../custom-hooks/fetch"

export default function Return(){

    const {data} = useFetchData("/admin/dashboard")

    return(
        <>
        <BaseCard>
            <div className="flex h-7 items-center">
                <h1 className="text-2xl font-semibold">Returns</h1>   
                <p className="text-sm ml-3 text-gray-400">{data?.returningCount || 0} return requests</p>
            </div>
            <ReturnTable/>    
        </BaseCard>
        </>
    )
}