import { useRef } from 'react';
import { ColumnType, Term } from '../../../interfaces';
import CommonTable from '../../../components/CommonTable';
import useConfirm from '../../../hooks/useConfirm';
import { Button } from 'primereact/button';

type Props = {
    data: Term[];
    onDeleteTerm: any;
    onOpenDialogUpdate: (term: Term) => void;
    loading: boolean;
};

const TermTable = ({
    data,
    onDeleteTerm,
    onOpenDialogUpdate,
    loading,
}: Props) => {
    const idSelected = useRef<number>(null!);
    const { showConfirm } = useConfirm({
        message: 'Bạn có chắc muốn xóa chuyên mục này?',
        accept: () => {
            onDeleteTerm(idSelected.current);
        },
    });

    const columns: ColumnType[] = [
        {
            field: 'name',
            header: 'Tên',
        },
        {
            field: 'slug',
            header: 'Đường dẫn',
        },
        {
            body: (data: Term) => {
                return (
                    <div>
                        <Button
                            icon='pi pi-pencil'
                            className='p-button-rounded p-button-info p-button-text'
                            onClick={() => onOpenDialogUpdate(data)}
                        />
                        <Button
                            icon='pi pi-trash'
                            className='p-button-rounded p-button-danger p-button-text'
                            onClick={() => {
                                if (data.id) {
                                    idSelected.current = data.id;
                                    showConfirm();
                                }
                            }}
                        />
                    </div>
                );
            },
        },
    ];

    return (
        <div>
            <CommonTable value={data} columns={columns} loading={loading} />
        </div>
    );
};

export default TermTable;
