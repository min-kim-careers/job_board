import { FormControl, FormField, FormItem } from '@/shadcn/components/ui/form';
import { UseFormReturn } from 'react-hook-form';

import { Button } from '@/shadcn/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/shadcn/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/shadcn/components/ui/popover';
import { cn } from '@/shadcn/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FormData } from './schema';
import { Spinner } from '@/components/ui/spinner';

// const MISSING_OPTIONS = 'Missing options';

interface Option {
    label: string;
    value: string;
}

const MultipleSelectorField = ({
    form,
    options: _options,
    defaultOption: _defaultOption,
    name,
}: {
    form: UseFormReturn<FormData>;
    options: string[];
    defaultOption: string;
    name: keyof FormData;
}) => {
    const [options, setOptions] = useState<Option[]>([]);
    const [selected, setSelected] = useState<boolean[]>([]);
    const [defaultIndex, setDefaultIndex] = useState<number>(0);

    useEffect(() => {
        const selected: boolean[] = [];
        setOptions(
            _options.map((o, i) => {
                const option = {
                    label: o,
                    value: o,
                };
                if (o === _defaultOption) {
                    selected.push(true);
                    setDefaultIndex(i);
                } else {
                    selected.push(false);
                }
                return option;
            }),
        );
        setSelected(selected);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_options]);

    const handleSelect = (index: number) => {
        if (index === defaultIndex && !selected[defaultIndex]) {
            setSelected((prev) => prev.map((_, i) => i === defaultIndex));
        } else if (index !== defaultIndex) {
            let trueCount = 0;
            const newSelected = selected.map((s, i) => {
                let res = false;
                if (i === defaultIndex) {
                    res = false;
                } else if (i === index) {
                    res = !selected[index];
                } else {
                    res = s;
                }
                trueCount += res ? 1 : 0;
                return res;
            });
            if (trueCount === 0) {
                setSelected((prev) => prev.map((_, i) => i === defaultIndex));
            } else {
                setSelected(newSelected);
            }
        }
    };

    const buttonLabel = selected[defaultIndex]
        ? _defaultOption
        : `${selected.filter((s) => s).length} ${name}`;

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className='flex flex-col'>
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant='outline'
                                    role='combobox'
                                    className={cn(
                                        'justify-between p-3',
                                        !field.value && 'text-muted-foreground',
                                    )}
                                >
                                    {options.length === 0 ? (
                                        <span className='flex w-full justify-center'>
                                            <Spinner size='small' className='opacity-25' />
                                        </span>
                                    ) : (
                                        buttonLabel
                                    )}
                                    <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className='w-[200px] p-0'>
                            <Command>
                                <CommandInput placeholder={`Search...`} />
                                <CommandList>
                                    <CommandEmpty>
                                        No options found.
                                    </CommandEmpty>
                                    <CommandGroup>
                                        {options.map((option, index) => (
                                            <CommandItem
                                                value={option.label}
                                                key={option.value}
                                                onSelect={() =>
                                                    handleSelect(index)
                                                }
                                            >
                                                <Check
                                                    className={cn(
                                                        'mr-2 h-4 w-4',
                                                        selected[index]
                                                            ? 'opacity-100'
                                                            : 'opacity-0',
                                                    )}
                                                />
                                                <span className='w-full'>
                                                    {option.label}
                                                </span>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </FormItem>
            )}
        />
    );
};

export default MultipleSelectorField;
