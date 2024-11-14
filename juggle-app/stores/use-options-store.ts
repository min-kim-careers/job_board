import { fetchOptions } from "@/api/job";
import { OptionsResponse } from "@/api/job/types/options-response";
import { DEFAULT_OPTIONS } from "@/constants/options";
import { create } from "zustand";

const mapOptions = (options: OptionsResponse): OptionsResponse => {
    return Object.keys(options).reduce((acc, key) => {
        const k = key as keyof OptionsResponse;
        acc[k] = [DEFAULT_OPTIONS[k], ...options[k] || []];
        return acc;
    }, {} as OptionsResponse);
}

interface OptionsStore {
    options: OptionsResponse | null;
    setOptions: (newOptions: OptionsResponse) => void;
    getOptions: () => Promise<void>
}

const useOptionsStore = create<OptionsStore>((set) => ({
    options: {},
    setOptions: (newOptions: OptionsResponse) => set({ options: newOptions }),

    getOptions: async () => {
        fetchOptions()
            .then((response) => set({ options: mapOptions(response.result as OptionsResponse) }))
            .catch((err) => console.error(err));
    }
}))

export default useOptionsStore;