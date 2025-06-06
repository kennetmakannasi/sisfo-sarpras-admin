import { Icon } from "@iconify/react/dist/iconify.js"
import DashboardContainer from "../../components/dashboardContainer"
import { useFetchData } from "../../custom-hooks/fetch"
import LineChart from "../../components/dashboard/charts/linechart"
import DonutChart from "../../components/dashboard/charts/donutchart"
import BarChartBorrow from "../../components/dashboard/charts/barchartborrow"
import BarChartReturn from "../../components/dashboard/charts/barchartreturn"
import RadialChart from "../../components/dashboard/charts/radialchart"
import Listboxcomp from "../../components/Listbox"
import RecentData from "../../components/dashboard/recentdata"
import { useState } from "react"
import { ListboxOption } from "@headlessui/react"
import HeaderCards from "../../components/dashboard/headercards"
import OverdueTable from "../../components/dashboard/overdue"

export default function Dashboard() {
    const[barView, setBarView] = useState('borrow')
    return (
        <div className="grid h-full grid-cols-4 gap-5 my-5">
            <HeaderCards/>
            <div className="col-span-4 lg:col-span-2 row-span-2">
                <DashboardContainer>
                    <p>Category Items Count</p>
                    <div className="sm:mt-10">
                        <DonutChart/>     
                    </div>
                      
                </DashboardContainer>
            </div>
            <div className=" col-span-4 lg:col-span-2">
                <DashboardContainer>
                    <p>Borrow Request in last 5 weeks</p>
                    <LineChart/>
                </DashboardContainer>    
            </div>
            <div className="col-span-4 sm:col-span-2 lg:col-span-1">
                <DashboardContainer>
                    <p>Status Count</p>
                    <div className="w-36 mt-2">
                    <Listboxcomp value={barView} onChange={setBarView}
                    buttonText={barView === 'borrow'? 'Borrowing ':'Returning '}
                    content={
                        <div className="h-full">
                            <ListboxOption className="hover:bg-gray-100 duration-150 transition-all px-3 py-1" value={'borrow'}>Borrow</ListboxOption>
                            <ListboxOption className="hover:bg-gray-100 duration-150 transition-all px-3 py-1" value={'return'}>Return</ListboxOption>
                        </div>
                    }/>    
                    </div>
                    
                    {barView === 'borrow' ? (<BarChartBorrow/>):(<BarChartReturn/>)}
                    
                </DashboardContainer>
            </div>
            <div className="col-span-4 sm:col-span-2 lg:col-span-1">
                <DashboardContainer>
                <p className="mb-2">Total Overdue Borrows</p>
                  <OverdueTable/>
                </DashboardContainer>    
            </div>
            <div className="col-span-4">
                <DashboardContainer>
                   <RecentData/>
                </DashboardContainer>
            </div>
        </div>  
    )
}