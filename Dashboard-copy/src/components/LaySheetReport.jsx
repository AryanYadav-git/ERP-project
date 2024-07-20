import React, { useEffect, useState } from 'react'
import { useStateContext } from '../contexts/ContextProvider'
import Indicator from './Indicator';
import { IoWarningOutline } from 'react-icons/io5';


const LaySheetReport = () => {
    const {laySheetBase, laySheetReport} = useStateContext();
    const [laySheetReportTemp, setLaySheetReportTemp] = useState([
      {
        // "thaanNo":1,
        "mtrs":0,
        "palla":0,
        "totalPalla":0,
        "wastage":0
      },
    ]);
    let {layLength} = laySheetBase;
    layLength = Number(layLength);
    console.log(laySheetBase);

    const handleListAdd = async () => {
      setLaySheetReportTemp([
        ...laySheetReportTemp,{
          "mtrs":0,
          "palla":0,
          "totalPalla":0,
          "wastage":0
        }
      ])
    }

    const calculateTtlPalla = () => {
      let count = 0;
      laySheetReportTemp.forEach((element, index, arr) => {
        count += Number(element.palla);
        element.totalPalla = count;
        // setLaySheetReportTemp(arr);
      });
    }

    const calculateWastage = ( index ) => {
      const list = [...laySheetReportTemp];
      const current = list[index];
      current.wastage = Math.round((current.mtrs - current.palla * layLength) * 100)/100;
      setLaySheetReportTemp(list);
    }


    const handleListRemove = (index) => {
      const newList = [...laySheetReportTemp]
      newList.splice(index, 1);
      calculateTtlPalla();
      setLaySheetReportTemp(newList);
      console.log(laySheetReportTemp);
       
    }

    const handleMeterChange = (event, index) => {
      const { value } = event.target
      const newInputList = [...laySheetReportTemp]
      newInputList[index].mtrs = value
      setLaySheetReportTemp(newInputList);
      calculateWastage(index);
    }

    const handlePallaChange = (event, index) => {
      const { value } = event.target
      const newInputList = [...laySheetReportTemp]
      newInputList[index].palla = value
      setLaySheetReportTemp(newInputList);
      calculateTtlPalla();
      calculateWastage(index);
    }

    const func = async () => {
      laySheetReport.map((input, index) => {
        console.log(input, index);
      })     
    }

    useEffect(() => {
      calculateTtlPalla();
    },[laySheetReportTemp]);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <div className='text-[grey] text-lg mb-4'>LaySheetReport</div>
      {/* <div className="">{layLength}</div> */}
      <div className="w-full md:mt-0 mt-2">
        <div className="">
          <div className="sizes flex flex-col w-full gap-2 ">
            <div className=" h-full  flex flex-col gap-1">
              <div className="w-full grid grid-cols-6 gap-6">
                <h1 className='col-span-1  flex justify-center'>Thaan No.</h1>
                <h1 className='col-span-1 flex justify-center'>Meters</h1>
                <h1 className='col-span-1 flex justify-center'>Palla</h1>
                <h1 className='col-span-1 flex justify-center'>Total Palla</h1>
                <h1 className='col-span-1 flex justify-center'>Wastage</h1>
                <div className="flex col-span-1 gap-1 justify-center">
                  <button className='bg-[#eee] h-8 w-8 rounded-full hover:bg-[#03C9D7]' title='Add new size'
                   onClick={handleListAdd}
                  >+</button>  
                  <IoWarningOutline className='collapse' fontSize='1em' color='orange' />             
                </div>              
              </div>
              {
                laySheetReportTemp.map((input, index)=> (
                <div className="w-full grid grid-cols-6 gap-6 items-center">
                  <h2 className='col-span-1 flex justify-center'>{index+1}</h2>
                  <input type="text" className='border-black border-b-2 active:border-b-2 col-span-1 h-6 p-1'  value={laySheetReportTemp[index].mtrs} 
                  onChange={(event) => handleMeterChange(event, index)}
                  />
                  <input type="text" className='border-black border-b-2 col-span-1 h-6 p-1' value={laySheetReportTemp[index].palla}
                   onChange={(event) => handlePallaChange(event, index)}
                  />
                  <h2 className='col-span-1 flex justify-center'>{laySheetReportTemp[index].totalPalla}</h2>
                  <h2 className='col-span-1 flex justify-center'>{laySheetReportTemp[index].wastage}</h2>
                  <div className="flex justify-center gap-1">
                    <button className='bg-[#eee] h-8 w-8 rounded-full hover:bg-[#03C9D7]' title='Remove size' 
                    onClick={() => handleListRemove(index)}
                    >-</button>
                    <Indicator current={laySheetReportTemp[index]} layLength={layLength}/>
                  </div>
                  
                 </div>
                ))
              }
            </div>
            <div className="w-full mt-20 flex md:justify-end">
              <button className='p-2 px-8 mr-4 rounded-lg w-fit bg-[#03C9D7]'>Save</button>
              <button className='p-2 px-8 mr-10 rounded-lg w-fit bg-[#03C9D7]'>Submit</button>
            </div>           
          </div>
        </div>    
      </div>
    </div>

  )
}

export default LaySheetReport