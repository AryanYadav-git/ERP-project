import React from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import { Header } from "../components";

const ProductionDepartment = () => {
  const navigate = useNavigate();
  const toolbarOptions = ["Search"];

  const editing = { allowDeleting: true, allowEditing: true };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl ">
      <Header category="" title="Production Department "/>
      <div className="grid grid-cols-12 gap-4">
      <div className="md:col-span-4 col-span-12 h-40 bg-gray-200 rounded-lg hover:bg-gray-300 grid place-items-center text-2xl font-bold cursor-pointer" onClick={() => {
        navigate("/production-department/recieved");
      }}>Daily Cutting Issue Report</div>
      <div className="md:col-span-4 col-span-12 h-40 bg-gray-200 rounded-lg hover:bg-gray-300 grid place-items-center text-2xl font-bold cursor-pointer" onClick={() => {
        navigate("/production-department/reports");
      }}>Daily Production Report</div>
      </div>
    </div>
  );
};
export default ProductionDepartment;
