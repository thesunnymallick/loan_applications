import apiService from "../../utils/apiService";


export const addClient=(payload)=>apiService.post(`/api/v1/user/partner/add_taxation_details`, payload);

export const addPlaceOrder=(payload)=>apiService.post(`/api/v1/user/partner/placeorder`, payload);

export const getAllClient=()=>apiService.get(`/api/v1/user/partner/taxtation_user_list`)