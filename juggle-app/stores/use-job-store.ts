import { fetchJobs } from "@/api/job";
import { JobQuery } from "@/api/job/types/job-query";
import { JobResponse, PaginationResponse } from "@/api/job/types/job-response";
import { DEFAULT_PAGINATION } from "@/constants/pagination";
import { create } from 'zustand';
import { DEFAULT_OPTIONS } from "../constants/options";

const mapQuery = (query: JobQuery): JobQuery => {
    return Object.keys(query).reduce((acc, key) => {
        const k = key as keyof JobQuery;
        acc[k] = typeof query[k] === 'string' && Object.keys(DEFAULT_OPTIONS).includes(query[k]) ? undefined : query[k] as string;
        return acc;
    }, {} as JobQuery);
}

interface JobStore {
    jobs: JobResponse[];
    pagination: PaginationResponse;
    currentQuery: JobQuery;
    setJobs: (newJobs: JobResponse[]) => void;
    handleSearch: (query: JobQuery) => Promise<void>;
    goToPage: (newPage: number, newLimit: number) => Promise<void>;
}

const useJobStore = create<JobStore>((set, get) => ({
    jobs: [],
    pagination: DEFAULT_PAGINATION,
    currentQuery: {},

    setJobs: (newJobs: JobResponse[]) => set({ jobs: newJobs }),

    handleSearch: async (query: JobQuery) => {
        const mappedQuery = mapQuery(query);

        const { page, limit } = get().pagination;

        mappedQuery.pagination = { page: page, limit: limit };

        fetchJobs(mappedQuery)
            .then((response) => {
                set({
                    jobs: response.result as JobResponse[],
                    pagination: response.pagination
                })
                set({ currentQuery: mappedQuery })
            })
            .catch((err) => console.log(err));
    },

    goToPage: async (newPage: number) => {
        const { currentQuery } = get();

        const newJobQuery: JobQuery = {
            ...currentQuery,
            pagination: {
                ...currentQuery.pagination,
                page: newPage,
            }
        };

        fetchJobs(newJobQuery)
            .then((response) => {
                set({
                    jobs: response.result as JobResponse[],
                    pagination: response.pagination
                })
                set({ currentQuery: currentQuery })
            })
            .catch((err) => console.log(err));
    }
}))

export default useJobStore;