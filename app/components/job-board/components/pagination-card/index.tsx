import { Card } from '@/shadcn/components/ui/card';
import {
    Pagination,
    PaginationContent,
    // PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/shadcn/components/ui/pagination';
import useJobStore from '@/stores/use-job-store';
import { useEffect, useState } from 'react';

// Should be an odd number
const PAGINATION_SIZE = 3;

const PAGINATION_MID = Math.ceil(PAGINATION_SIZE / 2);
const numArray = (start: number, length: number = PAGINATION_SIZE) =>
    Array.from({ length: length }, (_, i) => start + i);

const PaginationCard = () => {
    const { jobs, goToPage } = useJobStore();
    const { page, limit, totalCount } = useJobStore().pagination;

    const [pages, setPages] = useState<number[]>([]);

    const [hidePrevious, setHidePrevious] = useState<boolean>(false);
    const [hideNext, setHideNext] = useState<boolean>(false);

    useEffect(() => {
        const pageCount = Math.ceil(totalCount / limit);

        if (pageCount < PAGINATION_SIZE) {
            setPages(numArray(1, pageCount));
            return;
        }

        if (page <= PAGINATION_MID) {
            setPages(numArray(1));
        } else if (page > pageCount - PAGINATION_MID) {
            setPages(numArray(pageCount - PAGINATION_SIZE + 1));
        } else {
            setPages(numArray(page - Math.floor(PAGINATION_SIZE / 2)));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, jobs]);

    useEffect(() => {
        const pageCount = Math.ceil(totalCount / limit);

        setHidePrevious(pages.includes(1));
        setHideNext(pages.includes(pageCount));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pages]);

    const handlePrevious = () => {
        const targetPage = pages[0] - PAGINATION_SIZE + 1;
        goToPage(targetPage > 0 ? targetPage : 1, limit);
    };

    const handleNext = () => {
        const pageCount = Math.ceil(totalCount / limit);
        const targetPage = pages[0] + PAGINATION_SIZE + 1;
        goToPage(targetPage <= pageCount ? targetPage : pageCount, limit);
    };

    if (!pages.length) return;

    return (
        <div className='sticky bottom-0 mt-5 flex w-screen items-center justify-center pb-5'>
            <Card className='flex h-[50px] items-center justify-center px-3'>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                disabled={hidePrevious}
                                onClick={handlePrevious}
                                className='cursor-pointer'
                            >
                                Previous
                            </PaginationPrevious>
                        </PaginationItem>
                        {pages.map((i) => (
                            <PaginationItem key={i}>
                                {page === i ? (
                                    <PaginationLink isActive>
                                        {i}
                                    </PaginationLink>
                                ) : (
                                    <PaginationLink
                                        className='cursor-pointer'
                                        onClick={() => goToPage(i, limit)}
                                    >
                                        {i}
                                    </PaginationLink>
                                )}
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext
                                disabled={hideNext}
                                onClick={handleNext}
                                className='cursor-pointer'
                            >
                                Next
                            </PaginationNext>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </Card>
        </div>
    );
};

export default PaginationCard;
