import apiService from "../../utils/apiService";


export const roleAssign=(payload)=>apiService.post(`/api/v1/admin/set_role`, payload);

export const getAllRoles=()=>apiService.get(`/api/v1/admin/show_role`);

export const checkPasswordRole=(id)=>apiService.get(`/api/v1/admin/${id}/showPassword`);

export const getRoleInfo=(id)=>apiService.get(`/api/v1/admin/edit_role/${id}`)

export const roleAssignUpdate=(id, payload)=>apiService.post(`/api/v1/admin/update_role/${id}`,payload)