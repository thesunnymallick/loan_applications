import apiService from "../../utils/apiService";




export const uploadPartnerDoc=(payload)=>apiService.post(`/api/v1/partner/document_upload`, payload)