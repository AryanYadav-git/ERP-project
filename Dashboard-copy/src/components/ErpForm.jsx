import React, { useState } from 'react'
import axios from 'axios';
import toast, {Toaster} from 'react-hot-toast';

const ErpForm = () => {
    const myDepartment = 'erp';
    const [jobNo, setJobNo] = useState();
    const [modelNo, setModelNo] = useState();
    const [color, setColor] = useState();
    const [sizesList, setSizesList] = useState([
        {
          size: "",
          sizeQty: 0,
          estQty: 0,
        }
    ]);

    const handleSizeChange = (event, index) => {
        const { value } = event.target
        const newInputList = [...sizesList]
        newInputList[index].size = value
        setSizesList(newInputList);
    }

    const handleSizeQtyChange = (event, index) => {
        const { value } = event.target
        const newInputList = [...sizesList]
        newInputList[index].sizeQty = value
        setSizesList(newInputList);
    }

    const handleEstSizeQtyChange = (event, index) => {
        const { value } = event.target
        const newInputList = [...sizesList]
        newInputList[index].estQty = value
        setSizesList(newInputList);
    }

    const handleListAdd = () => {
        setSizesList([
          ...sizesList,
          {
            size: "",
            sizeQty: 0,
            estQty: 0
          }
        ])
    }

    const handleListRemove = (index) => {
        const newList = [...sizesList]
        newList.splice(index, 1);
        setSizesList(newList);
        
    }

    
    // const [tQty, setTQty] = useState();
    const [del, setDel] = useState();
    const [exJpr, setExJpr] = useState();
    const Status = "Inactive";

    const submitErp = async () => {
        try{
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/erp`,
            {
                order:{
                    jobNo:jobNo,
                    modelNo: modelNo,
                    color : color,
                    sizes: sizesList,
                    EstDelDate : del,
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
        
        <div className="grid md:grid-cols-4 grid-cols-4 gap-6">
            <div className="md:col-span-1 col-span-2">
                <label htmlFor="jobNo" className='text-sm'>Job No. : </label>
                <input type='text' id='jobNo' className='border-[#eee] border-2 w-20 h-6' onChange={(e)=> {
                    setJobNo(parseInt(e.target.value));
                }}/>
            </div>
            <div className="md:col-span-1 col-span-2">
                <label htmlFor="ModelNo" className='text-sm'>Model No. : </label>
                <input type='text' id='ModelNo' className='border-[#eee] border-2 w-20 h-6 pl-2' onChange={(e)=> {
                    setModelNo(e.target.value);
                }}/>
            </div>
            <div className="md:col-span-1 ">
                <label htmlFor="color" className='text-sm'>Color : </label>
                <input type='text' id='color' className='border-[#eee] border-2 w-20 h-6' onChange={(e)=> {
                    setColor(e.target.value);
                }}/>
            </div>
            <div className="sizes-container flex flex-col gap-1 w-full mb-8 col-span-4 justify">
                <h3 className='w-full'>Sizes : </h3>
                <div className="sizes flex flex-col px-16  w-full justify-center  gap-1 ">
                    <div className=" h-full md:w-[40%] flex flex-col gap-2">
                        <div className="w-full grid grid-cols-4 gap-6">
                            <h1 className='col-span-1'>Size</h1>
                            <h1 className='col-span-1'>Size Qty.</h1>
                            <h1 className='col-span-1'>Est Qty.</h1>
                            <div className="flex gap-2">
                                <button className='bg-[#eee] h-8 w-8 rounded-full hover:bg-[#03C9D7]' title='Add new size' onClick={handleListAdd}>+</button>
                                
                            </div>
                            
                        </div>
                        {
                            sizesList.map((input, index)=> (
                                <div className="w-full grid grid-cols-4 gap-6 items-center">
                                    <input type="text" className='border-[#eee] border-2 col-span-1 h-6 p-1'  value={sizesList[index].size} onChange={(event) => handleSizeChange(event, index)}/>
                                    <input type="text" className='border-[#eee] border-2 col-span-1 h-6 p-1' value={sizesList[index].sizeQty} onChange={(event) => handleSizeQtyChange(event, index)}/>
                                    <input type="text" className='border-[#eee] border-2 col-span-1 h-6 p-1' value={sizesList[index].estQty} onChange={(event) => handleEstSizeQtyChange(event, index)}/>
                                    <button className='bg-[#eee] h-8 w-8 rounded-full hover:bg-[#03C9D7]' title='Remove size' onClick={() => handleListRemove(index)}>-</button>
                                </div>
                            ))
                        }
                    </div>
                    
                </div>
            </div>
            <div className=" md:col-span-2 col-span-4">
                <label htmlFor="deliveryDate" className='text-sm'>Delivery date : </label>
                <input type='text' id='deliveryDate' className='border-[#eee] border-2 w-30 h-6 pl-1' placeholder='yyyy-mm-dd' onChange={(e)=> {
                    setDel(e.target.value);
                }}/>
            </div>
            <div className=" md:col-span-2 col-span-4">
                <label htmlFor="jprDate" className='text-sm'>Ex Jpr Date date : </label>
                <input type='text' id='jprDate' className='border-[#eee] border-2 w-30 h-6' placeholder='yyyy-mm-dd' onChange={(e)=> {
                    setExJpr(e.target.value);
                }}/>
            </div>
            <div className='md:col-span-1 col-span-4'>
                <button className='bg-[#eee] p-2 rounded-lg w-full hover:bg-[#03C9D7]' onClick={submitErp}>Add New Order</button>
            </div>

        </div>
    </div>
  )
}

export default ErpForm