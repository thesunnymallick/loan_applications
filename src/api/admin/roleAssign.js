import apiService from "../../utils/apiService";


export const roleAssign=(payload)=>apiService.post(`/api/v1/admin/set_role`, payload);

export const getAllRoles=()=>apiService.get(`/api/v1/admin/show_role`);