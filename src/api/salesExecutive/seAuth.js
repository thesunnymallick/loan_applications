import apiService from "../../utils/apiService";


export const salesExecutiveLogin=(payload)=>apiService.post(`/api/v1/sales-executive-login`, payload)