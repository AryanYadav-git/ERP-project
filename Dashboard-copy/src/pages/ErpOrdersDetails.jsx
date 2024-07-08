import React, { useEffect, useState } from 'react'
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
import { Header, SizeDescription } from "../components";
import { erpGrid2 } from '../data/grids';
import ErpForm from '../components/ErpForm';
import toast, {Toaster} from 'react-hot-toast';
import { Navigate } from 'react-router-dom';

const ErpOrdersDetails = () => {
    const myDepartment = ['erp', 'admin'];
    const {erpData, setErpData, department, setActiveOrders} = useStateContext();
    const isDepartment = myDepartment.includes(department);
    const [showDetails, setShowDetails] = useState(null);
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

    const detailsTemplate = (props) => {
      return (
        <button
          className="e-button border-1 border-black p-1 rounded-md"
          onClick={() => {
            setShowDetails(props);
            console.log(props)
          }}
        >
          Show Details
        </button>
      )
    }

    const actionTemplate = (props) => {
      return (
        <button
          className="e-button border-1 border-black p-1 rounded-md"
          onClick={() => {
            console.log(props);
            // handleButtonClick(props)
            
          }}
          // disabled={props.status === 'Active'}
        >
          Edit
        </button>
      );
    };
  
    return (<div className="">
      <Toaster></Toaster>
      {/* {isDepartment && <ErpForm />} */}
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        
        <Header category="Erp Department" title="ALL ORDERS" />
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
            <ColumnDirective
            headerText="Details"
            template={detailsTemplate}
            width="150"
            textAlign="Center"
          />
            {/* {isDepartment && <ColumnDirective
            headerText="Actions"
            template={actionTemplate}
            width="100"
            textAlign="Center"
          />} */}
          </ColumnsDirective>
          <Inject services={[Search, Page, Sort]} />
        </GridComponent>
        {showDetails && <SizeDescription orderDetails={showDetails}/>}
      </div>
      
      </div>
    );
}

export default ErpOrdersDetails