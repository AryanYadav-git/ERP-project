import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Header } from '../components';

const AllFinishingReports = () => {
    const navigate = useNavigate();

    return (
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl ">
        <Header category="Finishing Department" title="All Finishing Reports"/>
        <div className="grid grid-cols-12 gap-4">
        <div className="md:col-span-4 col-span-6 h-40 bg-gray-200 rounded-lg hover:bg-gray-300 grid place-items-center md:text-2xl text-xl font-bold cursor-pointer" onClick={() => {
          navigate("/finishing-department/recieved");
        }}>Final Checking</div>
        <div className="md:col-span-4 col-span-6 h-40 bg-gray-200 rounded-lg hover:bg-gray-300 grid place-items-center md:text-2xl text-xl font-bold cursor-pointer" onClick={() => {
          navigate("/finishing-department/recieved");
        }}>Thread Cutting</div>
        <div className="md:col-span-4 col-span-6 h-40 bg-gray-200 rounded-lg hover:bg-gray-300 grid place-items-center md:text-2xl text-xl font-bold cursor-pointer" onClick={() => {
          navigate("/finishing-department/recieved");
        }}>Kaj-Button</div>
        <div className="md:col-span-4 col-span-6 h-40 bg-gray-200 rounded-lg hover:bg-gray-300 grid place-items-center md:text-2xl text-xl font-bold cursor-pointer" onClick={() => {
          navigate("/finishing-department/recieved");
        }}>Washing</div>
        <div className="md:col-span-4 col-span-6 h-40 bg-gray-200 rounded-lg hover:bg-gray-300 grid place-items-center md:text-2xl text-xl font-bold cursor-pointer" onClick={() => {
          navigate("/finishing-department/ironing");
        }}>Ironing</div>
        <div className="md:col-span-4 col-span-6 h-40 bg-gray-200 rounded-lg hover:bg-gray-300 grid place-items-center md:text-2xl text-xl font-bold cursor-pointer" onClick={() => {
          navigate("/finishing-department/recieved");
        }}>Hanger Checking</div>
        <div className="md:col-span-4 col-span-6 h-40 bg-gray-200 rounded-lg hover:bg-gray-300 grid place-items-center md:text-2xl text-xl font-bold cursor-pointer" onClick={() => {
          navigate("/finishing-department/packing");
        }}>Packing</div>
        <div className="md:col-span-4 col-span-6 h-40 bg-gray-200 rounded-lg hover:bg-gray-300 grid place-items-center md:text-2xl text-xl font-bold cursor-pointer" onClick={() => {
          navigate("/finishing-department/recieved");
        }}>Alter</div>
        
        </div>
      </div>
    );
}

export default AllFinishingReports