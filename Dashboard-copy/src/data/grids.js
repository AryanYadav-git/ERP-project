import React from 'react';
import { GrLocation } from 'react-icons/gr';
// import { gridOrderStatus } from './dummy';
const gridOrderStatus = (props) =>{ 
  let statusColor = "red"
  if(props.status == 'Active'){
    statusColor = "#8BE78B"
  }else if(props.status == 'Inactive'){
    statusColor = "#FEC90F"
  }
  return(
    <div className="flex gap-2 justify-center items-center text-gray-700 capitalize">
    <p style={{ background: statusColor }} className="rounded-full h-3 w-3" />
    <p>{props.status}</p>
  </div>
)};


const gridEmployeeProfile = (props) => (
    <div className="flex items-center gap-2">
      <img
        className="rounded-full w-10 h-10"
        src={props.EmployeeImage}
        alt="employee"
      />
      <p>{props.Name}</p>
    </div>
  );

  const gridEmployeeCountry = (props) => (
    <div className="flex items-center justify-center gap-2">
      <GrLocation />
      <span>{props.Country}</span>
    </div>
  );

  const actionTemplate = (props) => {
    return (
      <button
        className="e-button"
        onClick={() => handleButtonClick(props)}
        disabled={props.status === 'Active'}
      >
        Activate
      </button>
    );
  };

export const erpGrid = [
    { headerText: 'Employee',
      width: '150',
      template: gridEmployeeProfile,
      textAlign: 'Center' },
    { field: 'Name',
      headerText: '',
      width: '0',
      textAlign: 'Center',
    },
    { field: 'Title',
      headerText: 'Designation',
      width: '170',
      textAlign: 'Center',
    },
    { headerText: 'Country',
      width: '120',
      textAlign: 'Center',
      template: gridEmployeeCountry },
  
    { field: 'HireDate',
      headerText: 'Hire Date',
      width: '135',
      format: 'yMd',
      textAlign: 'Center' },
  
    { field: 'ReportsTo',
      headerText: 'Reports To',
      width: '120',
      textAlign: 'Center' },
    { field: 'EmployeeID',
      headerText: 'Employee ID',
      width: '125',
      textAlign: 'Center' },
  ];

  export const erpGrid2 = [
    { field: 'jobNo',
    headerText: 'Job No.',
    width: '100',
    textAlign: 'Center' },

    { field: 'modelNo',
    headerText: 'Model No.',
    width: '100',
    textAlign: 'Center' },

    { field: 'color',
    headerText: 'Color',
    width: '120',
    textAlign: 'Center' },

    { field: 'orderQty',
    headerText: 'Order Quantity',
    width: '120',
    textAlign: 'Center' },

    { field: 'totalEstQty',
    headerText: 'Est. Quantity',
    width: '120',
    textAlign: 'Center' },

    { field: 'EstDelDate',
    headerText: 'Est. Delivery date',
    width: '125',
    textAlign: 'Center' },

    { field: 'exJprDate',
    headerText: 'Ex Jpr date',
    width: '125',
    textAlign: 'Center' },
    
]

export const ActiveOrdersGrid = [
  { field: 'jobNo',
    headerText: 'Job No.',
    width: '100',
    textAlign: 'Center' },

    { field: 'modelNo',
    headerText: 'Model No.',
    width: '100',
    textAlign: 'Center' },

    { field: 'color',
    headerText: 'Color',
    width: '100',
    textAlign: 'Center' },

    { field: 'orderQty',
    headerText: 'Order Quantity',
    width: '110',
    textAlign: 'Center' },

    { field: 'EstDelDate',
    headerText: 'Est. Delivery date',
    width: '125',
    textAlign: 'Center' },

    { field: 'exJprDate',
    headerText: 'Ex Jpr date',
    width: '130',
    textAlign: 'Center' },

    {
      field: 'status',
      headerText:'Status',
      width:'125',
      format: 'yMd',
      textAlign: 'Center',
      template:gridOrderStatus,
    }
] 


export const cuttingReportsGrid = [
  {
    field: "jobNo",
    headerText: "Job No.",
    width: "100",
    textAlign: "Center",
  },

  {
    field: "modelNo",
    headerText: "Model No.",
    width: "100",
    textAlign: "Center",
  },
  {
    field: "color",
    headerText: "Color",
    width: "100",
    textAlign: "Center",
  },
  {
    field: "size",
    headerText: "Size",
    width: "100",
    textAlign: "Center",
  },

  {
    field: "layer",
    headerText: "Layer",
    width: "100",
    textAlign: "Center",
  },
  

  {
    field: "qty",
    headerText: "Quantity",
    width: "100",
    textAlign: "Center",
  },
  // {
  //   headerText:"Actions",
  //   template:actionTemplate,
  //   width:"150",
  //   textAlign:"Center",
  // }

];


export const cuttingReceivedGrid = [
  {
    field: "orderNo",
    headerText: "Order No.",
    width: "100",
    textAlign: "Center",
  },

  {
    field: "modelNo",
    headerText: "Model No.",
    width: "100",
    textAlign: "Center",
  },

  {
    field: "color",
    headerText: "Color",
    width: "100",
    textAlign: "Center",
  },

  {
    field: "size",
    headerText: "Size",
    width: "100",
    textAlign: "Center",
  },
  
  {
    field: "qty",
    headerText: "Quantity",
    width: "100",
    textAlign: "Center",
  },
  // {
  //   headerText:"Actions",
  //   template:actionTemplate,
  //   width:"150",
  //   textAlign:"Center",
  // }

];

export const ReceivedGrid = [
  {
    field: "jobNo",
    headerText: "Job No.",
    width: "100",
    textAlign: "Center",
  },

  {
    field: "modelNo",
    headerText: "Model No.",
    width: "100",
    textAlign: "Center",
  },

  {
    field: "color",
    headerText: "Color",
    width: "100",
    textAlign: "Center",
  },

  {
    field: "size",
    headerText: "Size",
    width: "100",
    textAlign: "Center",
  },
  
  {
    field: "qty",
    headerText: "Quantity",
    width: "100",
    textAlign: "Center",
  },
  // {
  //   headerText:"Actions",
  //   template:actionTemplate,
  //   width:"150",
  //   textAlign:"Center",
  // }

];

export const ReportsGrid = [
  {
    field: "jobNo",
    headerText: "Job No.",
    width: "100",
    textAlign: "Center",
  },

  {
    field: "modelNo",
    headerText: "Model No.",
    width: "100",
    textAlign: "Center",
  },
  {
    field: "color",
    headerText: "Color",
    width: "100",
    textAlign: "Center",
  },
  {
    field: "size",
    headerText: "Size",
    width: "100",
    textAlign: "Center",
  },

  // {
  //   field: "layer",
  //   headerText: "Layer",
  //   width: "100",
  //   textAlign: "Center",
  // },
  
  {
    field: "lineNo",
    headerText: "Line No.",
    width: "100",
    textAlign: "Center",
  },

  {
    field: "qty",
    headerText: "Quantity",
    width: "100",
    textAlign: "Center",
  },
  // {
  //   headerText:"Actions",
  //   template:actionTemplate,
  //   width:"150",
  //   textAlign:"Center",
  // }

];

export const sumupReportGrid = [
  {
    field: "jobNo",
    headerText: "Job No",
    width: "100",
    textAlign: "Center",
  },
  
  {
    field: "color",
    headerText: "Color",
    width: "100",
    textAlign: "Center",
  },

  {
    field: "orderQty",
    headerText: "Order Qty",
    width: "100",
    textAlign: "Center",
  },

  {
    field: "estQty",
    headerText: "Est Qty",
    width: "100",
    textAlign: "Center",
  },
  
  {
    field: "totalCut",
    headerText: "Total Cut",
    width: "100",
    textAlign: "Center",
  },
  {
    field: "totalIssue",
    headerText: "Total Issue",
    width: "100",
    textAlign: "Center",
  },
  {
    field: "totalProd",
    headerText: "Total Prod",
    width: "100",
    textAlign: "Center",
  },
  {
    field: "dispatchToFinishing",
    headerText: "Dispatch To Finishing",
    width: "100",
    textAlign: "Center",
  },
  {
    field: "totalIron",
    headerText: "Total Iron",
    width: "100",
    textAlign: "Center",
  },
  {
    field: "totalPacking",
    headerText: "Total Pack",
    width: "100",
    textAlign: "Center",
  },

]

export const FinishingGrid = [
  {
    field: 'jobNo',
    headerText: 'Job No',
    width:'100',
    textAlign: 'Center',
  },
  {
    field: 'modelNo',
    headerText: 'Model No',
    width:'100',
    textAlign: 'Center',
  },
  {
    field: 'color',
    headerText: 'Color',
    width:'100',
    textAlign: 'Center',
  },
  {
    field: 'size',
    headerText: 'Size',
    width:'100',
    textAlign: 'Center',
  },
  {
    field: 'qty',
    headerText: 'Qty',
    width:'100',
    textAlign: 'Center',
  },
  
]

export const productionReceivedGrid = [
  {
    field: "jobNo",
    headerText: "Job No.",
    width: "100",
    textAlign: "Center",
  },

  {
    field: "modelNo",
    headerText: "Model No.",
    width: "100",
    textAlign: "Center",
  },
  {
    field: "color",
    headerText: "Color",
    width: "100",
    textAlign: "Center",
  },
  {
    field: "size",
    headerText: "Size",
    width: "100",
    textAlign: "Center",
  },

  {
    field: "layer",
    headerText: "Layer",
    width: "100",
    textAlign: "Center",
  },
  
  {
    field: "lineNo",
    headerText: "Line No.",
    width: "100",
    textAlign: "Center",
  },

  {
    field: "qty",
    headerText: "Quantity",
    width: "100",
    textAlign: "Center",
  },

];