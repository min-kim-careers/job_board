import { JobResponse } from '@/api/job/types/job-response';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/shadcn/components/ui/card';

const JobCard = ({ job }: { job: JobResponse }) => {
    return (
        <Card className='delay-15 flex transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-slate-300'>
            <div className='flex-1'>
                <CardHeader>
                    <CardTitle>{job.title}</CardTitle>
                    <CardDescription>
                        {job.contractTime?.replace('_', ' ')} {job.contractType}
                    </CardDescription>
                </CardHeader>
                <CardContent>{job.description}</CardContent>
                <CardFooter>{/* <p>Card Footer</p> */}</CardFooter>
            </div>
            <div className='m-5 flex-[0.5]'>
                {/* <Card className='h-full w-full' /> */}
            </div>
        </Card>
    );
};

export default JobCard;
