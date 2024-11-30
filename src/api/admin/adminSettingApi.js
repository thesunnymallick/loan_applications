import apiService from "../../utils/apiService";


export const getLoanStatus=()=>apiService.get(`/api/v1/admin/loan-type`);

export const addLoanStatus=(payload)=>apiService.post(`/api/v1/admin/loan-type`,payload);