import apiService from "../../utils/apiService";


export const withDrawalRequest=(payload)=>apiService.post(`/api/v1/partner/withdrawal-request`, payload)