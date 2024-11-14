import { ReactNode } from 'react';
import { Spinner } from '../ui/spinner';

const Loading = ({ children }: { children: ReactNode }) => {
    return (
        <div className='flex h-screen items-center justify-center'>
            <Spinner size='large'>{children}</Spinner>
        </div>
    );
};

export default Loading;
