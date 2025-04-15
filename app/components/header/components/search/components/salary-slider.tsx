import { DualRangeSlider } from '@/shadcn/components/ui/expansions/dual-range-slider';
import { UseFormReturn } from 'react-hook-form';
import { FormData } from './schema';
import { useEffect, useState } from 'react';

const MIN_SALARY = 0;
const MAX_SALARY = 350000;
const STEP = 10000

const SalarySlider = ({ form }: { form: UseFormReturn<FormData> }) => {
    const [salary, setSalary] = useState<number[]>([MIN_SALARY, MAX_SALARY]);

    useEffect(() => {
        form.setValue(
            'salaryMin',
            salary[0] === MIN_SALARY ? undefined : salary[0].toString(),
        );
        form.setValue(
            'salaryMax',
            salary[1] === MAX_SALARY ? undefined : salary[1].toString(),
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, salary);

    return (
        <div className='w-full space-y-5 px-10'>
            <div className='flex w-full justify-between'>
                <span>Minimum Salary</span>
                <span>Maximum Salary</span>
            </div>
            <DualRangeSlider
                labelPosition='bottom'
                label={(value) => (
                    <span>
                        {value === MAX_SALARY ? `${MAX_SALARY}+` : value}
                    </span>
                )}
                value={salary}
                onValueChange={setSalary}
                min={MIN_SALARY}
                max={MAX_SALARY}
                step={STEP}
            />
        </div>
    );
};

export default SalarySlider;
