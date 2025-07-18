import Chart from 'react-apexcharts';
import { useFetchData } from '../../../custom-hooks/fetch';
import { Icon } from '@iconify/react/dist/iconify.js';
import { ApexOptions } from 'apexcharts';

interface PerWeekData{
  week: string,
  total: number
}

export default function LineChart() {

    const {data} = useFetchData("/admin/dashboard/borrowingByTime?sort=last5weeks")

    if (!data || !data.per_week || data.per_week.length === 0) {
    return(
      <div className='size-full flex py-20 justify-center items-center'>
        <Icon className='animate-spin' height={50} icon='eos-icons:loading'/>  
      </div>
    )
  }

  const categories = data.per_week.map((item:PerWeekData) => item.week);
  const borrowdata = data.per_week.map((item:PerWeekData) => item.total);

  const options:ApexOptions = {
    chart: {
      type: 'area',
      fontFamily: 'Inter', 
      toolbar: {
        show: false 
      },
    },
    colors: ['#60a5fa'],
    dataLabels: {
      enabled: false,
      style: {
        colors: ['#3b82f6']
      }
    },
    stroke:{
      width: 2 
    },
    markers: {
      show: false
    },
    xaxis: {
      labels: {
        show: false
      },
      categories
    }
  };


  const series = [ {name: "Borrows",
      data: borrowdata}]

  return (
       <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={options}
            series={series}
            type="area"
            height="120"
          />
        </div>
      </div>
    </div>
  );
}
