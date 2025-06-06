import ModalLayout from "./layouts/modal"
import { Icon } from "@iconify/react/dist/iconify.js"

export default function DeleteDialog(props){
    return(
        <ModalLayout>
            <div className="flex items-center">
                <div className=" bg-red-500/10 animate-pulse rounded-lg flex size-10 items-center justify-center">
                    <Icon color="#ef4444" height={30} icon="mingcute:warning-line"/>
                </div>
                <h1 className="text-2xl font-semibold ml-3"> Are You Sure?</h1>    
            </div>
            <p className="mt-2">{props.text}</p>
            <div className="w-full mt-10 h-10 grid grid-cols-2 gap-2">
                <button onClick={props.cancel} type="button" className="size-full text-center border-gray-200 border-2 hover:bg-gray-100 text-gray-700 rounded-lg duration-150">Cancel</button>
                <button onClick={props.action} type="button" className="size-full text-center bg-blue-400 hover:bg-blue-500 text-white rounded-lg duration-150">{props.buttonText}</button>
            </div> 
            
        </ModalLayout>
    )
}