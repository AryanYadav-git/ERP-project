import React from 'react'
import Header from './Header'
// import { useStateContext } from '../contexts/ContextProvider'
import { GridComponent, ColumnsDirective, ColumnDirective} from '@syncfusion/ej2-react-grids';


const SizeDescription = ({orderDetails}) => {
  const {jobNo, modelNo, color, EstDelDate, orderQty, sizes, totalEstQty, status, exJprDate} = orderDetails;
  return (
    <div className="mt-10">
      <Header title="DESCRIPTION" />
      <div className="border-1 border-black bg-gray-100 p-8 md:w-[60%] rounded-md">
        {/* <Header  title={`${jobNo}${modelNo}` }/> */}
        <h1 className="mb-6">
          <b className="text-3xl font-extrabold tracking-tight text-slate-900 mb-8">{`${jobNo}${modelNo}`}</b>
        </h1>
        <h1>
          COLOR : <b className="font-semibold">{color}</b>
        </h1>
        <h1>
          STATUS : <b className="font-semibold">{status}</b>
        </h1>
        <h1 className="mt-4 mb-8">
          SIZES with QTY:
          <div className="ml-8 my-4">
            <GridComponent dataSource={sizes} >
              <ColumnsDirective>
                <ColumnDirective
                  headerText="Size"
                  field="size"
                  width="50"
                  textAlign="Center"
                />
                <ColumnDirective
                  headerText="Size Qty"
                  field="sizeQty"
                  width="50"
                  textAlign="Center"
                />
                <ColumnDirective
                  headerText="Est. Qty"
                  field="estQty"
                  width="50"
                  textAlign="Center"
                />
              </ColumnsDirective>
              {/* <Inject services={[Search, Page, Sort]} /> */}
            </GridComponent>
          </div>
        </h1>
        <h1>
          ORDER QUANTITY : <b className="font-semibold">{orderQty}</b>
        </h1>
        <h1>
          EST. QUANTITY : <b className="font-semibold">{totalEstQty}</b>
        </h1>
        <h1 className='mt-4'>
          EST. DELIVERY DATE : <b className="font-semibold">{EstDelDate}</b>
        </h1>
        <h1>
          EX JPR DATE : <b className="font-semibold">{exJprDate}</b>
        </h1>
      </div>
    </div>
  );
}

export default SizeDescription