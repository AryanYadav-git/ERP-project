import React, { useState } from 'react'
import axios from 'axios';
import toast, {Toaster} from 'react-hot-toast';
import { useStateContext } from '../contexts/ContextProvider';

const ProductionReceivedForm = () => {
    const myDepartment = 'production';
    const {activeOrders} = useStateContext();
    const [jobNo, setJobNo] = useState();
    const [modelNo, setModelNo] = useState();
    const [size, setSize] = useState();
    const [color, setColor] = useState();
    const [selectedOption, setSelectedOption] = useState('');
    const [layer, setLayer] = useState();
    const [lineNo, setLineNo] = useState();
    const [qty, setQty] = useState();
    const date = new Date().toJSON().slice(0,10);

    const submitNewEntry = async () => {
        try{
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/production/received`,
              {
                date,
                entry: {
                  jobNo,
                  modelNo,
                  color,
                  layer,
                  lineNo,
                  size,
                  qty,
                },
                department: myDepartment,
              },
              {
                headers: {
                  Authorization: `${localStorage.getItem("token")}`,
                },
              }
            );
            if(response.data.message){
                console.log("in toast")
                toast.success(response.data.message);
            }

        }catch(e) {
            toast.error(e.response.data.message);
            console.log(e)
        }}
    
        const handleChange = (event) => {
            const selected = JSON.parse(event.target.value);
            setSelectedOption(event.target.value);
            setJobNo(selected.job);
            setModelNo(selected.model);
            setColor(selected.color);
        }

  return (
    <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl' id='w-full h-32  rounded-md border-2 border-black'>
        <Toaster></Toaster>
        <h2 className='text-[grey] text-lg mb-4'>Today's Entry</h2>
        <div className="flex gap-4 mb-4">
          <label htmlFor="select" className='flex w-16'>Select : </label>
          <select name="select" id="select" className='border-[#eee] border-2 w-full h-6 ' value={selectedOption} onChange={handleChange}>
            <option value="" disabled selected>Select an option</option>
            {activeOrders.map((data)=> (
              <option className='border-[#eee] border-2 w-full h-6' value={JSON.stringify({job: data.jobNo, model: data.modelNo, color: data.color})} >{data.jobNo} - {data.modelNo} - {data.color}</option>
            ))}
          </select>
        </div>
        <div className="grid md:grid-cols-4 grid-cols-3 gap-6">
        <div className="">
                <label htmlFor="jobNo" className='text-sm'>Job No. : </label>
                <input type='text' id='jobNo' className='border-[#eee] border-2 w-20 h-6' value={jobNo} disabled/>
            </div>
            <div className="">
                <label htmlFor="ModelNo" className='text-sm'>Model No. : </label>
                <input type='text' id='ModelNo' className='border-[#eee] border-2 w-20 h-6' value={modelNo} disabled/>
            </div>
            <div className="">
                <label htmlFor="color" className='text-sm'>Color : </label>
                <input type='text' id='color' className='border-[#eee] border-2 w-20 h-6' value={color} disabled/>
            </div>
            <div className="">
                <label htmlFor="size" className='text-sm'>Size : </label>
                <input type='text' id='size' className='border-[#eee] border-2 w-20 h-6' onChange={(e)=> {
                    setSize(e.target.value);
                }}/>
            </div>
            <div className="">
                <label htmlFor="layer" className='text-sm'>Layer : </label>
                <input type='text' id='layer' className='border-[#eee] border-2 w-20 h-6' onChange={(e)=> {
                    setLayer(e.target.value);
                }}/>
            </div>
            <div className="">
                <label htmlFor="lineNo" className='text-sm'>Line No : </label>
                <input type='text' id='lineNo' className='border-[#eee] border-2 w-20 h-6' onChange={(e)=> {
                    setLineNo(e.target.value);
                }}/>
            </div>
            <div className="col-span-2">
                <label htmlFor="qty" className='text-sm'>Quantity : </label>
                <input type='text' id='qty' className='border-[#eee] border-2 w-30 h-6' onChange={(e)=> {
                    setQty(e.target.value);
                }}/>
            </div>
            {/* <div className="col-span-2">
                <label htmlFor="qty" className='text-sm'>date :  </label>
                <input type='text' id='qty' className='border-[#eee] border-2 w-30 h-6' onChange={(e)=> {
                    setDate(e.target.value);
                }}/>
            </div> */}
            <div className='col-span-1'>
                <button className='bg-[#eee] p-2 rounded-lg w-full hover:bg-[#03C9D7]' onClick={submitNewEntry}>Add New Entry</button>
            </div>

        </div>
    </div>
  )
}

export default ProductionReceivedForm