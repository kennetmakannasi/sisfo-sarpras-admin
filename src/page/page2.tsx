import axios from "axios";
import { useState, useEffect } from "react";


interface User {
    id: number;
    name: string;
}

export default function TestPage2(){
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [data, setData] = useState<User[]>([]);

    const dummyuser = [
        {
            "id":1,
            "name": "aaaa"
        },
        {
            "id":2,
            "name": "monokotil"
        },
    ]

    const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
     };
     const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    };

     useEffect(()=>{
        fetchdata();
     },[])

     async function fetchdata() {
        try{
            const res = await axios.get<User[]>("https://jsonplaceholder.typicode.com/users");
            setData(res.data)
            if(!res){
                setData(dummyuser)
            }    
        }catch(error){
            console.error(error);
        }
     }
    
    return(
        <>
        <div className={`absolute top-0 h-screen w-20 bg-red-400 ${ isSidebarOpen? '-translate-x-full': 'translate-x-0'} transition-all duration-300`}>
        <button onClick={toggleSidebar}>
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik00IDE4cS0uNDI1IDAtLjcxMi0uMjg4VDMgMTd0LjI4OC0uNzEyVDQgMTZoMTZxLjQyNSAwIC43MTMuMjg4VDIxIDE3dC0uMjg4LjcxM1QyMCAxOHptMC01cS0uNDI1IDAtLjcxMi0uMjg4VDMgMTJ0LjI4OC0uNzEyVDQgMTFoMTZxLjQyNSAwIC43MTMuMjg4VDIxIDEydC0uMjg4LjcxM1QyMCAxM3ptMC01cS0uNDI1IDAtLjcxMi0uMjg4VDMgN3QuMjg4LS43MTJUNCA2aDE2cS40MjUgMCAuNzEzLjI4OFQyMSA3dC0uMjg4LjcxM1QyMCA4eiIvPjwvc3ZnPg==" alt="" />
        </button>
        <a href="">aaa</a>
        <button onClick={toggleDropdown}>dropdown</button>
        {isDropdownOpen&&(
            <div className="w-full bg-lime-400">
                <button className="bg-red-700 p-1">a</button><br />
                <button className="bg-red-700 p-1">b</button><br />
                <button className="bg-red-700 p-1">c</button>
            </div>    
        )}
        
        </div>
        <button onClick={toggleSidebar}>
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik00IDE4cS0uNDI1IDAtLjcxMi0uMjg4VDMgMTd0LjI4OC0uNzEyVDQgMTZoMTZxLjQyNSAwIC43MTMuMjg4VDIxIDE3dC0uMjg4LjcxM1QyMCAxOHptMC01cS0uNDI1IDAtLjcxMi0uMjg4VDMgMTJ0LjI4OC0uNzEyVDQgMTFoMTZxLjQyNSAwIC43MTMuMjg4VDIxIDEydC0uMjg4LjcxM1QyMCAxM3ptMC01cS0uNDI1IDAtLjcxMi0uMjg4VDMgN3QuMjg4LS43MTJUNCA2aDE2cS40MjUgMCAuNzEzLjI4OFQyMSA3dC0uMjg4LjcxM1QyMCA4eiIvPjwvc3ZnPg==" alt="" />
        </button>
        

        <div>
            {data.map((dat)=>(
                <div key={dat.id}>{dat.id}. {dat.name}</div>
            ))}
        </div>
        </>
    )
}