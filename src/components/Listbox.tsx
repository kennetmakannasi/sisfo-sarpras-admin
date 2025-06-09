import { Listbox, ListboxButton, ListboxOptions } from '@headlessui/react'
import { useState } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js';

export default function Listboxcomp(props){
    const [isopen, setIsOpen] = useState(false);

    function triggerOpen(){
        setIsOpen(!isopen);
    }

    return(
        <Listbox className="col-span-2" value={props.value} onChange={props.onChange}>
            <div className="relative w-full">
                <ListboxButton onClick={triggerOpen} className="w-full flex items-center relative h-full p-2 border-2 border-gray-200 hover:bg-gray-100 transition-all shadow-md rounded-lg">
                    {props.buttonText.length <= 20 ? props.buttonText : props.buttonText.substring(0,17) + '...'}
                    {isopen ===  false ? 
                    (<Icon className='absolute right-1' icon="tabler:chevron-down"/>):
                    (<Icon className='absolute right-1' icon="tabler:chevron-up"/>)}
                </ListboxButton>
                <ListboxOptions onClick={triggerOpen} transition className="absolute mt-1 w-full bg-white shadow-lg overflow-y-auto rounded-md py-1 z-10 origin-top transition duration-200 ease-out data-closed:scale-95 data-closed:opacity-0">
                    {props.content}
                </ListboxOptions>
            </div>
        </Listbox>
    )
}