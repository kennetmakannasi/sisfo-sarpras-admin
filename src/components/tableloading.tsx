import { Icon } from "@iconify/react"
import { useState , useEffect } from "react"

export default function TableLoading(){
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
      const timer = setTimeout(() => {
        setLoading(false);
      }, 7000);

      return () => clearTimeout(timer);
    },[])
    return(
        <div className='w-full flex justify-center h-80 items-center'>
          <div className='flex'>
          {loading === false ? (
            <div>
              <div className=" w-full flex justify-center items-center text-gray-400">
                <Icon height={50} icon="cil:sad"/>
              </div>
                
              <p className="text-xl mt-3 text-gray-400">Sorry, We couldn't find any results.</p> 
            </div>
          
        ):(
          <Icon className='animate-spin' height={50} icon='eos-icons:loading'/>
        )}
          </div>
        </div>
    )
}