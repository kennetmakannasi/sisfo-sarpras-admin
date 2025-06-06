import React from "react";

export default function FormLayout({ children }: { children: React.ReactNode }){
    
    return(
        <div className="flex justify-center text-gray-700">
            <div className="bg-white w-[350px] sm:w-[500px] rounded-xl shadow-md p-10">
                {children}    
            </div>
        </div>    
    )
}