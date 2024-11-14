'use client';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/shadcn/components/ui/accordion';
import { Button } from '@/shadcn/components/ui/button';
import { Form } from '@/shadcn/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import useJobStore from '@/stores/use-job-store';
import useOptionsStore from '@/stores/use-options-store';
import { useEffect } from 'react';
import {
    Category,
    Company,
    ContractTime,
    ContractType,
    Location,
    Source,
    Title,
} from './components/fields';
import { FormData, formSchema } from './components/schema';
import SalarySlider from './components/salary-slider';
import { DEFAULT_FORM } from '../../../../constants/form';
import { useRouter } from 'next/navigation';

const Search = () => {
    const router = useRouter();
    const { handleSearch } = useJobStore();
    const { options, getOptions } = useOptionsStore();

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: DEFAULT_FORM,
    });

    const onSubmit = (values: FormData): void => {
        // console.log('form values:', values);
        handleSearch(values);
        router.push(`/search/${JSON.stringify(values)}`);
    };

    useEffect(() => {
        getOptions();
    }, [getOptions]);

    useEffect(() => {
        // handleSearch(form.getValues());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='flex h-full items-center justify-center gap-2 bg-slate-300 pt-10'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='w-3/4'>
                    <Accordion type='single' collapsible>
                        <AccordionItem
                            value='advanced-search'
                            className='flex flex-col gap-2 border-0'
                        >
                            <div className='grid grid-cols-4 gap-2'>
                                <Title form={form} />
                                <Location form={form} />
                                <Category
                                    form={form}
                                    options={options?.category || []}
                                />
                                <Button type='submit'>Search</Button>
                            </div>
                            <AccordionContent>
                                <div className='grid grid-cols-4 gap-2'>
                                    <Company form={form} />
                                    <ContractType
                                        form={form}
                                        options={options?.contractType || []}
                                    />
                                    <ContractTime
                                        form={form}
                                        options={options?.contractTime || []}
                                    />
                                    <Source
                                        form={form}
                                        options={options?.source || []}
                                    />
                                    <div className='col-span-4 flex h-[80px] items-center justify-center'>
                                        <SalarySlider form={form} />
                                    </div>
                                </div>
                            </AccordionContent>
                            <AccordionTrigger className='flex justify-center' />
                        </AccordionItem>
                    </Accordion>
                </form>
            </Form>
        </div>
    );
};

export default Search;
