import apiService from "../../utils/apiService";

export const partnerLogin=(payload)=>apiService.post(`/api/v1/partner/login`, payload);

export const partneIrnterestApply=(payload)=>apiService.post(`/api/v1/register-interest`, payload)