import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: 'S.No', headerName: 'S.No', width: 70,type: 'number'},
  { field: 'class', headerName: 'Class', width: 130 },
  { field: 'Branch', headerName: 'Branch', width: 130 },
  {
    field: 'Exam Name',
    headerName: 'Exam Name',
    width: 90,
  },
  {
    field: 'see time table',
    headerName: 'See Time Table',
    width: 160,
    valueGetter: (params) =>
      `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 100 },
  { id: 6, lastName: 'Melisandre', firstName: 'sam', age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

 function DataTable() {
  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={9} />
    </div>
  );
}

export default DataTable