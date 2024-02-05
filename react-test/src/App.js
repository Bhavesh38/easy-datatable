import React from 'react';
const createDataTable = require('easy-datatable');

const App = () => {
  const plugins = { searching: true, copyCellText: true }
  const dataTable = createDataTable('your_table_id', plugins);
  dataTable.initializeDataTable();
  return (
    <div>
      <table id='table'>
        <thead>
          <tr id='head' style={{ border: "1px solid gray" }} >
            <th style={{ border: "1px solid gray" }} >Id</th>
            <th style={{ border: "1px solid gray" }} >Name</th>
            <th style={{ border: "1px solid gray" }} >Age</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ border: "1px solid gray" }} >
            <td style={{ border: "1px solid gray" }} >1</td>
            <td style={{ border: "1px solid gray" }} >John</td>
            <td style={{ border: "1px solid gray" }} >25</td>
          </tr>
          <tr style={{ border: "1px solid gray" }} >
            <td style={{ border: "1px solid gray" }} >2</td>
            <td style={{ border: "1px solid gray" }} >Smith</td>
            <td style={{ border: "1px solid gray" }} >30</td>
          </tr>
          <tr style={{ border: "1px solid gray" }} >
            <td style={{ border: "1px solid gray" }} >3</td>
            <td style={{ border: "1px solid gray" }} >Harry</td>
            <td style={{ border: "1px solid gray" }} >35</td>
          </tr>
          <tr style={{ border: "1px solid gray" }} >
            <td style={{ border: "1px solid gray" }} >4</td>
            <td style={{ border: "1px solid gray" }} >Tom</td>
            <td style={{ border: "1px solid gray" }} >40</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default App
