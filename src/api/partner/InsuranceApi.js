
import apiService from "../../utils/apiService";


export const applyInsurance=(payload)=>apiService.post(`/api/v1/user/partner/store/insurance-loan`, payload);

export const getAllInsurance=()=>apiService.get(`/api/v1/user/partner/insurance-loan`);

export const uploadInsuranceDoc=(fileNo, payload)=>apiService.post(`/api/v1/insurance-loan/${fileNo}/upload-documents`, payload)

