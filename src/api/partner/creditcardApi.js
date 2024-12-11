import apiService from "../../utils/apiService";


export const applyCreditCard=(payload)=>apiService.post(`/api/v1/user/partner/store/credit-cards`, payload);

export const getAllCreditCards=()=>apiService.get(`/api/v1/user/partner/credit-cards`);

export const uploadCreditCardDoc=(fileNo, payload)=>apiService.post(`/api/v1/credit_card/${fileNo}/upload-documents`, payload)

