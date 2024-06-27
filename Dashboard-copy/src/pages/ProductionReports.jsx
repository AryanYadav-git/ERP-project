import React, {useEffect}from 'react'
import { Header } from '../components'
import ProductionReportsForm from '../components/ProductionReportsForm'
import { useStateContext } from '../contexts/ContextProvider'
import { LuRefreshCw } from 'react-icons/lu'
import toast, {Toaster} from 'react-hot-toast';
import { ReportsGrid } from '../data/grids'
import axios from 'axios'
import {
    GridComponent,
    Inject,
    ColumnsDirective,
    ColumnDirective,
    Search,
    Page,
    Sort,
    ExcelExport,
    Toolbar
  } from "@syncfusion/ej2-react-grids";

const ProductionReports = () => {
    const myDepartment = ['production', 'admin'];
    const {department, productionReportsData, setProductionReportsData} = useStateContext();
    const isDepartment = myDepartment.includes(department);
    let grid;
    // const toolbar = ['ExcelExport'];
    
    // const toolbarOptions = ['Delete','Edit','Filter',
    //   // 'ExcelExport','Active'
    // ];

    const toolbarOptions = ["Search"];
    const toolbarClick = (args) => {
        if (grid && args.item.id === 'Grid_excelexport') {
            grid.excelExport();
        }
    };
    const editing = { allowDeleting: true, allowEditing: true };

    

    const retrieveOrders = async () => {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/production/reports/get`,{
            headers: {
            'Authorization': `${localStorage.getItem("token")}`
          }}
        )
        if(response.data.message){
          toast.error(response.data.message)
        }
        console.log(response.data);
        setProductionReportsData(response.data);
    }
    

    useEffect(() => {
        retrieveOrders();
      },[]);

  return (
    <div>
      <Toaster />
      {isDepartment && <ProductionReportsForm />}
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="Production Department" title="Daily Production Reports" />
        <div className="flex mb-2">
          <button
            className="flex items-center justify-center bg-gray-200 p-2 rounded-lg hover:bg-gray-300"
            onClick={() => {
              try {
                console.log("in onclick");
                retrieveOrders();
              } catch (e) {
                toast.error("error");
              }
            }}
          >
            Refresh <LuRefreshCw />
          </button>
        </div>

        {productionReportsData.map((data) => (
          <div className="mb-4">
            <h3 className="text-gray-500">{data.date}</h3>
            <GridComponent
              dataSource={data.entries}
              width="auto"
              allowPaging
              allowSorting
              allowExcelExport
              pageSettings={{ pageCount: 5 }}
              editSettings={editing}
              toolbar={toolbarOptions}
              // toolbarClick={handleButtonClick} ref={g => grid = g}
            >
              <ColumnsDirective>
                {ReportsGrid.map((item, index) => (
                    <ColumnDirective key={index} {...item} />       
                ))}
              </ColumnsDirective>

              <Inject services={[Toolbar, Search, Page, Sort, ExcelExport]} />
            </GridComponent>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductionReports