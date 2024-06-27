import React from 'react'
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter, Search } from '@syncfusion/ej2-react-grids';
import { Header } from '../components';
import { useStateContext } from '../contexts/ContextProvider';
import { ActiveOrdersGrid } from '../data/grids';
import axios from 'axios';
import toast, {Toaster} from 'react-hot-toast';
import { LuRefreshCw } from 'react-icons/lu';



const ActiveJobs = () => {
  const myDepartment = 'cutting';
    // const {erpData} = useStateContext();
    const toolbarOptions = ["Search"];
    // const editing = { allowDeleting: true, allowEditing: true };
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

    const handleButtonClick = async (record) => {
      try {
          const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/cutting/update-active`,{ id: record._id, department:myDepartment }, {
            headers: {
              'Authorization':localStorage.getItem('token'),
              'Content-Type': 'application/json',
            }
          });
          // if (!response.ok) {
          //   throw new Error('Failed to update status');
          // }
          toast.success(response.data.message);
          // Refresh the grid data or update the record locally
          // record.status = 'Active'; // Update the status locally if needed
      } catch (error) {
        toast.error(error.response.data.message)
          
      }
  };


    const actionTemplate = (props) => {
      return (
        <button
          className="e-button"
          onClick={() => {
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
        <Header title="Active Orders "/>
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
        // editSettings={editing}
        toolbar={toolbarOptions}
      >
        <ColumnsDirective>
          {ActiveOrdersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
          <ColumnDirective
            headerText="Actions"
            template={actionTemplate}
            width="100"
            textAlign="Center"
          />
        </ColumnsDirective>
        <Inject services={[Search, Page, Sort]} />
      </GridComponent>
    </div>
  )
}

export default ActiveJobs