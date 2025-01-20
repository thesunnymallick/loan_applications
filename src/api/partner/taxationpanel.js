import apiService from "../../utils/apiService";

export const addClient = (payload) =>
  apiService.post(`/api/v1/user/partner/add_taxation_details`, payload);

export const addPlaceOrder = (payload) =>
  apiService.post(`/api/v1/user/partner/placeorder`, payload);

export const getAllClient = () =>
  apiService.get(`/api/v1/user/partner/taxtation_user_list`);



export const getAllOrders = (params) =>{
  const queryString = new URLSearchParams(params).toString();
  return apiService.get(`/api/v1/user/partner/all_orders?${queryString}`);
}


export const getTaxtationsDetails=(fileNo)=>apiService.get(`/api/v1/user/partner/${fileNo}/get_customer_details_taxation`);

export const uploadTaxDoc = (fileNo, payload) => apiService.post(`/api/v1/tax/${fileNo}/upload-documents`, payload);


export const taxtaionCount=()=>apiService.get(`/api/v1/tax/count_tax`)
