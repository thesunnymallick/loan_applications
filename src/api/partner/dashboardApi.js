import apiService from "../../utils/apiService";

export const getDashboardInfo=()=>apiService.get(`/api/v1/partner/dashboard`,);

