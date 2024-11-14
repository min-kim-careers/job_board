'use client';

// import { TrendingUp } from 'lucide-react';
import { Pie, PieChart } from 'recharts';

import Metrics from '@/api/metrics/types/metrics';
import { Card, CardContent } from '@/shadcn/components/ui/card';
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/shadcn/components/ui/chart';
import { useEffect } from 'react';

const chartConfig = {
    visitors: {
        label: 'Visitors',
    },
    chrome: {
        label: 'Chrome',
        color: 'hsl(var(--chart-1))',
    },
    safari: {
        label: 'Safari',
        color: 'hsl(var(--chart-2))',
    },
    firefox: {
        label: 'Firefox',
        color: 'hsl(var(--chart-3))',
    },
    edge: {
        label: 'Edge',
        color: 'hsl(var(--chart-4))',
    },
    other: {
        label: 'Other',
        color: 'hsl(var(--chart-5))',
    },
} satisfies ChartConfig;

const MetricsCard = ({ metrics }: { metrics: Metrics[] }) => {
    useEffect(() => {}, []);

    return (
        <ChartContainer
            config={chartConfig}
            className='mx-auto aspect-square max-h-[250px]'
        >
            <PieChart>
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                    data={metrics}
                    dataKey='visitors'
                    nameKey='browser'
                    innerRadius={60}
                />
            </PieChart>
        </ChartContainer>
    );
};

export default MetricsCard;
