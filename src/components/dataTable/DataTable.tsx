import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import './dataTable.scss';

interface Props {
  columns: GridColDef[];
  rows: any[];
  slug: string;
  onDelete: (id: string) => void;
  onEdit: (id: number) => void;
  getRowId?: (row: any) => number; 
  showEditButton?: boolean; // New prop for controlling edit button visibility
}

const DataTable = (props: Props) => {
  const handleDelete = (id: string) => {
    props.onDelete(id);
  };

  const handleEdit = (id: number) => {
    props.onEdit(id);
  };

  const actionColumn: GridColDef = {
    field: 'action',
    headerName: 'Action',
    width: 200,
    renderCell: (params) => {
      return (
        <div className="action">
          {/* <Link to={/${props.slug}/${params.row.id}}>
            <img src="/view.svg" alt="" />
          </Link> */}
          {/* {props.showEditButton && ( // Conditionally render the edit button
            <div className="edit" onClick={() => handleEdit(params.row.id)}>
              <img src="/view.svg" alt="" />
            </div>
          )} */}
          {/* Uncomment and adjust this if you want to enable delete functionality */}
          {/* <div className="delete" onClick={() => handleDelete(params.row.id)}>
            <img src="/delete.svg" alt="" />
          </div> */}
        </div>
      );
    },
  };

  return (
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={props.rows}
        columns={[...props.columns, actionColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnSelector
        disableColumnFilter
        disableDensitySelector
      />
    </div>
  );
};

export default DataTable;
