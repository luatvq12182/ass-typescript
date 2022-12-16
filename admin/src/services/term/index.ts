import { Term } from '../../interfaces';
import { http } from '../http';

const TERM = '/terms';

const TermService = {
    getTerms: () => {
        return http.get(TERM);
    },
    createTerm: (data: Term) => {
        return http.post(TERM, data);
    },
    updateTerm: (data: Term) => {
        return http.put(TERM + '/' + data.id, data);
    },
    updateMenu: (data: Term[]) => {
        return http.put(TERM + '/update-menu', data);
    },
    deleteTerm: (id: number) => {
        return http.delete(TERM + '/' + id);
    },
};

export default TermService;
