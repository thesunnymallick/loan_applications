import apiService from "../../utils/apiService";

export const  rmLogin=(payload)=>apiService.post(`/api/v1/login-rm`, payload);
