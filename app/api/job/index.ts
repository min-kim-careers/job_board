import { JobQuery } from "@/api/job/types/job-query";
import request from "@/util/request";
import { ResponseWrapper } from "./types/response-wrapper";
import { handleError } from "@/util/common-functions";



export const fetchJobs = async (query: JobQuery): Promise<ResponseWrapper> => {
    return await request.post('/jobs', query)
        .then((response) => response.data)
        .catch((error) => handleError(error));
}

export const fetchOptions = async (): Promise<ResponseWrapper> => {
    return await request.get('/jobs/options')
        .then((response) => response.data)
        .catch((error) => handleError(error));
}
