import { DataTable } from 'primereact/datatable';
import { Column, ColumnBodyOptions } from 'primereact/column';
import { ColumnType } from '../../interfaces';

type Props = {
    columns: Array<ColumnType>;
    value: Array<any>;
};

const CommonTable = ({ value, columns }: Props) => {
    const genOrder = (_data: any, options: ColumnBodyOptions) => {
        return options.rowIndex + 1;
    };

    return (
        <DataTable
            value={value}
            paginator
            rows={10}
            rowsPerPageOptions={[10, 25, 50, 100, 200]}
            emptyMessage='No Data'
            size='small'
        >
            <Column header='STT' body={genOrder} />
            {columns.map((column: ColumnType, i: number) => {
                return <Column key={i} {...column} />;
            })}
        </DataTable>
    );
};

export default CommonTable;
