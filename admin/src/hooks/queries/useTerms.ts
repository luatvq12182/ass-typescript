import { useQuery } from 'react-query';
import { TermService } from '../../services';

const useTerms = () => {
    return useQuery(['terms'], TermService.getTerms, {
        refetchOnMount: false,
        refetchOnReconnect: true,
        refetchOnWindowFocus: false,
    });
};

export default useTerms;
