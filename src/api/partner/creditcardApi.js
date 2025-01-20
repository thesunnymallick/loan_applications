import apiService from "../../utils/apiService";


export const applyCreditCard=(payload)=>apiService.post(`/api/v1/user/partner/store/credit-cards`, payload);

export const getAllCreditCards=(params)=>{
    const queryString = new URLSearchParams(params).toString();
    return apiService.get(`/api/v1/user/partner/credit-cards?${queryString}`)
};

export const uploadCreditCardDoc=(fileNo, payload)=>apiService.post(`/api/v1/credit_card/${fileNo}/upload-documents`, payload);

export const getCreditCardCustomerDetails=(fileNo)=>apiService.get(`/api/v1/user/partner/${fileNo}/get_customer_details_credit_card`)

export const getcreditCardCount=()=>apiService.get(`/api/v1/user/partner/credit_card_count`)