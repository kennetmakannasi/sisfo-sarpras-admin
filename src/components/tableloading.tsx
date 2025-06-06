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
        <div className='w-full flex justify-center h-80 items-center text-2xl'>
          <div className='flex'>
          {loading === false ? (
            <div>
              <div className=" w-full flex justify-center items-center">
                <Icon height={50} icon="iconoir:file-not-found"/>
              </div>
              
            <p>No Results</p> 
            </div>
          
        ):(
          <Icon className='animate-spin' height={50} icon='eos-icons:loading'/>
        )}
          </div>
        </div>
    )
}