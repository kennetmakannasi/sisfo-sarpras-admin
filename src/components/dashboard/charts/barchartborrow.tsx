import ReactApexChart from "react-apexcharts"
import { useFetchData } from "../../../custom-hooks/fetch"
import { Icon } from "@iconify/react/dist/iconify.js"
import { ApexOptions } from "apexcharts";

export default function BarChartBorrow(){

  const{data} = useFetchData("/admin/dashboard/borrowing")

  const borrowDataCount = data.borrowingStats


  if(data.length === 0){
    return(
      <div className='size-full py-20 flex justify-center items-center'>
        <Icon className='animate-spin' height={50} icon='eos-icons:loading'/>  
      </div>
    )
  }

  const series=  [{
    data: [
      borrowDataCount.total,
      borrowDataCount.pending,
      borrowDataCount.approved,
      borrowDataCount.rejected,
      borrowDataCount.returned
    ]
  }]  

  const options:ApexOptions =  {
    chart: {
      type: 'bar',
      fontFamily: 'Inter',
      toolbar: {
        show: false 
      },
    },
    colors: ['#60a5fa'],

    annotations: {
    xaxis: [{
      x: 500,
      borderColor: '#00E396',
      label: {
        borderColor: '#00E396',
        style: {
          color: '#fff',
          background: '#00E396',
        },
      }
    }],
    },
    plotOptions: {
      bar: {
        horizontal: true,
      }
    },
    dataLabels: {
      enabled: true
    },
    xaxis: {
      categories: ['Total', 'Pending', 'Approved', 'Rejected', 'Returned'],
    },
    grid: {
      xaxis: {
        lines: {
          show: true
        }
      }
    },
    yaxis: {
      reversed: true,
      axisTicks: {
        show: true
      }
    },
    tooltip: {
      enabled: false
    }
  }

    return(
        <ReactApexChart options={options} series={series} type="bar" height={'110%'}/>
    )
}