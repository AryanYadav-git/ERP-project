import React from "react";
import {
  GridComponent,
  Inject,
  ColumnsDirective,
  ColumnDirective,
  Search,
  Page,
} from "@syncfusion/ej2-react-grids";
import { useStateContext } from "../contexts/ContextProvider";
import { employeesData, employeesGrid } from "../data/dummy";
import { Header } from "../components";
import CuttingForm from "../components/CuttingReceivedForm";
import { useNavigate } from "react-router-dom";

const CuttingDepartment = () => {
  const navigate = useNavigate();
  const toolbarOptions = ["Search"];
  const myDepartment = 'cutting';
  const { department } = useStateContext();
  const isDepartment = department == myDepartment;
  const editing = { allowDeleting: true, allowEditing: true };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl ">
      <Header category="" title="Cutting Department "/>
      <div className="grid grid-cols-12 gap-4">
      <div className="col-span-4 h-40 bg-gray-200 rounded-lg hover:bg-gray-300 grid place-items-center text-2xl font-bold cursor-pointer" onClick={() => {
        navigate('/cutting-department/active-jobs');
      }}>Active Jobs</div>
      {/* <div className="col-span-4 h-40 bg-gray-200 rounded-lg hover:bg-gray-300 grid place-items-center text-2xl font-bold cursor-pointer" onClick={() => {
        navigate("/cutting-department/recieved");
      }}>Daily Recieved</div> */}
      <div className="col-span-4 h-40 bg-gray-200 rounded-lg hover:bg-gray-300 grid place-items-center text-2xl font-bold cursor-pointer" onClick={() => {
        navigate("/cutting-department/reports");
      }}>Daily Cutting Report</div>
      </div>
    </div>
  );
};
export default CuttingDepartment;
