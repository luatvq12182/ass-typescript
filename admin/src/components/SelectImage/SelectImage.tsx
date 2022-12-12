import { useEffect, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { RadioButton } from 'primereact/radiobutton';
import useFiles from '../../hooks/queries/useFiles';
import useMutationFile from '../../hooks/mutations/useMutationFile';

type Props = {
    label: string;
    imgSelect: string;
    onSelect: (img: string) => void;
};

const SelectImage = ({ label, onSelect, imgSelect }: Props) => {
    const { data: files } = useFiles();
    const ipFile = useRef<HTMLInputElement | null>(null!);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [imgSelected, setImgSelected] = useState<string>(null!);
    const { uploadFile } = useMutationFile();

    const toggleDialog = () => setIsVisible(!isVisible);

    const renderFooter = () => {
        return (
            <Button
                onClick={() => {
                    onSelect(imgSelected);
                    setIsVisible(false);
                }}
                disabled={!imgSelected}
            >
                Xác nhận
            </Button>
        );
    };

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
        setImgSelected(imgSelect);
    }, [imgSelect, isVisible]);

    return (
        <div>
            <Button onClick={toggleDialog}>{label}</Button>

            <Dialog
                header={label}
                visible={isVisible}
                style={{ width: '75vw' }}
                onHide={toggleDialog}
                footer={renderFooter()}
            >
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
                <div className='grid grid-cols-4 gap-3'>
                    {files?.data.map((file: any) => {
                        return (
                            <div
                                onClick={() => {
                                    setImgSelected(file.fileName);
                                }}
                                key={file.id}
                                className='relative h-[200px] w-full cursor-pointer rounded-md bg-cover duration-100 ease-in hover:opacity-80'
                                style={{
                                    backgroundImage: `url(${
                                        `${
                                            import.meta.env.VITE_API_URL
                                        }/images/` + file.fileName
                                    })`,
                                }}
                            >
                                <div className='absolute right-2'>
                                    <RadioButton
                                        inputId='city1'
                                        name='city'
                                        value={file.fileName}
                                        onChange={(e) =>
                                            setImgSelected(e.value)
                                        }
                                        checked={imgSelected === file.fileName}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Dialog>
        </div>
    );
};

export default SelectImage;
