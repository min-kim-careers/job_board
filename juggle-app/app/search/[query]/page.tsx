'use client';

import JobBoard from '@/components/job-board';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const SearchResults = () => {
    const searchParams = useSearchParams();

    useEffect(() => {
        console.log(searchParams.get('something'));
    }, [searchParams]);

    return <JobBoard />;
};

export default SearchResults;
