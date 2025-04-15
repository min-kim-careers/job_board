export interface PaginationQuery {
    page?: number;
    limit?: number;
}

export interface JobQuery {
    pagination?: PaginationQuery;
    title?: string;
    company?: string;
    location?: string;
    contractType?: string;
    contractTime?: string;
    category?: string;
    salaryMax?: string;
    salaryMin?: string;
    source?: string;
}
