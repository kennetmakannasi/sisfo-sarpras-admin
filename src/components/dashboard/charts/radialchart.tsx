import ReactApexChart from "react-apexcharts"
import { useFetchData } from "../../../custom-hooks/fetch";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function RadialChart(){

    const {data} = useFetchData("/admin/dashboard/overdue");

    const returnData = data.dueStats;

    if(data.length === 0 ){
            return(
              <div className='size-full flex justify-center items-center'>
                <Icon className='animate-spin' height={50} icon='eos-icons:loading'/>  
              </div>
            )
        }

    const series= [
        returnData.total,
        returnData.overdueCount
    ];
            const options= {
             chart: {
                height: 390,
                type: 'radialBar',
              },
              plotOptions: {
                radialBar: {
                  offsetY: 0,
                  startAngle: 0,
                  endAngle: 270,
                  hollow: {
                    margin: 5,
                    size: '30%',
                    background: 'transparent',
                    image: undefined,
                  },
                  dataLabels: {
                    name: {
                      show: false,
                    },
                    value: {
                      show: false,
                    }
                  },
                  barLabels: {
                    enabled: true,
                    useSeriesColors: true,
                    offsetX: -8,
                    fontSize: '16px',
                    formatter: function(seriesName) {
                      return seriesName
                    },
                  },
                }
              },
              colors: ['#1ab7ea', '#0084ff'],
              labels: ['Ongoing ', 'Overdue'],
              responsive: [{
                breakpoint: 480,
                options: {
                  legend: {
                      show: false
                  }
                }
              }]
            };
          
          
            

    return(
        <ReactApexChart options={options} series={series} type="radialBar" height={350}/>
    )
}