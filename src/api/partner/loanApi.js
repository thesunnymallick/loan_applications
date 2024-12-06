import apiService from "../../utils/apiService";


export const  addLoan=(payload)=>apiService.post(`/api/v1/partner/add_loan`, payload);

export const uploadDocForLoan=(fileNo, payload)=>apiService.post(`/api/v1/loans/${fileNo}/upload-documents`, payload);

export const getLoanDocInfo=(fileNo)=>apiService.get(`api/v1/user/get_loan_details/${fileNo}/documents`);// this url move in Rm api


export const getAllLoansPartner = (params) => {
    const queryString = new URLSearchParams(params).toString();
    return apiService.get(`/api/v1/user/partner/get_loan_details?${queryString}`);
  };


  export const getCustomerDetails=(fileNo)=>apiService.get(`/api/v1/user/partner/${fileNo}/get_customer_details`);


  export const getLoanCount=()=>apiService.get(`/api/v1/user/partner/loan_count`);




  export const getAllClient=()=>apiService.get(`/api/v1/user/partner/taxtation_user_list`)