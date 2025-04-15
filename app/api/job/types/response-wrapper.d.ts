import { JobResponse } from "./job-response";
import { OptionsResponse } from "./options-response";

export interface ResponseWrapper {
    message: string;
    pagination: PaginationResponse;
    result: JobResponse[] | OptionsResponse;
}