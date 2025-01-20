import apiService from "../../utils/apiService";



export const applyGovermentLoan=(payload)=>apiService.post(`/api/v1/user/partner/store/government-loan`, payload);

export const uploadGovermentDoc=(fileNo, payload)=>apiService.post(`/api/v1/government-loan/${fileNo}/upload-documents`, payload);

export const getAllGovermentLoan=(params)=>{
    const queryString = new URLSearchParams(params).toString();
  return apiService.get(`/api/v1/user/partner/government-loan?${queryString}`);
}
   

export const getGovermentCustomerDetails=(file_no)=>apiService.get(`/api/v1/user/partner/${file_no}/get_customer_details_government_loan`)
