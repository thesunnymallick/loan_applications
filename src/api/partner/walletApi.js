import apiService from "../../utils/apiService";


export const withDrawalRequest=(payload)=>apiService.post(`/api/v1/partner/withdrawal-request`, payload);


export const getAllTransaction=()=>apiService.get(`/api/v1/partner/transaction_records`);

export const getWalletBalance=()=>apiService.get(`/api/v1/partner/wallet_balance`)