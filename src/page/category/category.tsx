import CategoryTable from "../../components/tables/categorytable"
import BaseCard from "../../components/basecard";
import { useFetchData } from "../../custom-hooks/fetch";

export default function Category(){

    const {data} = useFetchData('/admin/dashboard')
    
    return(
        <BaseCard>
            <div className="flex h-7 items-center">
                <h1 className="text-2xl font-semibold">Categories</h1>   
                <p className="text-sm ml-3 text-gray-400">{data?.categoryCount || 0} categories</p>
            </div>
            <CategoryTable/>   
        </BaseCard>
    )
}