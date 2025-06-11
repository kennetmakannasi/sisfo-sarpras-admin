import ReactApexChart from "react-apexcharts"
import { useFetchData } from "../../../custom-hooks/fetch"
import { Icon } from "@iconify/react/dist/iconify.js";

export default function DonutChart(){

    const {data}= useFetchData('/admin/dashboard/categoryItemCount');

    const categoryName = data.map(item => item.name);
    const categoryCount = data.map(item => item.items_count);

    if(data.length === 0 ){
        return(
          <div className='size-full py-20 flex justify-center items-center'>
            <Icon className='animate-spin' height={50} icon='eos-icons:loading'/>  
          </div>
        )
    }

    const series=  categoryCount
    const labels = categoryName

    const options=  {
      labels: labels,
      dataLabels: {
        enabled: false
      },
      chart: {
        type: 'donut',
        fontFamily: 'Inter'
      },
       colors: ['#3b82f6', '#1e3a8a', '#93c5fd','#2563eb','#1d4ed8','#1e40af','#60a5fa'],
      responsive: [{
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    }

    return(
        <ReactApexChart options={options} series={series} type="donut"/>
    )
}