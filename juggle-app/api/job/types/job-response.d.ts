export interface PaginationResponse {
    page: number;
    limit: number;
    totalCount: number;
}

export interface JobResponse {
    title?: string;         // Optional and max length 255
    description?: string;   // Optional and max length 1000
    company?: string;       // Optional and max length 255
    location?: string;      // Optional and max length 255
    contractType?: string; // Optional and max length 50
    contractTime?: string; // Optional and max length 50
    category?: string;      // Optional and max length 100
    url?: string;           // Optional and max length 500
    latitude?: number;      // Optional
    longitude?: number;     // Optional
    createdAt?: Date;      // Optional
    expiresAt?: Date;      // Optional
    salaryMax?: number;    // Optional
    salaryMin?: number;    // Optional
    source?: string;        // Optional and max length 50
}
