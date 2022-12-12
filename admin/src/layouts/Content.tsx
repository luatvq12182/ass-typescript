import React from 'react';

type Props = {
    children: React.ReactNode;
};

const Content = ({ children }: Props) => {
    return <div className='lg:ml-[265px] lg:mt-[70px] p-7'>{children}</div>;
};

export default Content;
