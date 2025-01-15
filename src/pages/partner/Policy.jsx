import React, { useState } from "react";
import { Card, List, Button, Typography, Input } from "antd";
import { FilePdfOutlined, EyeOutlined } from "@ant-design/icons";


// Personal Loan pdf 
import UNITYSFBPersonalLoan from "../../assets/policy/persoanlLoan/UNITYSFBPersonalLoan.pdf"
import TataCapitalPersonalLoan from "../../assets/policy/persoanlLoan/TataCapitalPersonalLoan.pdf"
import StuCredPersonalLoan from "../../assets/policy/persoanlLoan/StuCredPersonalLoan.pdf"
import SmartCoinPersonalLoan from "../../assets/policy/persoanlLoan/SmartCoinPersonalLoan.pdf"
import RUPEE112PersonalLoan from "../../assets/policy/persoanlLoan/RUPEE112PersonalLoan.pdf"
import RamFincorpDigitalPersonalLoan from "../../assets/policy/persoanlLoan/RamFincorpDigitalPersonalLoan.pdf"
import PrivoInstantLoan from "../../assets/policy/persoanlLoan/PrivoInstantLoan.pdf"
import PrefrInstantLoan from "../../assets/policy/persoanlLoan/PrefrInstantLoan.pdf"
import PoonawallaFincorpInstantPersonalLoan from "../../assets/policy/persoanlLoan/PoonawallaFincorpInstantPersonalLoan.pdf"
import PiramalFinanceInstantPersonalLoan from "../../assets/policy/persoanlLoan/PiramalFinanceInstantPersonalLoan.pdf"
import mPokketInstantLoan from "../../assets/policy/persoanlLoan/mPokketInstantLoan.pdf"
import MoneyViewPersonalLoan from "../../assets/policy/persoanlLoan/MoneyViewPersonalLoan.pdf"
import lendingplateInstantPersonalLoan from "../../assets/policy/persoanlLoan/lendingplateInstantPersonalLoan.pdf"
import KreditBeeInstantLoan from "../../assets/policy/persoanlLoan/KreditBeeInstantLoan.pdf"
import KotakMahindraBankPersonalLoan from "../../assets/policy/persoanlLoan/KotakMahindraBankPersonalLoan.pdf"
import KisshtPersonalLoan from "../../assets/policy/persoanlLoan/KisshtPersonalLoan.pdf"
import InstaMoneyPersonalLoan from "../../assets/policy/persoanlLoan/InstaMoneyPersonalLoan.pdf"
import IndusIndBankPersonalLoan from "../../assets/policy/persoanlLoan/IndusIndBankPersonalLoan.pdf"
import IDFCPersonalLoan from "../../assets/policy/persoanlLoan/IDFCPersonalLoan.pdf"
import ICICIBankLoan from "../../assets/policy/persoanlLoan/ICICIBankLoan.pdf"
import HeroFincorpPersonalLoan from "../../assets/policy/persoanlLoan/HeroFincorpPersonalLoan.pdf"
import HDFCBankPersonalLoan from "../../assets/policy/persoanlLoan/HDFCBankPersonalLoan.pdf"
import FibeInstantLoan from "../../assets/policy/persoanlLoan/FibeInstantLoan.pdf"
import BajajFinservPersonalLoan from "../../assets/policy/persoanlLoan/BajajFinservPersonalLoan.pdf"
import AxisBankPersonalLoan from "../../assets/policy/persoanlLoan/AxisBankPersonalLoan.pdf"
import AspireLineofCredit from "../../assets/policy/persoanlLoan/AspireLineofCredit.pdf"
import AdityaBirlaCapitalPersonalLoan from "../../assets/policy/persoanlLoan/AdityaBirlaCapitalPersonalLoan.pdf"

// Credit Card PDFs
import AmericanExpressMembershipRewardCreditCard from "../../assets/policy/creditCard/AmericanExpressMembershipRewardCreditCard.pdf";
import AUSmallFinanceBankCreditCard from "../../assets/policy/creditCard/AUSmallFinanceBankCreditCard.pdf";
import AxisBankCreditCard from "../../assets/policy/creditCard/AxisBankCreditCard.pdf";
import AxisBankFlipkartCreditCard from "../../assets/policy/creditCard/AxisBankFlipkartCreditCard.pdf";
import BajajFinservEMINetworkCard from "../../assets/policy/creditCard/BajajFinservEMINetworkCard.pdf";
import BankofBarodaCreditCard from "../../assets/policy/creditCard/BankofBarodaCreditCard.pdf";
import CashbackSBICreditCard from "../../assets/policy/creditCard/CashbackSBICreditCard.pdf";
import EdgeCSBBankRuPayCreditCard from "../../assets/policy/creditCard/EdgeCSBBankRuPayCreditCard.pdf";
import HDFCBANKCREDITCARD from "../../assets/policy/creditCard/HDFCBANKCREDITCARD.pdf";
import HDFCFREEDOMBANKCREDITCARD from "../../assets/policy/creditCard/HDFCFREEDOMBANKCREDITCARD.pdf";
import HSBCCreditCards from "../../assets/policy/creditCard/HSBCCreditCards.pdf";
import IDFCFIRSTBankCreditCard from "../../assets/policy/creditCard/IDFCFIRSTBankCreditCard.pdf";
import IndusIndBankCreditCard from "../../assets/policy/creditCard/IndusIndBankCreditCard.pdf";
import LICAxisBankCreditCard from "../../assets/policy/creditCard/LICAxisBankCreditCard.pdf";
import SimplyCLICKSBICreditCard from "../../assets/policy/creditCard/SimplyCLICKSBICreditCard.pdf";
import SimplySAVESBICreditCard from "../../assets/policy/creditCard/SimplySAVESBICreditCard.pdf";
import SWIGGYHDFCBANKCREDITCARD from "../../assets/policy/creditCard/SWIGGYHDFCBANKCREDITCARD.pdf";
import YESBankPOPCLUBCreditCard from "../../assets/policy/creditCard/YESBankPOPCLUBCreditCard.pdf";
import YesBankRioRuPayCreditCards from "../../assets/policy/creditCard/YesBankRioRuPayCreditCards.pdf";


// Savings Account PDFs
import AirtelPaymentsSavingsAccount from "../../assets/policy/savingAc/AirtelPaymentsSavingsAccount.pdf";
import AxisBankAmazeSavingAccount from "../../assets/policy/savingAc/AxisBankAmazeSavingAccount.pdf";
import AxisBankEasyAccessDigitalSavingAccount from "../../assets/policy/savingAc/AxisBankEasyAccessDigitalSavingAccount.pdf";
import IndusDeliteZeroBalanceSavingsAccount from "../../assets/policy/savingAc/IndusDeliteZeroBalanceSavingsAccount.pdf";
import IndusIndBankINDIESavingsAccount from "../../assets/policy/savingAc/IndusIndBankINDIESavingsAccount.pdf";
import JupiterSavingsAccountPoweredByFederalBank from "../../assets/policy/savingAc/JupiterSavingsAccountPoweredByFederalBank.pdf";

import IIFLBusinessLoan from "../../assets/policy/bsLoan/IIFLBusinessLoan.pdf"
import LendingkartBusinessLoan from "../../assets/policy/bsLoan/LendingkartBusinessLoan.pdf"

const { Title } = Typography;
const { Search } = Input;


const Policy = () => {

    const [searchTerm, setSearchTerm] = useState("");
    



    const policies = [
      {
        category: "Personal Loan Policy",
        files: [
          { name: "UNITY SFB Personal Loan", link: UNITYSFBPersonalLoan },
          { name: "Tata Capital Personal Loan", link: TataCapitalPersonalLoan },
          { name: "StuCred Personal Loan", link: StuCredPersonalLoan },
          { name: "SmartCoin Personal Loan", link: SmartCoinPersonalLoan },
          { name: "RUPEE 112 Personal Loan", link: RUPEE112PersonalLoan },
          { name: "Ram Fincorp Digital Personal Loan", link: RamFincorpDigitalPersonalLoan },
          { name: "Privo Instant Loan", link: PrivoInstantLoan },
          { name: "Poonawalla Fincorp Instant Personal Loan", link: PoonawallaFincorpInstantPersonalLoan },
          { name: "PrefrInstantLoan ", link: PrefrInstantLoan },
          { name: "Piramal Finance Instant Personal Loan", link: PiramalFinanceInstantPersonalLoan },
          { name: "mPokket Instant Loan", link: mPokketInstantLoan },
          { name: "MoneyView Personal Loan", link: MoneyViewPersonalLoan },
          { name: "LendingPlate Instant Personal Loan", link: lendingplateInstantPersonalLoan },
          { name: "KreditBee Instant Loan", link: KreditBeeInstantLoan },
          { name: "Kotak Mahindra Bank Personal Loan", link: KotakMahindraBankPersonalLoan },
          { name: "Kissht Personal Loan", link: KisshtPersonalLoan },
          { name: "InstaMoney Personal Loan", link: InstaMoneyPersonalLoan },
          { name: "IndusInd Bank Personal Loan", link: IndusIndBankPersonalLoan },
          { name: "IDFC Personal Loan", link: IDFCPersonalLoan },
          { name: "ICICI Bank Loan", link: ICICIBankLoan },
          { name: "Hero Fincorp Personal Loan", link: HeroFincorpPersonalLoan },
          { name: "HDFC Bank Personal Loan", link: HDFCBankPersonalLoan },

          { name: "Fibe Instant Loan", link: FibeInstantLoan },
          { name: "Bajaj Finserv Persona Loan", link: BajajFinservPersonalLoan },
          { name: "Axis Bank Personal Loan", link: AxisBankPersonalLoan },

          { name: "Aspire Line of Credit", link: AspireLineofCredit },
          { name: "Aditya Birla Capital Personal Loan", link: AdityaBirlaCapitalPersonalLoan },
        ],
      },
      {
        category: "Credit Card Policy",
        files: [
          { name: "American Express Membership Rewards", link: AmericanExpressMembershipRewardCreditCard },
          { name: "AU Small Finance Bank Credit Card", link: AUSmallFinanceBankCreditCard },
          { name: "Axis Bank Credit Card", link: AxisBankCreditCard },
          { name: "Axis Bank Flipkart Credit Card", link: AxisBankFlipkartCreditCard },
          { name: "Bajaj Finserv EMI Network Card", link: BajajFinservEMINetworkCard },
          { name: "Bank of Baroda Credit Card", link: BankofBarodaCreditCard },
          { name: "Cashback SBI Credit Card", link: CashbackSBICreditCard },
          { name: "Edge CSB Bank RuPay Credit Card", link: EdgeCSBBankRuPayCreditCard },
          { name: "HDFC BANK CREDIT CARD", link: HDFCBANKCREDITCARD },
          { name: "HDFC FREEDOM BANK CREDIT CARD", link: HDFCFREEDOMBANKCREDITCARD },
          { name: "HSBC Credit Cards", link: HSBCCreditCards },
          { name: "IDFC FIRST Bank Credit Card", link: IDFCFIRSTBankCreditCard },
          { name: "IndusInd Bank Credit Card", link: IndusIndBankCreditCard },
          { name: "LIC Axis Bank Credit Card", link: LICAxisBankCreditCard },
          { name: "Simply CLICK SBI Credit Card", link: SimplyCLICKSBICreditCard },
          { name: "Simply SAVE SBI Credit Card", link: SimplySAVESBICreditCard },
          { name: "SWIGGY HDFC BANK CREDIT CARD", link: SWIGGYHDFCBANKCREDITCARD },
          { name: "YES Bank POP CLUB Credit Card", link: YESBankPOPCLUBCreditCard },
          { name: "Yes Bank Rio RuPay Credit Cards", link: YesBankRioRuPayCreditCards },
        ],
      },
  
      {
        category: "Savings Account Policy",
        files: [
          { name: "Airtel Payments Savings Account", link: AirtelPaymentsSavingsAccount },
          { name: "Axis Bank Amaze Saving Account", link: AxisBankAmazeSavingAccount },
          { name: "Axis Bank Easy Access Digital Saving Account", link: AxisBankEasyAccessDigitalSavingAccount },
          { name: "Indus Delite Zero Balance Savings Account", link: IndusDeliteZeroBalanceSavingsAccount },
          { name: "IndusInd Bank INDIE Savings Account", link: IndusIndBankINDIESavingsAccount },
          { name: "Jupiter Savings Account Powered By Federal Bank", link: JupiterSavingsAccountPoweredByFederalBank },
        ],
      },

     

      {
        category: "Business Loan Policy",
        files: [
          { name: "IIFL Business Loan", link: IIFLBusinessLoan },
          { name: "Lendingkart Business Loan", link: LendingkartBusinessLoan },
        ],
      },

     



      
      
    ];
  
    const handleViewPdf = (link) => {
      window.open(link, "_blank");
    };
        // Filtered policies based on search term
  const filteredPolicies = policies.map((policy) => ({
    ...policy,
    files: policy.files.filter((file) =>
      file.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter((policy) => policy.files.length > 0);
  
    return (
      <div className="px-6 py-6">
      

      <div className="flex flex-col sm:flex-row items-center justify-between">
      <h2 className="text-2xl font-semibold mb-6">Policies</h2>
        <Search
         size="large"
        placeholder="Search for a policy..."
        allowClear
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "20px", maxWidth: "400px" }}
      />
      </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
          {
            
           filteredPolicies.length >0 ? ( filteredPolicies.map((policy, index) => (
            <Card
              key={index}
              title={policy.category}
              className="shadow-lg px-1"
             
            >
              <List
                itemLayout="horizontal"
                dataSource={policy.files}
                renderItem={(file, idx) => (
                  <List.Item
                    actions={[
                      <Button
                        type="link"
                        icon={<EyeOutlined />}
                        onClick={() => handleViewPdf(file.link)}
                      >
                        View
                      </Button>,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<FilePdfOutlined style={{ fontSize: "1.5rem", color: "red" }} />}
                      title={
                        <span>
                          <strong>{idx + 1}. </strong>
                          {file.name}
                        </span>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
          ))) : (   <Typography.Text type="secondary">No policies found.</Typography.Text>)
          }
        </div>
      </div>
    );
  };
  
  export default Policy;
