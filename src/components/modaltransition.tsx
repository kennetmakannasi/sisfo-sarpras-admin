import { Dialog , DialogPanel } from "@headlessui/react";

export default function ModalTransition(props:any){
    return(
    <Dialog className="fixed inset-0 z-50 flex size-full justify-center items-center bg-black/50" open={props.open} onClose={props.onclose}>
        <DialogPanel
        transition 
        className="duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 flex size-full items-center "
        >
          {props.content}
        </DialogPanel>
    </Dialog>
    )
}