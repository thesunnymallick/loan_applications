import apiService from "../../utils/apiService"




export const newPartnerCreate=(payload)=>apiService.post(`/api/v1/partner/register`, payload);
export const partnerSendOTP=(payload)=>apiService.post(`/api/v1/partner/sent_otp`, payload);
export const partnerOTPVerify=(payload)=>apiService.post(`/api/v1/partner/verify-otp`, payload);

export const getAllMembers=()=>apiService.get(`/api/v1/partner`);
export const getAllSubscription=()=>apiService.get(`/api/v1/subscriptions`);