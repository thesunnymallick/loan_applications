import apiService from "../../utils/apiService";

export const getAllPolice=()=>apiService.get(`/api/v1/admin/policy`);