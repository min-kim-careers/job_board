import useJobStore from '@/stores/use-job-store';
import Loading from '../ui/loading';
import JobCard from './components/job-card';
import PaginationCard from './components/pagination-card';

const JobBoard = () => {
    const { jobs, pagination } = useJobStore();

    if (!jobs.length) return <Loading>Getting Jobs</Loading>;

    return (
        <div className='flex flex-col items-center justify-center gap-5 pb-10 pt-5 sm:px-20 md:px-48'>
            <div className='flex w-full items-center justify-between text-sm text-gray-500'>
                <span>{pagination.totalCount} jobs found</span>
                <span>
                    {`Page ${pagination.page} out of ${Math.ceil(pagination.totalCount / pagination.limit)}`}
                </span>
            </div>
            {jobs.map((job, i) => (
                <JobCard key={i} job={job} />
            ))}
            <PaginationCard />
        </div>
    );
};

export default JobBoard;
