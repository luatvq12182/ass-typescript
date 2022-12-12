import React, { useState } from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';

type LoadingContextType = {
    showLoading: VoidFunction;
    hideLoading: VoidFunction;
};

const LoadingContext = React.createContext<LoadingContextType>(null!);

type Props = {
    children: React.ReactNode;
};

const LoadingProvider = ({ children }: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const showLoading = () => setIsLoading(true);
    const hideLoading = () => setIsLoading(false);

    return (
        <LoadingContext.Provider value={{ showLoading, hideLoading }}>
            <div
                className={`fixed top-0 z-40 ${
                    isLoading ? 'flex' : 'hidden'
                } h-full w-full items-center justify-center bg-white/80`}
            >
                <ProgressSpinner
                    className='z-50'
                    style={{ width: '65px', height: '65px' }}
                    strokeWidth='4'
                    fill='var(--surface-ground)'
                    animationDuration='.8s'
                />
            </div>

            {children}
        </LoadingContext.Provider>
    );
};

export default LoadingProvider;
