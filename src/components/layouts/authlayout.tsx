import React from "react";

export default function AuthFormLayout({ children }: { children: React.ReactNode }){
    
    return(
        <div className="p-5 flex h-screen md:h-full items-center justify-center text-gray-700 md:col-span-3">
            <div className="bg-white size-full rounded-xl shadow-md flex justify-center items-center">
                <div className="w-[550px] p-10">
                    {children}     
                </div>   
            </div>
        </div>     
    )
}