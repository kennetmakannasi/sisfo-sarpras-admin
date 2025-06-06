import { useState, useEffect } from "react"
import UserTable from "../../components/tables/usertable"
import AddUser from "./Add"
import BaseCard from "../../components/basecard";
import { useFetchData } from "../../custom-hooks/fetch";

export default function User(){
    
    const {data} = useFetchData('/admin/dashboard')

    return(
        <>
        <BaseCard> 
        <div className="flex h-7 items-center">
          <h1 className="text-2xl font-semibold">Users</h1>   
          <p className="text-sm ml-3 text-gray-400">{data?.userCount || 0} users</p>
        </div> 
            <UserTable/>    
        </BaseCard>
        </>
    )
}