import React, { useEffect } from 'react'
import { Header } from "../components";
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider'


const ErpDepartment = () => {
  const navigate = useNavigate();
  const myDepartment = ['erp', 'admin'];
  const {department, cuttingReportsData, setCuttingReportsData} = useStateContext();
  const isDepartment = myDepartment.includes(department);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl ">
      <Header category="" title="ERP Department "/>
      <div className="grid grid-cols-12 gap-4">
      {isDepartment && <div className="md:col-span-4 col-span-12 h-40 bg-gray-200 rounded-lg hover:bg-gray-300 grid place-items-center text-2xl  font-bold cursor-pointer" onClick={() => {
        navigate('/erp-department/new');
      }}>Enter New Order</div>}
      {/* <div className="col-span-4 h-40 bg-gray-200 rounded-lg hover:bg-gray-300 grid place-items-center text-2xl font-bold cursor-pointer" onClick={() => {
        navigate("/cutting-department/recieved");
      }}>Daily Recieved</div> */}
      <div className="md:col-span-4 col-span-12 h-40 bg-gray-200 rounded-lg hover:bg-gray-300 grid place-items-center text-2xl font-bold cursor-pointer" onClick={() => {
        navigate("/erp-department/orders");
      }}>All Orders</div>
      </div>
    </div>
  );
}

export default ErpDepartment