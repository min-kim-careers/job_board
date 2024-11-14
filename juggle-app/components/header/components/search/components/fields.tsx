import { FormControl, FormField, FormItem } from '@/shadcn/components/ui/form';
import { Input } from '@/shadcn/components/ui/input';
import { UseFormReturn } from 'react-hook-form';

import { DEFAULT_OPTIONS } from '@/constants/options';
import MultipleSelectorField from './multiple-selector-field';
import { FormData } from './schema';

export const Title = ({ form }: { form: UseFormReturn<FormData> }) => (
    <FormField
        control={form.control}
        name='title'
        render={({ field }) => (
            <FormItem>
                <FormControl>
                    <Input
                        placeholder='Job title...'
                        {...field}
                        className='bg-white'
                    />
                </FormControl>
            </FormItem>
        )}
    />
);

export const Location = ({ form }: { form: UseFormReturn<FormData> }) => (
    <FormField
        control={form.control}
        name='location'
        render={({ field }) => (
            <FormItem>
                <FormControl>
                    <Input
                        placeholder='Location...'
                        {...field}
                        className='bg-white'
                    />
                </FormControl>
            </FormItem>
        )}
    />
);

export const Category = ({
    form,
    options,
}: {
    form: UseFormReturn<FormData>;
    options: string[];
}) => (
    <MultipleSelectorField
        form={form}
        defaultOption={DEFAULT_OPTIONS.category}
        options={options}
        name='category'
    />
);

export const Company = ({ form }: { form: UseFormReturn<FormData> }) => (
    <FormField
        control={form.control}
        name='company'
        render={({ field }) => (
            <FormItem>
                <FormControl>
                    <Input
                        placeholder='Company name...'
                        {...field}
                        className='bg-white'
                    />
                </FormControl>
            </FormItem>
        )}
    />
);

export const ContractType = ({
    form,
    options,
}: {
    form: UseFormReturn<FormData>;
    options: string[];
}) => (
    <MultipleSelectorField
        form={form}
        defaultOption={DEFAULT_OPTIONS.contractType}
        options={options}
        name='contractType'
    />
);

export const ContractTime = ({
    form,
    options,
}: {
    form: UseFormReturn<FormData>;
    options: string[];
}) => (
    <MultipleSelectorField
        form={form}
        defaultOption={DEFAULT_OPTIONS.contractTime}
        options={options}
        name='contractTime'
    />
);

export const Source = ({
    form,
    options,
}: {
    form: UseFormReturn<FormData>;
    options: string[];
}) => (
    <MultipleSelectorField
        form={form}
        defaultOption={DEFAULT_OPTIONS.source}
        options={options}
        name='source'
    />
);
