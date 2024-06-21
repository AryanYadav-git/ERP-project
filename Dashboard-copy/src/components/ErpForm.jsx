import React, { useState } from 'react'
import axios from 'axios';
import toast, {Toaster} from 'react-hot-toast';

const ErpForm = () => {
    const myDepartment = 'erp';
    const [orderNo, setOrderNo] = useState();
    const [modelNo, setModelNo] = useState();
    const [color, setColor] = useState();
    const [tQty, setTQty] = useState();
    const [del, setDel] = useState();
    const [exJpr, setExJpr] = useState();
    const Status = "Inactive";

    const submitErp = async () => {
        try{
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/erp`,
            {
                order:{
                    orderNo:orderNo,
                    modelNo: modelNo,
                    color : color,
                    totalQty : tQty,
                    delDate : del,
                    exJprDate : exJpr,
                    status: Status
                },
                department:myDepartment
            },{
            headers:{
                'Authorization':`${localStorage.getItem('token')}`
            },
            
        })
        if(response.data.message){
            console.log("in toast")
            toast.success(response.data.message);
        }
    }catch(e){
        toast.error(e.response.data.message);
            console.log(e)
        }

    }


  return (
    <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl' id='w-full h-32  rounded-md border-2 border-black'>
        <Toaster></Toaster>
        <h2 className='text-[grey] text-lg mb-4'>Enter New Order</h2>
        
        <div className="grid md:grid-cols-4 grid-cols-3 gap-6">
            <div className="">
                <label htmlFor="orderNo" className='text-sm'>Order No. : </label>
                <input type='text' id='orderNo' className='border-[#eee] border-2 w-20 h-6' onChange={(e)=> {
                    setOrderNo(parseInt(e.target.value));
                }}/>
            </div>
            <div className="">
                <label htmlFor="ModelNo" className='text-sm'>Model No. : </label>
                <input type='text' id='ModelNo' className='border-[#eee] border-2 w-20 h-6 pl-2' onChange={(e)=> {
                    setModelNo(e.target.value);
                }}/>
            </div>
            <div className="">
                <label htmlFor="color" className='text-sm'>Color : </label>
                <input type='text' id='color' className='border-[#eee] border-2 w-20 h-6' onChange={(e)=> {
                    setColor(e.target.value);
                }}/>
            </div>
            <div className="">
                <label htmlFor="totalQty" className='text-sm'>Total Quality : </label>
                <input type='text' id='totalQty' className='border-[#eee] border-2 w-20 h-6' onChange={(e)=> {
                    setTQty(e.target.value);
                }}/>
            </div>
            <div className=" col-span-2">
                <label htmlFor="deliveryDate" className='text-sm'>Delivery date : </label>
                <input type='text' id='deliveryDate' className='border-[#eee] border-2 w-30 h-6 pl-1' placeholder='yyyy-mm-dd' onChange={(e)=> {
                    setDel(e.target.value);
                }}/>
            </div>
            <div className="col-span-2">
                <label htmlFor="jprDate" className='text-sm'>Ex Jpr Date date : </label>
                <input type='text' id='jprDate' className='border-[#eee] border-2 w-30 h-6' placeholder='yyyy-mm-dd' onChange={(e)=> {
                    setExJpr(e.target.value);
                }}/>
            </div>
            <div className='col-span-1'>
                <button className='bg-[#eee] p-2 rounded-lg w-full hover:bg-[#03C9D7]' onClick={submitErp}>Add New Order</button>
            </div>

        </div>
    </div>
  )
}

export default ErpForm