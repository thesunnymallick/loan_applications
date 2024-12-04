
import apiService from "../../utils/apiService";


export const changedPartnerAccountStatus=(userId,status)=>apiService.put(`/api/v1/admin/partner/${userId}/status`, status)

export const checkPartnerPassword=(userId)=>apiService.get(`/api/v1/partner/${userId}/showPassword`);

export const documentVerifyPartner=(userId, payload)=>apiService.put(`/api/v1/admin/partner/${userId}/verify_documents`, payload);

export const getPartnerInfo=(id)=>apiService.get(`/api/v1/about_partner/${id}`)

export const  getAllInterestUsers=()=>apiService.get(`/api/v1/admin/see_interest`)

export const partnerUpdate=(partnerId, payload)=>apiService.put(`/api/v1/partner/${partnerId}`, payload);

export const getALLRm=()=>apiService.get(`/api/v1/regional-managers`);

export const rmAssign=(uuid, payload)=>apiService.post(`/api/v1/partners/${uuid}/assign-regional-manager`, payload)