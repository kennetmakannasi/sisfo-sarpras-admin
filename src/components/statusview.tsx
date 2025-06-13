const BorrowStatusView = (props:any) => {
    return(
        <div className={`w-28 rounded-lg flex items-center py-0.5 text-center ${
           props.status === 'pending'? 'text-yellow-500 bg-yellow-100 ':
           props.status === 'approved'? 'text-green-500 bg-green-100': 
           props.status === 'rejected'? 'text-red-500 bg-red-100': 
           props.status === 'returned' ? 'text-blue-600 bg-blue-100': 'text-black'
            }`}>
              <div className={`size-2 ml-3 mr-2 rounded-full
                ${
                  props.status === 'pending'? 'bg-yellow-500 animate-pulse':
                  props.status === 'approved'? 'bg-green-500': 
                  props.status === 'rejected'? 'bg-red-500': 
                  props.status === 'returned' ? 'bg-blue-600': 'text-black'
            }`}></div>
            {
              props.status === 'pending'? 'Pending':
              props.status === 'approved'? 'Approved': 
              props.status === 'rejected'? 'Rejected': 
              props.status === 'returned' ? 'Returned': '...'
            }
        </div>
    )
}

const ReturnStatusView = (props:any) => {
  return (
    <div className={`w-28 rounded-lg flex items-center py-0.5 text-center ${
        props.status === null ? 'text-yellow-500 bg-yellow-100 ':
        'text-green-500 bg-green-100'}`}>
          <div className={`size-2 ml-3 mr-2 rounded-full
            ${
              props.status === null? 'bg-yellow-500 animate-pulse':'bg-green-500'
            }`}></div>
        {props.status  === null ? 'Pending' : 'Approved'}
    </div>
  );
};

export {BorrowStatusView, ReturnStatusView };