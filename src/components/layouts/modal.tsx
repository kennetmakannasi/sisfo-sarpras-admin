import React from "react";
import FormLayout from "./formlayout";

export default function ModalLayout({ children }: { children: React.ReactNode }){
    return(
        <div className="flex size-full justify-center items-center">
            <FormLayout>
                {children}
            </FormLayout>
        </div>
    )
}
