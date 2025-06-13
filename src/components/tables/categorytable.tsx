import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import EditCategory from '../../page/category/Edit';
import { useFetchData } from '../../custom-hooks/fetch';
import PaginationButton from '../paginationbutton';
import Dropdown from '../dropdown';
import { Icon } from '@iconify/react';
import AddCategory from '../../page/category/Add';
import TableLoading from '../tableloading';
import ModalTransition from '../modaltransition';
import toast, { Toaster } from 'react-hot-toast';
import DeleteDialog from '../deletedialog';
import ExportData from '../export';

interface CategoryData {
  id: number;
  slug: any;
  name: string;
}

export default function CategoryTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage , setItemsPerPage] = useState(10);
  const token = localStorage.getItem("auth_token");
  const navigate = useNavigate();
  const [addmodal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [editParam, setEditParam] = useState(0);
  const [deleteParam, setDeleteParam] = useState(0);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [sortDir, setSortDir] = useState('asc');  

  const { data } = useFetchData(`/admin/categories?sort=${sortDir}`);

  const deleteData = async () => {
    try {
      const res = await axios.delete(`http://127.0.0.1:8000/api/admin/categories/${deleteParam}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDeleteDialog(false);

      toast.success('data deleted')
      setTimeout(() => {
        navigate(0);  
      }, 500);  
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const toggleSortDir = () => {
    setSortDir(prev => (prev === 'asc' ? 'desc' : 'asc'));
  }
  
  const filteredItems = data.filter((item:any) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
  setCurrentPage(1);
  }, [itemsPerPage]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className='mt-5'>
      <Toaster/>
      <ModalTransition open={addmodal} onclose={()=>setAddModal(false)} 
      content={
        <AddCategory trigger={()=> setAddModal(false)}/>
      }/>

      <ModalTransition open={editModal} onclose={()=>setEditModal(false)} 
      content={
        <EditCategory id={editParam} trigger={()=>setEditModal(false)} />
      }/>

      <ModalTransition open={deleteDialog} onclose={()=>setDeleteDialog(false)} 
        content={
        <DeleteDialog text="This action will remove the data permanently from our server"
        cancel={()=>setDeleteDialog(false)}
        action={deleteData}
        buttonText="Delete"/>
      }/>

      <div className='grid grid-cols-10 gap-3 lg:h-10'>
        <div className='col-span-10 sm:col-span-5 lg:col-span-4 relative flex items-center'>
          <Icon color='#9ca3af' height={20} className='absolute ml-2' icon='ic:sharp-search'/>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Category Name"
            className="bg-ultralight-blue h-10 w-full focus:outline-blue-400 rounded-lg px-10"
          />    
        </div>

        <button onClick={toggleSortDir} className='flex h-full col-span-2 sm:col-span-1 w-10 justify-center items-center p-1 border-2 border-gray-200 hover:bg-gray-100 duration-150 transition-all shadow-md rounded-lg'>
          {sortDir === 'asc'? <Icon height={20} icon="mingcute:sort-ascending-line"/>:<Icon height={20} icon="mingcute:sort-descending-line"/>}
        </button>
        <div className='col-start-8 lg:col-start-9 place-self-end'>
          <ExportData 
          endpoint={'categories'}
          fileName={'category_data'}
          />
        </div>
        <button onClick={()=> setAddModal(true)} className="size-full col-start-9 lg:col-start-10 col-span-2 lg:col-span-1 h-full flex justify-center items-center shadow-md bg-blue-400 hover:bg-blue-500 text-white rounded-lg duration-150">
          <Icon height={22} icon={'material-symbols:add-rounded'}/>  
          <p className='hidden sm:block'>Add</p>
        </button>    
      </div>

      {currentItems.length === 0 ? (
        <TableLoading/>
      ) : (
        <div className='overflow-x-auto mt-5'>
          <table className='w-full rounded-xl'>
            <thead>
              <tr className='text-gray-400 shadow-md rounded-xl'>
                <td className='p-3 w-10 rounded-l-xl bg-ultralight-blue'>ID</td>
                <td className='p-3 bg-ultralight-blue'>Slug</td>
                <td className='p-3 bg-ultralight-blue'>Name</td>
                <td className='p-3 rounded-r-xl bg-ultralight-blue'></td>
              </tr>
            </thead>
            <tbody>
            {currentItems.map((item:CategoryData) => (
                <tr className='border-b-2 border-gray-200 font-normal' key={item.id}>
                  <td className='px-3 py-3'>{item.id}</td>
                  <td className='px-3 py-3'>{item.slug}</td>
                  <td className='px-3 py-3'>{item.name}</td>
                  <td>
                    <Dropdown>
                      <button
                        onClick={() => {setEditParam(item.slug); setEditModal(true)}}
                        className='w-full text-left flex items-center p-2 text-sm hover:bg-gray-100 transition-all duration-150'
                      >
                        <Icon icon="material-symbols:edit-outline"/>
                        <p className='ml-2'>Edit</p>
                      </button>  
                      <button
                        onClick={() => {setDeleteParam(item.slug); setDeleteDialog(true)}}
                        className='w-full text-left flex items-center p-2 text-sm text-red-500 hover:bg-gray-100 transition-all duration-150'
                      >
                        <Icon icon="mdi:delete"/>
                        <p className='ml-2'>Delete</p>
                      </button>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>    
        </div>

      )}
      
      <PaginationButton 
        value={itemsPerPage}
        onChange={setItemsPerPage}
        currentPerPage={itemsPerPage}
        PrevClick={() => paginate(currentPage - 1)}
        PrevDisable={currentPage === 1}
        page={currentPage}
        NextClick={() => paginate(currentPage + 1)}
        NextDisable={currentPage * itemsPerPage >= data.length}
      />
    </div>
  );
}