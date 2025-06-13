import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useFetchData } from '../../custom-hooks/fetch';
import Dropdown from '../dropdown';
import PaginationButton from '../paginationbutton';
import { Icon } from '@iconify/react';
import TableLoading from '../tableloading';
import ReturnDetail from '../../page/return/detail';
import ModalTransition from '../modaltransition';
import Listboxcomp from '../Listbox';
import { ListboxOption } from '@headlessui/react';
import toast, { Toaster } from 'react-hot-toast';
import { ReturnStatusView } from '../statusview';
import ExportData from '../export';

interface ReturnData {
  id: number;
  borrow_id: number;
  returned_quantity: number;
  handled_by: string | null;
  borrowing: {
    item: {
      name: string;
    };
    user: {
      username: string;
    };
  };
}

export default function ReturnTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const token = localStorage.getItem("auth_token");
  const navigate = useNavigate(); 
  const [searchTerm, setSearchTerm] = useState(''); 
  const [sortDir, setSortDir] = useState('asc');  
  const [filterstatus, setFilterStatus] = useState('All'); 

  const [detailModal, setDetailModal] = useState(false);
  const [detailparam, setDetailParam] = useState(0);


  const{data} = useFetchData(`/admin/returns?sort=${sortDir}&status=${filterstatus.toLowerCase()}`)
  
  const approvedata = async(id: number)=>{
    try{
      const res = await axios.patch(`http://127.0.0.1:8000/api/admin/returns/${id}/approve`,{}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success('Return request approved!')
      setTimeout(() => {
        navigate(0);  
      }, 500);
    }catch(error){
      console.error(error)
    }
  }

  const toggleSortDir = () => {
    setSortDir(prev => (prev === 'asc' ? 'desc' : 'asc'));
  }

  const triggerDetailModal = (id:number) => {
    setDetailParam(id)
    setDetailModal(!detailModal)
  }
  const filteredItems = data.filter((item:ReturnData) =>
    item.borrowing.user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
   item.borrowing.item.name.toLowerCase().includes(searchTerm.toLowerCase())
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
      <ModalTransition open={detailModal} onclose={()=>setDetailModal(false)} 
            content={
      <ReturnDetail id={detailparam} trigger={triggerDetailModal}/>
      }/>
      <div className='grid grid-cols-10 gap-3 lg:h-10'>
        <div className='col-span-10 sm:col-span-5 lg:col-span-4 relative flex items-center'>
          <Icon color='#9ca3af' height={20} className='absolute ml-2' icon='ic:sharp-search'/>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by Borrowing Username or Item Name"
          className="bg-ultralight-blue h-10 w-full focus:outline-blue-400 rounded-lg px-10"
        />    
        </div>
         <div className='col-span-10 sm:col-span-5 lg:col-span-2  relative flex items-center'>
         <Listboxcomp value={filterstatus} onChange={setFilterStatus} 
            buttonText={filterstatus === '' ? 'Status: All' : 'Status: ' + filterstatus} 
            content={
            <>
              <ListboxOption className="hover:bg-gray-100 duration-150 transition-all px-3 py-1" value='All'>All</ListboxOption>
              <ListboxOption className="hover:bg-gray-100 duration-150 transition-all px-3 py-1" value='Pending'>Pending</ListboxOption>
              <ListboxOption className="hover:bg-gray-100 duration-150 transition-all px-3 py-1" value='Handled'>Handled</ListboxOption>
            </>
            }
          />
          </div>
        <button onClick={toggleSortDir} className='flex h-10 col-span-2 sm:col-span-1 w-10 justify-center items-center p-1 border-2 border-gray-200 hover:bg-gray-100 duration-150 transition-all shadow-md rounded-lg'>
          {sortDir === 'asc'? <Icon height={20} icon="mingcute:sort-ascending-line"/>:<Icon height={20} icon="mingcute:sort-descending-line"/>}
        </button>
        <div className='col-start-3 sm:col-start-10 xl:place-self-end'>
          <ExportData 
          endpoint={'returns'}
          fileName={'return_data'}
          />
        </div>
      </div>

      {currentItems.length === 0 ? (
        <TableLoading/>
      ) : (
        <div className='overflow-x-auto mt-5'>
          <table className='w-full rounded-xl'>
            <thead>
              <tr className='text-gray-400 shadow-md rounded-xl'>
                <td className='p-3 w-10 rounded-l-xl bg-ultralight-blue'>ID</td>
                <td className='p-3 bg-ultralight-blue'>Borrow Id</td>
                <td className='p-3 bg-ultralight-blue'>Item</td>
                <td className='p-3 bg-ultralight-blue'>User</td>
                <td className='p-3 bg-ultralight-blue'>Returned Quantity</td>
                <td className='p-3 bg-ultralight-blue'>Status</td>
                <td className='p-3 rounded-r-xl bg-ultralight-blue'></td>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item:ReturnData) => (
                <tr className='border-b-2 border-gray-200 font-normal' key={item.id}>
                  <td className='px-3 py-3'>{item.id}</td>
                  <td className='px-3 py-3'>{item.borrow_id}</td>
                  <td className='px-3 py-3'>{item.borrowing.item.name}</td>
                  <td className='px-3 py-3'>{item.borrowing.user.username}</td>
                  <td className='px-3 py-3'>{item.returned_quantity}</td>
                  <td className='px-3 py-3'>
                    <div className='flex items-center'>
                      <ReturnStatusView status={item.handled_by}/>
                    </div>
                  </td>
                  <td>
                    <Dropdown>
                      <button
                          onClick={() => triggerDetailModal(item.id)}
                          className='w-full text-left flex items-center p-2 text-sm hover:bg-gray-100 transition-all duration-150'
                        >
                          <Icon icon="bxs:detail"/>
                          <p className='ml-2'>Details</p>
                      </button>
                      {item.handled_by === null?(
                        <button
                          onClick={() => approvedata(item.id)}
                          className='w-full text-left flex items-center p-2 text-sm hover:bg-gray-100 transition-all duration-150'
                        >
                          <Icon icon="fluent:text-change-accept-20-regular"/>
                          <p className='ml-2'>Approve</p>
                        </button>

                      ):('')}
                     
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
