import apiService from "../../utils/apiService";



export const getAllSubscriptions=()=>apiService.get(`/api/v1/subscriptions`);