import React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';

import { customersData, customersGrid } from '../data/dummy';
import { Header } from '../components';

const FinishingTemp = () => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Delete','Edit','Filter','Submit'];
  const editing = { allowDeleting: true, allowEditing: true };

  const handleActionBegin = async (args) => {
    if (args.requestType == 'delete') {
      const deletedRecord = args.data[0]; // Assuming single delete, for multiple, you need to handle an array
      try {
        const response = await fetch('http://localhost:3000/admin/ad', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: deletedRecord.id }),
        });
        if (!response.ok) {
          throw new Error('Failed to delete');
        }
        console.log('Delete successful');
      } catch (error) {
        console.error('Error deleting record:', error);
        args.cancel = true; // Cancel the grid delete action if backend delete fails
      }
    }
  };

  const handleToolbarClick = (args) => {
    if (args.item.text === 'Submit') {
      // Implement your custom logic here
      console.log('Submit button clicked');
      // Example: Send a custom request to the backend
      fetch('http://localhost:3000/admin/ad', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify({ data: customersData }), // Adjust payload as needed
      })
      .then(response => response.json())
      .then(data => {
        console.log('Submit successful', data);
      })
      .catch(error => {
        console.error('Error submitting data:', error);
      });
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="FinishingDepartment" />
      <GridComponent
        dataSource={customersData}
        enableHover={false}
        allowPaging
        pageSettings={{ pageCount: 5 }}
        selectionSettings={selectionsettings}
        toolbar={toolbarOptions}
        editSettings={editing}
        allowSorting
        actionBegin={handleActionBegin}
        toolbarClick={handleToolbarClick}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {customersGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default FinishingTemp;
