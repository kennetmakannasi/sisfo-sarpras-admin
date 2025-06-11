import ReactApexChart from "react-apexcharts"
import { useFetchData } from "../../../custom-hooks/fetch"
import { Icon } from "@iconify/react/dist/iconify.js"

export default function BarChartReturn(){

  const{data} = useFetchData("/admin/dashboard/returning")

  const returnDataCount = data.returningStats


  if(data.length === 0){
    return(
        <div className='size-full py-20 flex justify-center items-center'>
            <Icon className='animate-spin' height={50} icon='eos-icons:loading'/>  
        </div>
    )
  }

  const series=  [{
    data: [
      returnDataCount.total,
      returnDataCount.pending,
      returnDataCount.approved,
    ]
  }]  

  const options =  {
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
    yaxis: [{
      y: 'July',
      y2: 'September',
      y3: 'September',
    }]
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
      categories: ['Total', 'Pending' ,'Approved'],
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
    }
  }

    return(
        <ReactApexChart options={options} series={series} type="bar" height={'110%'}/>
    )
}