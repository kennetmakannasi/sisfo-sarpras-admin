import React from "react";

export default function BaseCard({ children }: { children: React.ReactNode }){
    return(
        <div className="bg-white rounded-xl w-full h-full p-10 mb-10 shadow-md">
            {children}
        </div>        
    )
}