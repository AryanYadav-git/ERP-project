import React, {useState} from 'react'
import toast, { Toaster } from 'react-hot-toast'
import Button from '../Button';
import { useStateContext } from '../../contexts/ContextProvider';
import axios from 'axios';

const LaySheetForm = () => {
    const myDepartment = 'cutting';
    const [date, setDate] = useState(new Date().toJSON().slice(0,10));
    const {laySheetBase, setLaySheetBase, erpData} = useStateContext();
    const [layLength, setLayLength] = useState(laySheetBase.layLength);
    const [jobNo, setJobNo] = useState(laySheetBase.jobNo);
    const [modelNo, setModelNo] = useState(laySheetBase.modelNo);
    const [color, setColor] = useState(laySheetBase.color);
    const [compCount, setCompCount] = useState(laySheetBase.compCount);

    const [cutSizeQtyList, setCutSizeQtyList] = useState(laySheetBase.cutQty);

    const handleSizeChange = (event, index) => {
        const { value } = event.target
        const newInputList = [...cutSizeQtyList]
        newInputList[index].size = value
        setCutSizeQtyList(newInputList);
    }

    const handleSizeQtyChange = (event, index) => {
        const { value } = event.target
        const newInputList = [...cutSizeQtyList]
        newInputList[index].qty = value
        setCutSizeQtyList(newInputList);
    }

    // const handleEstSizeQtyChange = (event, index) => {
    //     const { value } = event.target
    //     const newInputList = [...cutSizeQtyList]
    //     newInputList[index].estQty = value
    //     setCutSizeQtyList(newInputList);
    // }

    const handleListAdd = () => {
        setCutSizeQtyList([
          ...cutSizeQtyList,
          {
            size: "",
            qty: 0,
          }
        ])
    }

    const handleListRemove = (index) => {
        const newList = [...cutSizeQtyList]
        newList.splice(index, 1);
        setCutSizeQtyList(newList);
        
    }

    const handleApplyButton = async () => {
        try{
            const base = {
                date,
                layLength,
                jobNo,
                modelNo,
                color,
                compCount,
                cutQty: cutSizeQtyList
            }
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/e/laybase`,
                {
                    entry:base,
                    department:myDepartment
                },{
                headers:{
                    'Authorization':`${localStorage.getItem('token')}`
                },
                
            })
            if(response.data.message){
                toast.success(response.data.message);
                setLaySheetBase(base);
            }
        }catch(e){
            toast.error(e.response.data.message);
        }
    }

    const handleNewEntry = () => {
        setColor('');
        setCompCount('');
        setJobNo('');
        setModelNo('');
        setLayLength('');
        setCutSizeQtyList([
            {
                size: "",
                qty: 0,
            }
        ]);
        setLaySheetBase('');
    }

  return (
    <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl' id=''>
        <Toaster></Toaster>
        <div className="flex justify-between">
            <h2 className='text-[grey] text-lg mb-4'>Lay Sheet Reports</h2>
            <button className=' text-blue-500 underline text-md mb-4 mr-4' onClick={handleNewEntry}>New Entry</button>
        </div>
        

        <div className="border-black border-1 rounded-md mb-4 p-4 flex md:flex-row flex-col gap-4">
            <div className=" md:w-2/6 w-full flex flex-col gap-4">
                <div className="flex ">
                    <label htmlFor="date" className='text-sm w-24' >Date : </label>
                    <input type='text' id='date' className='border-[#eee] border-2 w-30 h-6 px-1' value={date} onChange={async (e)=> {
                        await setDate(e.target.value);
                    }}/>
                </div>
                <div className="flex">
                    <label htmlFor="layLength" className='text-sm w-24 '  >Lay length : </label>
                    <input type='text' id='layLength' className='border-[#eee] border-2 w-30  h-6 px-1' value={layLength} onChange={async (e)=> {
                        await setLayLength(e.target.value);
                    }}/>
                </div>
                <div className="flex">
                    <label htmlFor="jobNo" className='text-sm w-24 '  >Job No : </label>
                    <input type='text' id='jobNo' className='border-[#eee] border-2 w-30 h-6 px-1' value={jobNo} onChange={async (e)=> {
                        await setJobNo(e.target.value);
                    }}/>
                </div>
                <div className="flex">
                    <label htmlFor="modelNo" className='text-sm w-24 '  >Model No : </label>
                    <input type='text' id='modelNo' className='border-[#eee] border-2 w-30 h-6 px-1' value={modelNo} onChange={async (e)=> {
                        await setModelNo(e.target.value);
                    }}/>
                </div>
                <div className="flex">
                    <label htmlFor="color" className='text-sm w-24 '  >Color :</label>
                    <input type='text' id='color' className='border-[#eee] border-2 w-30 h-6 px-1' value={color} onChange={async (e)=> {
                        await setColor(e.target.value);
                    }}/>
                </div>
                <div className="flex">
                    <label htmlFor="compCount" className='text-sm w-24 '  >No. of Components :</label>
                    <input type='text' id='compCount' className='border-[#eee] border-2 w-30 h-6 px-1' value={compCount} onChange={async (e)=> {
                        await setCompCount(e.target.value);
                    }}/>
                </div>
                
            </div>
            <div className="md:w-3/6 w-full md:mt-0 mt-2">
                <div className="">
                    <h3 className='w-full mb-1'>Cut Qty Size :</h3>
                    <div className="sizes flex flex-col  w-full gap-2 ">
                    <div className=" h-full  flex flex-col gap-1">
                        <div className="w-full grid grid-cols-4 gap-6">
                            <h1 className='col-span-1 place-content-center'>Size</h1>
                            <h1 className='col-span-1'>Qty.</h1>
                            <div className="flex col-span-1 gap-2">
                                <button className='bg-[#eee] h-8 w-8 rounded-full hover:bg-[#03C9D7]' title='Add new size' onClick={handleListAdd}>+</button>
                                
                            </div>
                            
                        </div>
                        {
                            cutSizeQtyList.map((input, index)=> (
                                <div className="w-full grid grid-cols-4 gap-6 items-center">
                                    <input type="text" className='border-[#eee] border-2 col-span-1 h-6 p-1'  value={cutSizeQtyList[index].size} onChange={(event) => handleSizeChange(event, index)}/>
                                    <input type="text" className='border-[#eee] border-2 col-span-1 h-6 p-1' value={cutSizeQtyList[index].qty} onChange={(event) => handleSizeQtyChange(event, index)}/>
                                    <button className='bg-[#eee] h-8 w-8 rounded-full hover:bg-[#03C9D7]' title='Remove size' onClick={() => handleListRemove(index)}>-</button>
                                </div>
                            ))
                        }
                    </div>
                    
                </div>

                </div>
                
            </div>
            <div className="md:w-1/6">
                <button className='bg-[#eee] p-2 rounded-lg w-full hover:bg-[#03C9D7]' onClick={handleApplyButton}>Apply</button>
            </div>
        </div>
    </div>
  )
}

export default LaySheetForm