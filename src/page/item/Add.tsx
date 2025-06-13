import ModalLayout from "../../components/layouts/modal";
import axios from "axios";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router";
import { useFetchData } from "../../custom-hooks/fetch";
import { Icon } from "@iconify/react";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { useState } from "react";
import toast,{ Toaster } from "react-hot-toast";

interface CategoryData {
  id: number;
  slug: any;
  name: string;
}

interface ItemFormData {
  name: string;
  stock: number;
  image: FileList; 
}

export default function AddItem({trigger}:any){

    var token = localStorage.getItem("auth_token"); 
    let navigate = useNavigate();
    const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<ItemFormData>();

    const [selectedCategory, setSelectedCategory] = useState();
    const [isopen, setIsOpen] = useState(false);
    const {data} = useFetchData("/admin/categories");

    async function onSubmit(data:ItemFormData) {
    try{
      const res = await axios.post('http://127.0.0.1:8000/api/admin/items',{
        name: data.name,
        image: data.image[0],
        stock: data.stock,
        category_slugs: selectedCategory
      },{
        headers:{
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
      },
    );
    
    toast.success('Item Created!')
    trigger();
    setTimeout(() => {
      navigate(0)  
    }, 500);

    }catch(error:any){
      console.error(error)
      if (error.response) {
        const status = error.response.status;

        if (status === 403) {
          toast.error("Item already existed");
        }
      } else {
        toast.error("Network error or unknown error");
      }
    }
	};

  function triggerOpen(){
    setIsOpen(!isopen);
  }

    return(
        <ModalLayout>
          <Toaster/>
            <form className="relative" onSubmit={handleSubmit(onSubmit)}>
                <h1 className="text-3xl font-semibold"> Add Item</h1>
                <p>Add new Item</p>
                <button type="button" onClick={trigger} className="size-10 flex items-center justify-center absolute top-0 right-0 rounded-full hover:bg-gray-100 duration-150 transition-all">
                  <Icon height={25} width={25} icon="proicons:cancel"/>
                </button>
                <div className="mt-10">
                    <div className="w-full mt-5 relative">
                        <label htmlFor="name" className="font-semibold">Name</label>
                        <input className="bg-ultralight-blue focus:outline-blue-400 w-full h-10 rounded-lg px-3" id="name" placeholder="Name" type="text" {...register('name', { required: true })}/>
                        {errors.name && <div className="absolute">Name is required</div>}
                    </div>
                    <div className="w-full mt-7 relative">
                        <label htmlFor="image" className="font-semibold">Image</label>
                        <input className="bg-ultralight-blue focus:outline-blue-400 w-full h-10 rounded-lg px-3 text-gray-400 py-1.5" id="image" placeholder="Image" type="file" {...register('image', { required: true })}/>
                        {errors.image && <div className="absolute">Image is required</div>}
                    </div> 
                    <div className="w-full mt-7 relative">
                        <label htmlFor="stock" className="font-semibold">Stock</label>
                        <input className="bg-ultralight-blue focus:outline-blue-400 w-full h-10 rounded-lg px-3" id="stock" placeholder="Stock" type="number" {...register('stock', { required: true })}/>
                        {errors.stock && <div className="absolute">Stock is required</div>}
                    </div> 
                    <div className="w-full mt-7 relative">
                        <label htmlFor="category" className="font-semibold">Category</label>
                        <Listbox value={selectedCategory} onChange={setSelectedCategory}>
                          <div className="relative mt-1">
                            <ListboxButton onClick={triggerOpen} className="bg-ultralight-blue relative flex items-center w-full h-10 rounded-lg px-3 text-left">
                              {selectedCategory || 'no selected'}
                              {isopen ===  false ? 
                              (<Icon className='absolute top-3 right-3' icon="tabler:chevron-down"/>):
                              (<Icon className='absolute top-3 right-3' icon="tabler:chevron-up"/>)}
                            </ListboxButton>
                            <ListboxOptions transition className="absolute mt-1 w-full bg-white shadow-lg max-h-40 overflow-y-auto rounded-md py-1 z-10 origin-top transition duration-200 ease-out data-closed:scale-95 data-closed:opacity-0">
                              {data.map((item:CategoryData) => (
                                <ListboxOption className="hover:bg-gray-100 duration-150 transition-all px-3 py-1" key={item.slug} value={item.slug}>
                                  {item.name}
                                </ListboxOption>
                              ))}
                            </ListboxOptions>
                          </div>
                        </Listbox>
                    </div> 
                    <div className="w-full mt-10">
                        <button className="w-full h-10 text-center bg-blue-400 hover:bg-blue-500 text-white rounded-lg duration-150">Add</button>
                    </div> 
                </div>    
            </form>
        </ModalLayout>
    )
}