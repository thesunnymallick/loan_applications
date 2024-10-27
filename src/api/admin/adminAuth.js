import apiService from "../../utils/apiService";


export const adminLogin=(payload)=>apiService.post(`/api/login-admin`, payload)