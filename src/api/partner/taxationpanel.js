import apiService from "../../utils/apiService";


export const addClient=(payload)=>apiService.post(`/api/v1/user/partner/add_taxation_details`, payload)