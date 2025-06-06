import { Icon } from "@iconify/react";
import { Menu, MenuButton, MenuItems, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import React from "react";

export default function Dropdown({ children }: { children: React.ReactNode }){
    return(
        <div className="">
            <Menu as="div" className="inline-block text-left">
                <div>
                    <MenuButton className="hover:bg-gray-100 transition-all duration-150 rounded-full p-1">
                        <Icon width={20} icon="mi:options-horizontal"/>
                    </MenuButton>
                </div>
                <Transition
                    as={Fragment} enter="transition ease-out duration-200" enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <MenuItems className="absolute -translate-x-20 z-10 w-28 origin-top-right rounded-lg bg-white shadow-md border-2 border-gray-200">
                        <div className="py-1">                       
                            {children}
                        </div>
                    </MenuItems>
                </Transition>
            </Menu>
        </div>       
    )
}