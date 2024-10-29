import apiService from "../../utils/apiService";

export const partneIrnterestApply=(payload)=>apiService.post(`/api/register-interest`, payload)