import React, { useEffect } from 'react'
import axios from 'axios'
import {
  GridComponent,
  Inject,
  ColumnsDirective,
  ColumnDirective,
  Search,
  Page,
  Sort
} from "@syncfusion/ej2-react-grids";
import { LuRefreshCw } from "react-icons/lu";
import { useStateContext } from '../contexts/ContextProvider';
import { Header } from "../components";
import { erpGrid2 } from '../data/grids';
import ErpForm from '../components/ErpForm';
import toast, {Toaster} from 'react-hot-toast';

const ErpOrdersDetails = () => {
    const {erpData, setErpData, department, setActiveOrders} = useStateContext();
    const retrieveOrders = async () => {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/erp/get`,{
          headers: {
          'Authorization': `${localStorage.getItem("token")}`
        }}
      )
      if(response.data.message){
        toast.error(response.data.message)
      }
      setErpData(response.data.orders);
      setActiveOrders(response.data.active);
    }
    // const isDepartment = myDepartment.includes(department);
    useEffect(() => {
      retrieveOrders();
    },[]);
    
  
    const toolbarOptions = ["Search"];
  
    const editing = { allowDeleting: true, allowEditing: true };
  
    return (<div className="">
      <Toaster></Toaster>
      {/* {isDepartment && <ErpForm />} */}
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        
        <Header category="Erp Department" title="All Orders" />
        <div className="flex mb-2"><button className="flex items-center justify-center bg-gray-200 p-2 rounded-lg hover:bg-gray-300" onClick={()=>{
          try{
            retrieveOrders();
          }catch(e){toast.error('error')}
        }}>Refresh <LuRefreshCw/></button></div>
        
        <GridComponent
          dataSource={erpData}
          width="auto"
          allowPaging
          allowSorting
          pageSettings={{ pageCount: 5 }}
          editSettings={editing}
          toolbar={toolbarOptions}
        >
          <ColumnsDirective>
            {erpGrid2.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject services={[Search, Page, Sort]} />
        </GridComponent>
      </div>
      </div>
    );
}

export default ErpOrdersDetails