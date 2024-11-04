import apiService from "../../utils/apiService";


export const adminLogin=(payload)=>apiService.post(`/api/v1/login-admin`, payload)