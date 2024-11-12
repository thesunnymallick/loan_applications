import apiService from "../../utils/apiService";


export const getPartnerProfileInfo=()=>apiService.get(`/api/v1/partner/user_info`)