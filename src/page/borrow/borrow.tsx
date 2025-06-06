import { useState, useEffect } from "react"
import BorrowTable from "../../components/tables/borrowtable";
import BaseCard from "../../components/basecard";
import { useFetchData } from "../../custom-hooks/fetch";

export default function Borrow(){
    
    const {data} = useFetchData("/admin/dashboard")

    return(
        <>
        <BaseCard>
            <div className="flex h-7 items-center">
                <h1 className="text-2xl font-semibold">Borrows</h1>   
                <p className="text-sm ml-3 text-gray-400">{data?.borrowingCount || 0} borrow requests</p>
            </div>
            <BorrowTable/>    
        </BaseCard>
        </>
    )
}