import React from 'react';
import { useNavigate } from "react-router-dom";
import { Header } from "../components";

const FinishingDepartment = () => {
  const navigate = useNavigate();

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl ">
      <Header category="" title="Finishing Department "/>
      <div className="grid grid-cols-12 gap-4">
      <div className="md:col-span-4 col-span-12 h-40 bg-gray-200 rounded-lg hover:bg-gray-300 grid place-items-center p-8 text-2xl font-bold cursor-pointer" onClick={() => {
        navigate("/finishing-department/received");
      }}>Daily Issue to Finishing </div>
      <div className="md:col-span-4 col-span-12 h-40 bg-gray-200 rounded-lg hover:bg-gray-300 grid place-items-center text-2xl font-bold cursor-pointer" onClick={() => {
        navigate("/finishing-department/all-reports");
      }}>All Daily Finishing Report</div>
      </div>
    </div>
  );
};

export default FinishingDepartment;
