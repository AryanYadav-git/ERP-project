import React, {useState} from 'react'
import { Toaster } from 'react-hot-toast'

const LaySheetForm = () => {
    const [date, setDate] = useState(new Date().toJSON().slice(0,10));
    const [layLength, setLayLength] = useState();
    const [jobNo, setJobNo] = useState();
    const [color, setColor] = useState();
    const [compCount, setCompCount] = useState();

    const [cutSizeQtyList, setCutSizeQtyList] = useState([
        {
            size: "",
            qty: 0,
        }
    ]);

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

  return (
    <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl' id='w-full h-32  rounded-md border-2 border-black'>
        <Toaster></Toaster>
        <h2 className='text-[grey] text-lg mb-4'>Lay Sheet Reports</h2>

        <div className="border-black border-1 mb-4 p-4 flex md:flex-row flex-col gap-4">
            <div className="md:w-1/3 w-full flex flex-col gap-4">
                <div className="flex ">
                    <label htmlFor="date" className='text-sm w-24' >Date : </label>
                    <input type='text' id='date' className='border-[#eee] border-2 w-30 h-6 px-1' value={date} onChange={async (e)=> {
                        await setDate(e.target.value);
                    }}/>
                </div>
                <div className="flex">
                    <label htmlFor="layLength" className='text-sm w-24 '  >Lay length : </label>
                    <input type='text' id='layLength' className='border-[#eee] border-2 w-30  h-6 px-1' onChange={async (e)=> {
                        await setLayLength(e.target.value);
                    }}/>
                </div>
                <div className="flex">
                    <label htmlFor="jobNo" className='text-sm w-24 '  >Job No : </label>
                    <input type='text' id='jobNo' className='border-[#eee] border-2 w-30 h-6 px-1' onChange={async (e)=> {
                        await setLayLength(e.target.value);
                    }}/>
                </div>
                <div className="flex">
                    <label htmlFor="color" className='text-sm w-24 '  >Color :</label>
                    <input type='text' id='color' className='border-[#eee] border-2 w-30 h-6 px-1' onChange={async (e)=> {
                        await setLayLength(e.target.value);
                    }}/>
                </div>
                <div className="flex">
                    <label htmlFor="compCount" className='text-sm w-24 '  >No. of Components :</label>
                    <input type='text' id='compCount' className='border-[#eee] border-2 w-30 h-6 px-1' onChange={async (e)=> {
                        await setLayLength(e.target.value);
                    }}/>
                </div>
            </div>
            <div className="md:w-2/3 w-full md:mt-0 mt-2">
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
        </div>
    </div>
  )
}

export default LaySheetForm