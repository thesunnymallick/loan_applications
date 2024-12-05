import apiService from "../../utils/apiService";


export const getLoanStatus=()=>apiService.get(`/api/v1/admin/loan-type`);

export const addLoanStatus=(payload)=>apiService.post(`/api/v1/admin/loan-type`,payload);

export const getAllServices=()=>apiService.get(`/api/v1/admin/services`);

export const servicesAdd=(payload)=>apiService.post(`/api/v1/admin/add_services`, payload);