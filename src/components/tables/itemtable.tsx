import { useEffect, useState } from 'react';
import axios from 'axios';
import EditItem from '../../page/item/Edit';
import { useNavigate } from 'react-router';
import { useFetchData } from '../../custom-hooks/fetch';
import AddItem from '../../page/item/Add';
import PaginationButton from '../paginationbutton';
import Dropdown from '../dropdown';
import { Icon } from '@iconify/react';
import TableLoading from '../tableloading';
import * as XLSX from 'xlsx';
import ModalTransition from '../modaltransition';
import Listboxcomp from '../Listbox';
import { ListboxOption } from '@headlessui/react'
import toast, { Toaster } from 'react-hot-toast';
import DeleteDialog from '../deletedialog';

interface DataItem {
  id: number;
  sku: string;
  name: string;
  image_url: string;
  stock: number;
}

export default function ItemTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const token = localStorage.getItem("auth_token"); 
  const navigate = useNavigate();
  const [addmodal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [editParam, setEditParam] = useState(0);
  const [deleteParam, setDeleteParam] = useState(0);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [sortDir, setSortDir] = useState('asc');  
  const [sortcategory, setSortCategory] = useState('');
  const{data} = useFetchData(`/admin/items?sort=${sortDir}&category=${sortcategory}`)
  const{data:categorydata} = useFetchData('/admin/categories');


  const deleteData = async()=> {
    try {
      const res = await axios.delete(`http://127.0.0.1:8000/api/admin/items/${deleteParam}`, {
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

  const filteredItems = data.filter((item) =>
    item.sku.toLowerCase().includes(searchTerm.toLowerCase())||
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportExcel = () => {
      const exceldata = data.map(item => ({
          'id': item.id,
          'sku': item.sku,
          'name': item.name,
          'image_url': item?.image_url || 'no image url',
          'stock': item.stock ,
          'categories': item?.categories[0]?.name || 'no category',
          'Dibuat Pada': item.created_at,
      }));
      const ws = XLSX.utils.json_to_sheet(exceldata);
  
      const wscols = [
          {wpx: 25},
          { wpx: 200 }, 
          { wpx: 200 }, 
          { wpx: 200 },
          { wpx: 35 }, 
          { wpx: 200 }, 
          { wpx: 200 },
      ];
      ws['!cols'] = wscols;
  
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Items Data');
  
      XLSX.writeFile(wb, 'data_item.xlsx');
      toast.success('Excel file has been exported successfully!')
  };

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
        <AddItem trigger={()=> setAddModal(false)}/>
      }/>

      <ModalTransition open={editModal} onclose={()=>setEditModal(false)} 
      content={
        <EditItem sku={editParam} trigger={()=> setEditModal(false)}/>
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
          onChange={(e) => {setSearchTerm(e.target.value)}}
          placeholder="Search by Item Name or SKU"
          className="bg-ultralight-blue h-10 w-full focus:outline-blue-400 rounded-lg px-10"
        />   
        </div>

        <div className='col-span-10 sm:col-span-5 lg:col-span-2  relative flex items-center'>
          <Listboxcomp value={sortcategory} onChange={setSortCategory} 
            buttonText={sortcategory === '' ? 'Category: All' : 'Category: ' + sortcategory} 
            content={
              <div className='h-52 overflow-y-auto'>
              <ListboxOption className="hover:bg-gray-100 duration-150 transition-all px-3 py-1" value=''>All</ListboxOption>
              {categorydata.map((category) => (
                <ListboxOption className="hover:bg-gray-100 duration-150 transition-all px-3 py-1" key={category.name} value={category.name}>
                  {category.name.length <= 15 ? category.name : category.name.substring(0,12  )+'...'}
                </ListboxOption>
              ))}
              </div>
            }
          />
        </div>

        <button onClick={toggleSortDir} className='flex h-10 col-span-2 sm:col-span-1 w-10 justify-center items-center p-1 border-2 border-gray-200 hover:bg-gray-100 duration-150 transition-all shadow-md rounded-lg'>
          {sortDir === 'asc'? <Icon height={20} icon="mingcute:sort-ascending-line"/>:<Icon height={20} icon="mingcute:sort-descending-line"/>}
        </button>
        <button onClick={handleExportExcel} className='flex h-full col-start-8 lg:col-start-9 justify-center place-self-end items-center w-10 p-1 border-2 border-gray-200 hover:bg-gray-100 duration-150 transition-all shadow-md rounded-lg'>
          <Icon height={24} icon={'material-symbols:download-rounded'}/>
        </button>
        <button onClick={()=> setAddModal(true)} className="size-full col-start-9 lg:col-start-10 col-span-2 lg:col-span-1 h-full flex justify-center items-center shadow-md bg-blue-400 hover:bg-blue-500 text-white rounded-lg duration-150">
          <Icon height={22} icon={'material-symbols:add-rounded'}/>  
          <p className='hidden sm:block'>Add</p>  
        </button>    
      </div>

      {currentItems.length === 0 ? 
          (<TableLoading  />)
           : (
            <div className='overflow-x-scroll xl:overflow-x-auto mt-5'>
              <table className='w-full rounded-xl'>
                <thead>
                  <tr className='text-gray-400 shadow-md rounded-xl'>
                    <td className='p-3 w-10 rounded-l-xl bg-ultralight-blue'>ID</td>
                    <td className='p-3 bg-ultralight-blue'>SKU</td>
                    <td className='p-3 bg-ultralight-blue'>Name</td>
                    <td className='p-3 bg-ultralight-blue'>Image</td>
                    <td className='p-3 bg-ultralight-blue'>Stock</td>
                    <td className='p-3 bg-ultralight-blue'>Category</td>
                    <td className='p-3 rounded-r-xl bg-ultralight-blue'></td>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item) => (
                    <tr className='border-b-2 border-gray-200 font-normal' key={item.id}>
                      <td className='px-3 py-3'>{item.id}</td>
                      <td className='px-3 py-3'>{item.sku.length <= 10 ? item.sku: item.sku.substring(0,7)+ '...'}</td>
                      <td className='px-3 py-3'>{item.name.length <= 15 ? item.name : item.name.substring(0,12)+ '...'}</td>
                      <td className='px-3 py-3'>
                        <img className='size-10 object-cover rounded-lg' src={item?.image_url || 'assets/placeholder.png'} alt="" />
                      </td>
                      <td className='px-3 py-3'>{item.stock}</td>
                      {/* <td className='px-3 py-3'>{item?.categories[0]?.name || 'No Category'}</td> */}
                      <td className='px-3 py-3 grid grid-cols-3  gap-1 w-60'>
                        {item?.categories?.map((catdata)=>(catdata)).length <=0 ? 
                          <p className='col-span-2 mt-2'>No Categories</p> : 
                          item.categories.map((catdata)=>(
                            <div className=' rounded-lg mt-1.5 w-full py-0.5 text-center bg-blue-300 text-blue-500'>
                              {catdata.name.length <=7? catdata.name : catdata.name.substring(0,4) + '...'}  
                            </div>
                          )).slice(0,3)
                        }
                      </td>
                      <td>
                        <Dropdown>
                          <button
                            onClick={() => {setEditParam(item.sku); setEditModal(true)}}
                            className='w-full text-left flex items-center p-2 text-sm hover:bg-gray-100 transition-all duration-150'
                          >
                            <Icon icon="material-symbols:edit-outline"/>
                            <p className='ml-2'>Edit</p>
                          </button>  
                          <button
                            onClick={() => {setDeleteParam(item.sku); setDeleteDialog(true)}}
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
        currentPerPage= {itemsPerPage}
        PrevClick={() => paginate(currentPage - 1)}
        PrevDisable={currentPage === 1}
        page={currentPage}
        NextClick={() => paginate(currentPage + 1)}
        NextDisable={currentPage * itemsPerPage >= data.length}
      />
    </div>
  );
}
