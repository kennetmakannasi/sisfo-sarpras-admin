import { Icon } from "@iconify/react"
import { useState } from "react"
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'

export default function PaginationButton(props:any){
    const [isopen, setIsOpen] = useState(false);

    function triggerOpen(){
        setIsOpen(!isopen);
    }

    return(
        <div className="flex relative mt-5">
            <div className='grid gap-2 grid-cols-6 text-center font-semibold w-60'>
                <button
                    className='border-2 border-gray-200 flex justify-center items-center hover:bg-gray-100 duration-150 transition-all shadow-md rounded-lg py-1 disabled:text-gray-300'
                    onClick={props.PrevClick}
                    disabled={props.PrevDisable}
                >
                    <Icon icon="ooui:next-rtl"/>
                </button>
                <span className='border-2 border-gray-200 shadow-md rounded-lg py-1'>{props.page}</span>
                <button
                    className='border-2 border-gray-200 flex justify-center items-center hover:bg-gray-100 duration-150 transition-all shadow-md rounded-lg py-1 disabled:text-gray-300'
                    onClick={props.NextClick}
                    disabled={props.NextDisable}
                >
                    <Icon icon="ooui:next-ltr"/>
                </button>
            </div>
            <div className="absolute right-0 flex items-center">
                <p className="hidden sm:block">Items Per Page</p>
                <Listbox value={props.value} onChange={props.onChange}>
                    <div className="relative w-12 ml-2">
                        <ListboxButton onClick={triggerOpen} className="w-full flex font-semibold relative h-full p-1 border-2 border-gray-200 hover:bg-gray-100 transition-all shadow-md rounded-lg">
                            {props.currentPerPage}
                            {isopen ===  false ? 
                            (<Icon className='absolute right-0.5 mt-0.5' icon="tabler:chevron-up"/>):
                            (<Icon className='absolute right-0.5 mt-0.5' icon="tabler:chevron-down"/>)}
                        </ListboxButton>
                        <ListboxOptions onClick={triggerOpen} transition className="absolute text-center z-10 w-full bg-white bottom-8 border border-gray-200 rounded-md shadow-lg
                        origin-bottom transition duration-200 ease-out data-closed:scale-95 data-closed:opacity-0
                        ">
                            <ListboxOption className="hover:bg-gray-100 py-0.5" value={5}>5</ListboxOption>
                            <ListboxOption className="hover:bg-gray-100 py-0.5" value={10}>10</ListboxOption>
                            <ListboxOption className="hover:bg-gray-100 py-0.5" value={15}>15</ListboxOption>
                        </ListboxOptions>
                    </div>
                </Listbox>
            </div>    
        </div>
        
    )
}