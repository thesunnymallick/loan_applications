import apiService from "../../utils/apiService"


export const salesExDashboard=()=>apiService.get(`/api/v1/sales_executive/dashboard`);
export const salesExDashboardChart=()=>apiService.get(`/api/v1/sales_executive/graph`);