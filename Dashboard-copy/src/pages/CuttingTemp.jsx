import React from "react";
import {
  GridComponent,
  Inject,
  ColumnsDirective,
  ColumnDirective,
  Search,
  Page,
} from "@syncfusion/ej2-react-grids";
import { useStateContext } from "../contexts/ContextProvider";
import { employeesData, employeesGrid } from "../data/dummy";
import { Header } from "../components";
import CuttingForm from "../components/CuttingReceivedForm";

const CuttingTemp = () => {
  const toolbarOptions = ["Search"];
  const myDepartment = 'cutting';
  const { department } = useStateContext();
  const isDepartment = department == myDepartment;
  const editing = { allowDeleting: true, allowEditing: true };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      {isDepartment && <CuttingForm/>}
      <Header category="Page" title="Cutting Temp Department " />
      <GridComponent
        dataSource={employeesData}
        width="auto"
        allowPaging
        allowSorting
        pageSettings={{ pageCount: 5 }}
        editSettings={editing}
        toolbar={toolbarOptions}
      >
        <ColumnsDirective>
          {employeesGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Search, Page]} />
      </GridComponent>
    </div>
  );
};
export default CuttingTemp;
