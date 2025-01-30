import apiService from "../../utils/apiService";



export const getAllSubscriptions=()=>apiService.get(`/api/v1/subscriptions`);

export const contactDetails=(payload)=>apiService.post(`/api/v1/contact-us`, payload);