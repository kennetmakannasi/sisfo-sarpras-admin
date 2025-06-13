import ModalLayout from "../../components/layouts/modal";
import axios from "axios";
import { useForm } from "react-hook-form"
import { useNavigate} from "react-router";
import { Icon } from "@iconify/react";
import { useFetchData } from "../../custom-hooks/fetch";
import toast, {Toaster} from "react-hot-toast";

interface CategoryFormData {
  name: string;
}

export default function EditCategory({id , trigger}:any){
    const token = localStorage.getItem("auth_token"); 
    const navigate = useNavigate();
    const {
		register,
		handleSubmit,
    setValue,
		formState: { errors }
	} = useForm<CategoryFormData>();

    const res = useFetchData(`/admin/categories/${id}`)               
    setValue("name", res?.data?.name || 'Loading Data...');
  
    async function onSubmit(data:CategoryFormData) {

    try{
      const res = await axios.put(`http://127.0.0.1:8000/api/admin/categories/${id}`,{
        name: data.name,
      },{
        headers:{
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
      },
    );
        
    toast.success('Category Edited!')
    trigger();
    setTimeout(() => {
      navigate(0)  
    }, 500);

    }catch(error:any){
      console.error(error)
      if (error.response) {
        const status = error.response.status;

        if (status === 403) {
          toast.error("Category already existed");
        }
      } else {
        toast.error("Network error or unknown error");
      }
    }
	};

    return(
        <ModalLayout>
          <Toaster/>
            <form className="relative" onSubmit={handleSubmit(onSubmit)}>
                <h1 className="text-3xl font-semibold"> Edit Category</h1>
                <p>Edit categories</p>
                  <button type="button" onClick={trigger} className="size-10 flex items-center justify-center absolute top-0 right-0 rounded-full hover:bg-gray-100 duration-150 transition-all">
                    <Icon height={25} width={25} icon="proicons:cancel"/>
                  </button>
                <div className="mt-10">
                    <div className="w-full mt-5">
                        <label htmlFor="name" className="font-semibold">Name</label>
                        <input className="bg-ultralight-blue focus:outline-blue-400 w-full h-10 rounded-lg px-3" id="name" placeholder="Name" type="text" {...register('name', { minLength: 3 })}/>
                        {errors.name && <div>Category Name must be at least 3 characters long</div>}
                    </div>
                    <div className="w-full mt-10">
                        <button type="submit" className="w-full h-10 text-center bg-blue-400 hover:bg-blue-500 text-white rounded-lg duration-150">Edit</button>
                    </div> 
                </div>
            </form>
        </ModalLayout>
    )
}