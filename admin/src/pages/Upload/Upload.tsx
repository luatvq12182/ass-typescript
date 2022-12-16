import { useEffect, useRef } from 'react';
import useFiles from '../../hooks/queries/useFiles';
import useMutationFile from '../../hooks/mutations/useMutationFile';
import { Button } from 'primereact/button';
import useConfirm from '../../hooks/useConfirm';
import useLoading from '../../hooks/useLoading';

const Upload = () => {
    const { showLoading, hideLoading } = useLoading();

    const idSelected = useRef<number>(null!);
    const ipFile = useRef<HTMLInputElement | null>(null!);
    const { data, isFetching } = useFiles();
    const { uploadFile, deleteFile } = useMutationFile();
    const { showConfirm } = useConfirm({
        message: 'Bạn có chắc muốn xóa file này?',
        accept: () => {
            deleteFile(idSelected.current);
        },
    });

    const handleClickUpload = () => {
        ipFile.current?.click();
    };

    const handleChangeFile = () => {
        const formData = new FormData();

        const files = ipFile.current?.files;

        for (const key in files) {
            if (Object.prototype.hasOwnProperty.call(files, key)) {
                formData.append('files', files[Number(key)]);
            }
        }

        uploadFile(formData);
    };

    useEffect(() => {
        if (isFetching) {
            showLoading();
        } else {
            hideLoading();
        }
    }, [isFetching]);

    return (
        <div>
            <div className='mb-3'>
                <Button onClick={handleClickUpload}>Upload file</Button>
                <input
                    onChange={handleChangeFile}
                    ref={ipFile}
                    type='file'
                    hidden={true}
                    multiple={true}
                />
            </div>

            <div className='grid grid-cols-5 gap-4'>
                {data?.data.map((file: any) => {
                    return (
                        <div
                            key={file.id}
                            className='h-[200px] w-full rounded-md bg-cover'
                            style={{
                                backgroundImage: `url(${
                                    `${import.meta.env.VITE_API_URL}/images/` +
                                    file.fileName
                                })`,
                            }}
                        >
                            <div>
                                <Button
                                    icon='pi pi-trash'
                                    className='p-button-rounded p-button-danger p-button-text'
                                    onClick={() => {
                                        idSelected.current = file.id;
                                        showConfirm();
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Upload;
