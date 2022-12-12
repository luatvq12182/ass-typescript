import { http } from '../http';

const FILE = '/files';

const FileService = {
    getFiles: () => {
        return http.get(FILE);
    },
    uploadFile: (formData: FormData) => {
        return http.postMultipart(FILE + '/upload', formData);
    },
    deleteFile: (id: number) => {
        return http.delete(FILE + '/' + id);
    },
};

export default FileService;
