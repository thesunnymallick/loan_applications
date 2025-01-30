import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import logo from "../../assets/logo/logo1.png";
import signature from "../../assets/signature.png"
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
  },
  logoContainer: {
    textAlign: "center",
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 50,
    marginBottom: 10,
    objectFit: "contain",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "black",
  },
  subHeader: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  table: {
    display: "table",
    width: "100%",
    borderWidth: 1,
    borderColor: "#000",
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
  },
  headerCell: {
    flexGrow: 1,
    borderWidth: 1,
    padding: 5,
    textAlign: "center",
    fontSize: 12,
    backgroundColor: "#00A300",
    fontWeight: "bold",
    color: "white",
  },
  cell: {
    flexGrow: 1,
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
    textAlign: "center",
    fontSize: 12,
  },
  section: {
    marginBottom: 10,
    lineHeight: 1.5,
  },
  bold: {
    fontWeight: "bold",
    color: "black",
  },

  signatureSection: {
    marginTop: 20,
  },
  signatureImage: {
    width: 150,
    height: 50, // Adjust based on the signature image dimensions
    marginTop: 10,
  },
});

const AgreementPDF = ({aggrementDetails}) => {



const YOUR_COMPANY_NAME = aggrementDetails?.YOUR_COMPANY_NAME;
const TODAY_DATE = aggrementDetails?.TODAY_DATE
const BRAND_NAME = aggrementDetails?.BRAND_NAME
const PARTNER_NAME = aggrementDetails?.PARTNER_NAME
const PARTNER_ID = aggrementDetails?.PARTNER_ID 
const PARTNER_AADHAR_NUMBER =aggrementDetails?.PARTNER_AADHAR_NUMBER
const PARTNER_PAN_NUMBER = aggrementDetails?.PARTNER_PAN_NUMBER
const COMPANY_ADDRESS = aggrementDetails?.COMPANY_ADDRESS
const CUSTOMER_ADDRESS =aggrementDetails?.CUSTOMER_ADDRESS
const DIRECTOR_NAME = aggrementDetails?.DIRECTOR_NAME
const COMPANY_EMAIL = aggrementDetails?.COMPANY_EMAIL
    return(
<Document>
      {/* First Page */}
      <Page size="A4" style={styles.page}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} src={logo} />
        </View>
        <Text style={styles.header}>AGREEMENT</Text>
        <Text style={styles.subHeader}>COMPANY NAME: {YOUR_COMPANY_NAME}</Text>
        <Text style={styles.subHeader}>This agreement signed for PARTNER</Text>

        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={styles.headerCell}>Partner Name</Text>
            <Text style={styles.headerCell}>ID No.</Text>
            <Text style={styles.headerCell}>Aadhar Number</Text>
            <Text style={styles.headerCell}>PAN Number</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>{PARTNER_NAME}</Text>
            <Text style={styles.cell}>{PARTNER_ID}</Text>
            <Text style={styles.cell}>{PARTNER_AADHAR_NUMBER}</Text>
            <Text style={styles.cell}>{PARTNER_PAN_NUMBER}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text>{YOUR_COMPANY_NAME}</Text>
          <Text>SERVICES WILL BE PROVIDED BY {YOUR_COMPANY_NAME}</Text>
          <Text>PAYMENT NON REFUNDABLE</Text>
          <Text>PARTNER ONLY PAYS THE SOFTWARE COST. DSA IS TOTALLY FREE.</Text>
        </View>

        <Text style={styles.header}>Business Partnership Agreement</Text>
        <Text style={styles.section}>
          This Agreement is entered into on a new path towards our business and
          financial development and is effective from {TODAY_DATE} between{" "}
          {YOUR_COMPANY_NAME}({BRAND_NAME}), and {PARTNER_NAME}, with its
          principal place of business at {COMPANY_ADDRESS} , and {PARTNER_NAME},{" "}
          {YOUR_COMPANY_NAME} ({BRAND_NAME}), with its principal place of
          business at.{CUSTOMER_ADDRESS}
        </Text>
        <Text style={styles.subHeader}>OBJECTIVE:</Text>
        <Text style={styles.section}>
          {YOUR_COMPANY_NAME} ({BRAND_NAME}) and {PARTNER_NAME} have a mutual
          interest and objective of facilitating business growth through
          collaboration. It is envisaged that the two entities will work
          together towards achieving this goal, as outlined.
        </Text>

        <Text style={styles.subHeader}>Purpose of Partnership</Text>
        <Text style={styles.section}>
          The involved parties have reached an agreement to establish a
          collaborative effort aimed atdeveloping a robust presence within the
          Indian financial market, by providing a suite of financialservices
          including loans, insurance, credit cards, and other pertinent
          services. (except group loans)
        </Text>
      </Page>

      {/* Second Page */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>NON-DISCLOSURE AGREEMENT</Text>
        <Text style={styles.section}>
          1.The term "Confidential and or proprietary Information" encompasses
          any kind of information that {YOUR_COMPANY_NAME} has disclosed to its
          partner,either directly or indirectly. Such information could be in
          the form of written materials, verbal communication, inspection of
          physical objects such as documents, prototypes, samples, media,
          code,or any other tangible forms. This includes trade secrets, network
          information, configurations,trademarks, brand names, know-how,
          business and marketing plans, financial and operational information,
          as well as any other non-public information related to current and/or
          future marketing plans and financial and operational analysis. The
          Confidential Information may comprise compilations,studies, summaries,
          extracts, or other documentation prepared by {YOUR_COMPANY_NAME} (
          {BRAND_NAME}).The partner cannot disclose to any person, entity,
          organization or take any actions that compromise business
          confidentiality.
        </Text>
        <Text style={styles.section}>
          2. The recipient partner is obligated to maintain the utmost
          confidentiality and refrain from disclosing,reproducing, summarizing,
          and/or distributing any confidential materials or information
          belonging to {YOUR_COMPANY_NAME} ({BRAND_NAME}), except in connection
          with The proposed Transaction. It is the responsibility of the
          recipient partner to ensure that all confidential materials and
          information are safeguarded and not shared with any unauthorized third
          party. Any violation of this confidentiality agreement may result in
          legal action against the party responsible for the breach.
        </Text>
        <Text style={styles.section}>
          3. The information deemed Confidential, as defined in this Agreement,
          shall not extend to any information that the Receiving Party can
          demonstrate to be: i) publicly available or otherwise in the public
          domain, except where such information is disclosed in contravention of
          this Agreement or due to the Receiving Partner's fault.Before
          receiving the aforementioned information from the Disclosing Partner,
          the recipient partner must ensure that said information is not subject
          to any restrictions. The recipient must ensure that they take
          possession of the information free of any such restrictions, thereby
          ensuring compliance with any applicable regulations or legal
          requirements.Partners are strictly prohibited from disclosing any
          internal strategies, information, or exclusive plans,shared by{" "}
          {YOUR_COMPANY_NAME} (BRAND_NAME) through written or verbal mediums,
          except for publicly available information and data. Prior
          authorization must be obtained before any disclosure of internal
          information. This measure is in place to safeguard the confidentiality
          of {YOUR_COMPANY_NAME}({BRAND_NAME}) proprietary information and to
          prevent any unauthorized use or dissemination of such information by
          any third-party. We take the security of our internal information very
          seriously and expect our partners to adhere to this policy strictly to
          maintain a mutually beneficial relationship.
        </Text>

        <Text style={styles.header}>
          COMPANY'S OBLIGATIONS AND PARTICULARS OF TRANSACTION
        </Text>
        <Text style={styles.section}>
          <Text style={styles.bold}>The Company shall ensure that </Text>
          The company agrees to share the list of "products and services" and
          their prices from time to time.The company reserves the right to
          modify the prices or discontinue any product or service at anytime.The
          Partner will receive a commission from the Company upon disbursement
          of their file on their wallet. Company has committed to resolving the
          payment issue with the Associate in a timely and amicable manner. As
          per the agreement, the Company will endeavor to settle the payment
          within 30(thirty) days from the date of receiving the disputed
          invoice.In case of any sales refund processed within a particular
          month, the corresponding amount will not be included in the payment
          for that month. Instead, the refund amount will be adjusted in the
          subsequent month's payment cycle.
        </Text>

        <Text style={styles.header}>
          Partner's Obligations & Responsibilities
        </Text>
        <Text style={styles.section}>
          The Partner must refrain from making any statements that could
          potentially mislead or make falsepromises to end consumers.
          {YOUR_COMPANY_NAME}({BRAND_NAME}) does not guarantee any assured
          disbursement; it depends on the terms and policies of Banks and NBFCs.
          ● It should be noted that the Partner is not authorized to make any
          commitments to end consumers regarding guaranteed disbursement. It is
          important to clarify that {YOUR_COMPANY_NAME} ({BRAND_NAME}) will not
          be held accountable for any suchcommitments made by the Partner. ●
          While the majority of loan products offered by {YOUR_COMPANY_NAME} (
          {BRAND_NAME}) do not necessitate an upfront payment, it's important to
          note thats pecific loans like Loan Against Property (L.A.P.), Home
          Loans (H.L.), Micro, Small, and MediumEnterprises (MSME) loans, among
          others, may entail additional fees or charges. It is recommended
          tothoroughly review the terms and conditions associated with each loan
          product to ensure acomprehensive understanding of any potential fees
          that might be applicable. ● The Partner is expressly forbidden from
          collecting any advance charges from end consumerswithout obtaining
          prior explicit permission from {YOUR_COMPANY_NAME}. In the absence of
          such authorization, the Partner is strictly prohibited from initiating
          or accepting any form of advance fees or charges from individuals
          whoconstitute the end consumers in the context of their business
          dealings.
        </Text>
        <Text style={styles.header}>Commission</Text>
        <Text style={styles.section}>
          Compensation: The Company will compensate the Partner with a
          commission, the rate of which willbe communicated in writing, covering
          the entirety or a portion of the services outlined in thisagreement.
          This commission will be calculated based on the Maximum Disbursement,
          as establishedby the Company for each new and individual file. The
          commission amount is subject to applicabletaxes. The Company retains
          the right to adjust the commission rate periodically, and such
          revisionswill be communicated in writing to the Partner through any
          mode, whether verbal or written.
        </Text>

        <Text style={styles.header}>BASIS OF COMMISSION</Text>

        <Text style={styles.section}>
          1) As per the commission structure outlined in the partner's plan,
          they will be provided withcommission payments either monthly or
          instantly. Commission rates may change at any time.
        </Text>

        <Text style={styles.section}>
          (2) Kindly be advised that credit card commissions are subject to
          potential adjustments at any giventime, and these adjustments may vary
          based on the policies implemented by different bankinginstitutions..
        </Text>

        <Text style={styles.section}>
          (3) Please be informed that commission rates for loans are subject to
          change without prior notice, andmay vary depending on the policies of
          the lending institution, whether it is a bank or an NBFCcompany. We
          kindly request your understanding and cooperation in this matter, and
          we remaincommitted to providing you with the best service possible.
        </Text>

        <Text style={styles.section}>
          (4) The commission percentage for insurance is subject to variation,
          with the extent of such variationbeing contingent upon the specific
          type of insurance in question. In certain cases, this variance
          canreach up to 35 percent.
        </Text>

        <Text style={styles.header}>Verification</Text>
        <Text style={styles.section}>
          It is expected that the documents and leads produced by the PARTNER
          are genuine andhave been verified to the best of their knowledge. It
          is imperative that all documents, including KYC,are rigorously
          scrutinized and verified by the PARTNER. The authenticity of these
          documents must beestablished through an original examination.
        </Text>

        <Text style={styles.header}>
          COMPANY'S OBLIGATIONS AND PARTICULARS OF TRANSACTION
        </Text>
        <Text style={styles.section}>
          A Company shall ensure that a) The Company, in its commitment to
          transparency, willingly shares the comprehensive list of"products and
          services" alongside their respective prices. It is important to note
          that the Company,while reserving the right to modify prices, retains
          the flexibility to discontinue any product or service at its
          discretion, ensuring operational efficiency. b) In alignment with the
          commission structure articulated in the partner's plan, the Company
          pledge to credit commissions to the partner's wallet either monthly or
          instantly according to their plan. The Company, however, reserves the
          right to adjust commission rates without prior notice, providing the
          necessary flexibility to adapt to market dynamics. c)The Company
          agrees to pay commission to partners on completion of confirmed
          disbursement from the Bank & NBFC’s side as listed in their commission
          structure on their current plan. d) Partners upgrading their plans
          will be entitled to get their commissions under their upgraded plan
          from the moment of the upgrade, ensuring a seamless transition. e)
          Commissions from their previous monthly basis plans will be
          disbursement the following month. f) The Company hereby commits to
          expeditiously address and resolve any payment disputes arising from
          either human error or technical discrepancies, ensuring an equitable
          resolution with the Partner.In accordance with this commitment, the
          Company pledges to engage in a collaborative and timely manner to
          settle such disputes within a specified period of 30 (thirty) working
          days from the date on which the issue is formally raised by the
          partner. This approach underscores the Company's dedication to
          fostering a transparent and cooperative relationship with the Partner
          while upholding the highest standards of professionalism. g) Following
          the commission payout to the partner, any potential issues arising
          from the end consumer not fulfilling their loan EMI payment
          obligations will be promptly addressed. The Company will settle such
          amounts from the partner's subsequent commission payout. h) In
          adherence to the established plan, it is delineated that after the
          formal confirmation of bank disbursement, the disbursement payout will
          be released in strict accordance with the predetermined schedule
          articulated within the aforementioned plan. This procedural adherence
          ensures the systematic alignment of disbursement confirmation and
          subsequent payout, harmonizing with the strategic framework
          encapsulated in the overarching plan.
        </Text>

        <Text style={styles.header}> Confidentiality: </Text>
        <Text style={styles.section}>
          Both parties have mutually agreed to uphold the confidentiality of any
          proprietary or confidential information exchanged during this
          partnership. It is expected that all information shared will be
          treated with the utmost care and in strict compliance with any
          applicable laws and regulations. Any unauthorized use, disclosure, or
          sharing of such information may result in legal action or other
          appropriate measures. Therefore, both parties must take all necessary
          precautions to ensure the confidentiality and security of any
          sensitive information exchanged during this partnership.
        </Text>

        <Text style={styles.header}> Reserved Rights :</Text>
        <Text style={styles.section}>The Company asserts and upholds its exclusive rights to all
          intellectual property. Partners are granted limited access to the
          company's resources and are authorized to engage with end consumers to
          promote and protect the interests of both parties.</Text>
        <Text style={styles.section}>
           This includes but
          is not limited to, the use of trademarks, copyrights, patents, and
          trade secrets. The Company expects partners to act responsi blyand
          with integrity in their interactions with end consumers and to comply
          with all applicable laws and regulations governing intellectual
          property rights.
        </Text>

        <Text style={styles.header}>Property Rights & Reserved:</Text>
        <Text style={styles.section}>
          All intellectual property created by {YOUR_COMPANY_NAME} , including
          but not limited to software, applications, and other digital products,
          are owned solely by {YOUR_COMPANY_NAME} ({BRAND_NAME}). As a
          partnership partner, you are only authorized to use the products and
          services of {YOUR_COMPANY_NAME}({BRAND_NAME}) to conduct your business
          operations.Any unauthorized use or misuse of {YOUR_COMPANY_NAME}
          LTD({BRAND_NAME})’S products or services is strictly prohibited and
          may result in disciplinary action,penalties or even termination from
          the partnership. This includes but is not limited to
          copying,modifying, reverse engineering or distributing any{" "}
          {YOUR_COMPANY_NAME} ({BRAND_NAME}) product or service without prior
          written consent from {YOUR_COMPANY_NAME} ({BRAND_NAME}). It is
          important to note that {YOUR_COMPANY_NAME}({BRAND_NAME}) reserves the
          right totake legal action against any individual or entity found to
          violate these terms and conditions.
        </Text>

        <Text style={styles.header}> Governing Law:</Text>
        <Text style={styles.section}>
          This legal agreement is hereby stipulated to be governed by the
          jurisdiction of {YOUR_COMPANY_NAME}({BRAND_NAME}), with interpretation
          under the laws applicable within its jurisdiction. The parties
          entering into this agreement are expressly required to comply with and
          adhere to the rules, terms, and policies implemented by{" "}
          {YOUR_COMPANY_NAME}({BRAND_NAME}). It is imperative that the parties
          strictly refrain from any breach or violation of these provisions, as
          such actions are explicitly prohibited under the terms of this
          agreement. Failure to uphold these terms may result in legal
          consequences following the applicable laws and regulations of{" "}
          {YOUR_COMPANY_NAME}({BRAND_NAME})'s jurisdiction.
        </Text>

        <Text style={styles.header}>Dispute Resolution:</Text>

        <Text style={styles.section}>
          If conflicts arise stemming from any unlawful requests or activities,
          {YOUR_COMPANY_NAME} ({BRAND_NAME}) expressly reserves the right to
          address and resolve such matters through the established arbitration
          process, meticulously adhering to the regulations and procedures
          delineated by the organization. This commitment to arbitration
          signifies the organization's dedication to a fair and impartial
          dispute resolution mechanism, ensuring a judicious and equitable
          resolution to any disputes that may arise from illegitimate requests
          or activities. T his approach underscores
          {YOUR_COMPANY_NAME} ({BRAND_NAME})'s commitment to upholding the
          integrity of its operations and maintaining a structured and just
          framework for conflict resolution. agreement may be voided should the
          partner's actions prove detrimental to the company's interests.
        </Text>

        <Text style={styles.header}>Termination:</Text>
        <Text style={styles.section}>
          This may include misleading statements, unfulfilled promises, or
          unethical conduct to wardsend consumers or other entities.
          Additionally, failure to uphold professional standards and comply with
          the terms laid out in this agreement may also be considered grounds
          for termination. It is important to note that the company holds these
          matters in high regard and shall take appropriate action in response
          to such behavior.
        </Text>

        <Text style={styles.header}>Miscellaneous</Text>
        <Text style={styles.section}>
          {YOUR_COMPANY_NAME} ({BRAND_NAME}) cannot guarantee a definite
          disbursal of funds.IN WITNESS of whom, the parties hereto have
          executed this Business Partnership Agreement as of the Effective{" "}
          {TODAY_DATE}.
        </Text>
        <Text style={styles.section}>
          <Text style={styles.bold}>
            WELCOME TO THE FAMILY OF {YOUR_COMPANY_NAME} ({BRAND_NAME})
          </Text>
        </Text>
        <Text style={styles.section}>
          {YOUR_COMPANY_NAME} ({BRAND_NAME}){" "}
        </Text>
        <Text style={styles.section}>DIRECTOR MR. {DIRECTOR_NAME} </Text>
        <Text style={styles.section}>E-MAIL - {COMPANY_EMAIL}</Text>

        <View style={styles.signatureSection}>
          <Text style={styles.bold}>
            {YOUR_COMPANY_NAME}
          </Text>
          <Image style={styles.signatureImage} src={signature} />
          <Text>___________________________</Text>
          <Text style={{fontSize:"12px", margin:"5px 0px"}}>{DIRECTOR_NAME}</Text>
          <Text style={{fontSize:"10px",}}>(DIRECTOR)</Text>
        </View>
  
      </Page>
    </Document>
    )
 
  }

export default AgreementPDF;
