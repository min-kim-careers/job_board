import { z } from 'zod';

export const formSchema = z.object({
    title: z.string().max(255).optional(),
    company: z.string().max(255).optional(),
    location: z.string().max(255).optional(),
    contractType: z.string().optional(),
    contractTime: z.string().optional(),
    category: z.string().optional(),
    salaryMax: z.string().optional(),
    salaryMin: z.string().optional(),
    source: z.string().optional(),
});

export type FormData = z.infer<typeof formSchema>;
