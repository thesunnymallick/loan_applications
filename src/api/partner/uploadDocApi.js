import apiService from "../../utils/apiService";




export const uploadBankDetails=(payload)=>apiService.post(`/api/v1/partner/bank_details`, payload);
export const uploadPartnerDoc=(payload)=>apiService.post(`/api/v1/partner/document_upload`, payload);
export const removePartnerDoc=(payload)=>apiService.post(`/api/v1/partner/remove_documents`, payload)
export const getDocumentInfo=()=>apiService.get(`/api/v1/partner/document_edit`);

export  const accpectAgrement=(payload)=>apiService.post(`/api/v1/partner/update_agreement`, payload)

export  const getAgrementDetails=()=>apiService.get(`/api/v1/partner/agreement`);

export const getCertificateDetails=()=>apiService.get(`/api/v1/partner/certificate`)