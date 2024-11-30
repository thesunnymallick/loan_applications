import apiService from "../../utils/apiService";

export const getAllLoans = (params) => {
    const queryString = new URLSearchParams(params).toString();
    return apiService.get(`/api/v1/user/get_loan_details?${queryString}`);
  };

  export const loanStatusUpdate=(fileNo, paylaod)=>apiService.post(`/api/v1/${fileNo}/update_loan_status`, paylaod)