
import apiService from "../../utils/apiService";

export const partnerPanelAccess=()=>apiService.get(`/api/v1/partner/get_services`);
export const getAllPanel=()=>apiService.get(`/api/v1/panel`);


export const getAllInstantLoginBank=()=>apiService.get(`/api/v1/bank-details`);
export const getAllInstantLoginCreditBank=()=>apiService.get(`/api/v1/card-bank-details`)