import React from "react";

export default function DashboardContainer({ children }: { children: React.ReactNode }){
    return(
        <div className="size-full bg-white  rounded-lg shadow-md p-6">
            {children}
        </div>        
    )
}