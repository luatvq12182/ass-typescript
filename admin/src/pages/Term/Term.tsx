import { useSearchParams } from 'react-router-dom';
import TermForm from './components/TermForm';
import TermTable from './components/TermTable';
import useTerms from '../../hooks/queries/useTerms';
import useMutationTerm from '../../hooks/mutations/useMutationTerm';
import { Term } from '../../interfaces';
import DialogUpdateTerm from './components/DialogUpdateTerm';
import { useState } from 'react';

const TermManage = () => {
    const [searchParams] = useSearchParams();
    const taxonomy = searchParams.get('taxonomy') || 'category';
    const { data, isFetching } = useTerms();
    const { createTerm, updateTerm, deleteTerm } = useMutationTerm(taxonomy);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [termUpdate, setTermUpdate] = useState<Term>(null!);

    const handleOpenDialogUpdate = (term: Term) => {
        setIsOpen(true);
        setTermUpdate(term);
    };

    const categories =
        data?.data.filter((term: Term) => term.taxonomy === 'category') || [];

    return (
        <div>
            <DialogUpdateTerm
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                data={termUpdate}
                categories={categories}
                onUpdateTerm={updateTerm}
                taxonomy={taxonomy}
            />

            <div className='grid grid-cols-3 gap-7'>
                <div className='rounded-md bg-white p-7 shadow-lg'>
                    <TermForm
                        onCreateTerm={createTerm}
                        categories={categories}
                        taxonomy={taxonomy}
                    />
                </div>

                <div className='col-span-2 rounded-md bg-white p-7 shadow-lg'>
                    <TermTable
                        loading={isFetching}
                        onDeleteTerm={deleteTerm}
                        onOpenDialogUpdate={handleOpenDialogUpdate}
                        data={
                            data?.data.filter(
                                (item: Term) => item.taxonomy === taxonomy
                            ) || []
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default TermManage;
