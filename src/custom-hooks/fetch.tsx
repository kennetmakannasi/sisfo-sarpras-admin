import { useState, useEffect } from "react"
import axios from "axios";

export const useFetchData = (url : string) => {
    const [data, setData] = useState<T|null>([]);
    const token = localStorage.getItem("auth_token");

    useEffect(()=>{
        const fetchData = async () =>{
            try{
                const res = await axios.get(`http://127.0.0.1:8000/api${url}` , {
                    headers: {
                    Authorization: `Bearer ${token}`,
                    },
                })
                setData(res.data.data)
            }catch(error){
                console.error(error)
            }
        };

        fetchData()
    },[url]);

    

    return{data}
}