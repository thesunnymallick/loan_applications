
import apiService from "../../utils/apiService";


export const applyInsurance=(payload)=>apiService.post(`/api/v1/user/partner/store/insurance-loan`, payload);

export const getAllInsurance=(params)=>{
    const queryString = new URLSearchParams(params).toString();
    return apiService.get(`/api/v1/user/partner/insurance-loan?${queryString}`)
    
};

export const uploadInsuranceDoc=(fileNo, payload)=>apiService.post(`/api/v1/insurance-loan/${fileNo}/upload-documents`, payload);




export const getInsuranceCount=()=>apiService.get(`/api/v1/user/partner/insurance_count`);


export const getInsurnceCustomerDetalis=(file_no)=>apiService.get(`/api/v1/user/partner/${file_no}/get_customer_details_insurance`);