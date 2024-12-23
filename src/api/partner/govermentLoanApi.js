import apiService from "../../utils/apiService";



export const applyGovermentLoan=(payload)=>apiService.post(`/api/v1/user/partner/store/government-loan`, payload);

export const uploadGovermentDoc=(fileNo, payload)=>apiService.post(`/api/v1/government-loan/${fileNo}/upload-documents`, payload);

export const getAllGovermentLoan=()=>apiService.get(`/api/v1/user/partner/government-loan`);
