import React, { useEffect } from 'react'
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter, Search } from '@syncfusion/ej2-react-grids';
import { Header } from '../components';
import { useStateContext } from '../contexts/ContextProvider';
import { sumupReportGrid } from '../data/grids';
import axios from 'axios';
import toast, {Toaster} from 'react-hot-toast';
import { LuRefreshCw } from 'react-icons/lu';


const SumUpReport = () => {
    const myDepartment = 'cutting';
    // const {erpData} = useStateContext();
    const toolbarOptions = ["Search"];
    // const editing = { allowDeleting: true, allowEditing: true };
    const {erpData, setErpData, department, setActiveOrders, sumupReportData, setSumUpReportData} = useStateContext();
    const retrieveOrders = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/report`,{
        headers: {
        'Authorization': `${localStorage.getItem("token")}`
      }}
    )
    if(response.data.message){
      toast.error(response.data.message)
    }
    console.log(response.data);
    setSumUpReportData(response.data);
    // setActiveOrders(response.data.active);
  }

  useEffect(()=> {
    retrieveOrders();
  },[])

    const handleButtonClick = async (record) => {
      try {
        console.log(record);
          const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/cutting/update-active`, { id: record._id, department:myDepartment }, {
            headers: {
              'Authorization':localStorage.getItem('token'),
              'Content-Type': 'application/json',
            }
          });
          // if (!response.ok) {
          //   throw new Error('Failed to update status');
          // }
          console.log('Status update successful');
          console.log(response);
          toast.success(response.data.message);
          // Refresh the grid data or update the record locally
          // record.status = 'Active'; // Update the status locally if needed
      } catch (error) {
        console.log('Error updating status:', error);
        toast.error(error.response.data.message)
          
      }
  };


    const actionTemplate = (props) => {
      return (
        <button
          className="e-button"
          onClick={() => {
            console.log(props);
            handleButtonClick(props)}}
          // disabled={props.status === 'Active'}
        >
          Activate
        </button>
      );
    };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Toaster></Toaster>
        <Header title="Sum Up Report"/>
        <div className="flex mb-2"><button className="flex items-center justify-center bg-gray-200 p-2 rounded-lg hover:bg-gray-300" onClick={()=>{
        try{
          console.log('in onclick')
          retrieveOrders();
        }catch(e){toast.error('error')}
      }}>Refresh <LuRefreshCw/></button></div>
        <GridComponent
        dataSource={sumupReportData}
        width="auto"
        allowPaging
        allowSorting
        pageSettings={{ pageCount: 5 }}
        // editSettings={editing}
        toolbar={toolbarOptions}
      >
        <ColumnsDirective>
          {sumupReportGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Search, Page, Sort]} />
      </GridComponent>
    </div>
  )
}

export default SumUpReport