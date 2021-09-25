import { Tooltip, Row, Col, Select } from "antd";

/**
 * customized columns
 */
const SeedTableColumnsConfigMap = {
  ACTION: {
    width: "12%",
    render: (value, row, index) => {
      return (
        <Row>
          <div>
            <Tooltip
              title={`Click to change status to INCLUDE to enroll the participant.`}
            >
              <button
                style={{
                  color: "white",
                  fontSize: "13px",
                  background: "#4287f5",
                  borderColor: "black",
                  height: "150%",
                }}
              >
                INCLUDE
              </button>
            </Tooltip>
            <Tooltip title={`Click to change status to EXCLUDE.`}>
              <button
                style={{
                  margin: "3px",
                  fontSize: "13px",
                  color: "white",
                  background: "#4287f5",
                  borderColor: "black",
                  height: "150%",
                }}
              >
                {" "}
                EXCLUDE
              </button>
            </Tooltip>
            <Tooltip
              title={`Click to change status to DEFER for future consideration.`}
            >
              <button
                style={{
                  color: "white",
                  fontSize: "13px",
                  background: "#4287f5",
                  borderColor: "black",
                  height: "150%",
                }}
              >
                {" "}
                DEFER
              </button>
            </Tooltip>
          </div>
        </Row>
      );
    },
  },
  STATUS: {
    width: "5%",
  },
  COUPON: {
    width: "10%",
  },
  MRN: {
    width: "7%",
  },
  EMAIL_ADDRESS: {
    width: "10%",
  },
  TEST_RESULT: {
    width: "7%",
  },
  RESULT_DATE: {
    width: "8%",
  },
  MOBILE_NUM: {
    width: "8%",
  },
  ZIP: {
    width: "4%",
  },
  HOME_NUM: {
    width: "8%",
  },
  PAT_AGE: {
    width: "6%",
  },
  PAT_SEX: {
    width: "5%",
  },
  ETHNIC_GROUP: {
    width: "8%",
  },
};

export const SeedTableColumnsToolTipsMap = {
  ACTION: "Click the button to change the status.",
  STATUS: "The enrollment status of the record.",
  EMAIL_ADDRESS: "Click the cell to edit the email address",
  MOBILE_NUM: "Click the cell to edit the mobile phone number",
  HOME_NUM: "Home phone number of the record",
  TEST_RESULT: "Click the cell to edit the test result of the record",
  RACE: "Race",
  PAT_AGE: "Age",
  PAT_SEX: "Gender",
  RESULT_DATE: "The date of the test result",
  MRN: "MRN of the record",
  ETHNIC_GROUP: "Ethnic group of the record",
  ZIP: "The zip code",
  LANGUAGE: "Preferred language to communicate",
  //  MYC_VIEWED_DTTM: "The result reviewed date.",
};

export const CohortTableColumnsToolTipsMap = {
  MRN: "Click the MRN value to see CRM records.",
};

export const TestScheduleTableColumnsToolTipsMap = {
  TEST_RESULT: "Click the cell to input the test result of the record",
  RESULT_DATE: "Click the cell to input the date of the test result",
  TEST_DATE: "Click the cell to input the date of the test",
  RESULT_NOTIFIED:
    "Click the cell to select if result has been notified to this record",
};

export const SeedTableColumnsConfig = [
  "ACTION",
  "STATUS",
  "MRN",
  "EMAIL_ADDRESS",
  "MOBILE_NUM",
  "ZIP",
  "TEST_RESULT",
  "RESULT_DATE",
  "HOME_NUM",
  "PAT_AGE",
  "PAT_SEX",
  "RACE",
  "ETHNIC_GROUP",
  "LANGUAGE",
  //  "MYC_VIEWED_DTTM",
].map((colStr) => {
  const col = {
    title: () => (
      <Tooltip title={`${SeedTableColumnsToolTipsMap[colStr]}`}>
        {colStr}
      </Tooltip>
    ),
    dataIndex: colStr,
    key: colStr,
    ...(SeedTableColumnsConfigMap[colStr] || {}),
  };

  //Editable columns
  if (
    ["ACTION", "MOBILE_NUM", "EMAIL_ADDRESS", "TEST_RESULT"].includes(colStr)
  ) {
    return {
      ...col,
      onCell: (record) => {
        return {
          record,
          editable: colStr !== "ACTION",
          title: col.title,
          dataIndex: col.dataIndex,
          key: colStr,
        };
      },
    };
  }
  return col;
});

const CohortTableColumnsConfigMap = {
  COUPON: {
    width: "10%",
  },
  CRM: {
    render(value, row, index) {
      return (
        <button
          style={{ width: "50px", color: "white", backgroundColor: "#4287f5" }}
          className="clickable-cell"
          data-name="CRM"
          id={row["MRN"]}
        >
          CRM
        </button>
      );
    },
  },
  EMAIL_ADDRESS: {
    width: "10%",
  },
  TEST_RESULT: {
    width: "10%",
  },
  RESULT_DATE: {
    width: "10%",
  },
  MOBILE_NUM: {
    width: "10%",
  },
  HOME_NUM: {
    width: "10%",
  },
};

export const CohortTableColumnsConfig = [
  "CRM",
  "COUPON",
  "PAT_NAME",
  "EMAIL_ADDRESS",
  "MOBILE_NUM",
  "HOME_NUM",
  "RESULT_DATE",
  "LANGUAGE",
  "PAT_AGE",
  "PAT_SEX",
  "ETHNIC_GROUP",
  "RACE",
  "ZIP",
  "COUPON_ISSUE_DATE",
  "COUPON_REDEEM_DATE",
  "CONSENT_DATE",
  "SURVEY_COMPLETION_DATE",
].map((colStr) => {
  const col = {
    title: () => (
      <Tooltip title={`${CohortTableColumnsToolTipsMap[colStr]} `}>
        {colStr}
      </Tooltip>
    ),
    dataIndex: colStr,
    key: colStr,
    ...(CohortTableColumnsConfigMap[colStr] || {}),
  };

  return col;
});

const TestScheduleTableColumnsConfigMap = {
  FIRST_NAME: {
    width: "8%",
  },
  LAST_NAME: {
    width: "8%",
  },
  COUPON: {
    width: "10%",
  },
  RECORD_ID: {
    width: "8%",
  },
  EMAIL_ADDRESS: {
    width: "10%",
  },
  TEST_RESULT: {
    width: "7%",
  },
  RESULT_DATE: {
    width: "8%",
  },
  RESULT_NOTIFIED: {
    width: "10%",
  },
  TEST_DATE: {
    width: "10%",
  },
  ZIP: {
    width: "4%",
  },
  HOME_NUM: {
    width: "8%",
  },
  MOBILE_NUM: {
    width: "8%",
  },
};

export const TestScheduleTableColumnsConfig = [
  "FIRST_NAME",
  "LAST_NAME",
  "RECORD_ID",
  "EMAIL_ADDRESS",
  "MOBILE_NUM",
  "HOME_NUM",
  "ZIP",
  "TEST_DATE",
  "TEST_RESULT",
  "RESULT_DATE",
  "RESULT_NOTIFIED",
].map((colStr) => {
  const col = {
    title: () => (
      <Tooltip title={`${TestScheduleTableColumnsToolTipsMap[colStr]}`}>
        {colStr}
      </Tooltip>
    ),
    dataIndex: colStr,
    key: colStr,
    ...(TestScheduleTableColumnsConfigMap[colStr] || {}),
  };

  //Editable columns
  if (
    ["RESULT_DATE", "RESULT_NOTIFIED", "TEST_DATE", "TEST_RESULT"].includes(
      colStr
    )
  ) {
    return {
      ...col,
      onCell: (record) => {
        return {
          record,
          editable: colStr !== "ACTION",
          title: col.title,
          dataIndex: col.dataIndex,
          key: colStr,
        };
      },
    };
  }
  return col;
});

const STATUS_FILTER = {
  //Component instance
  component: Select,
  // key name
  name: "status",
  // Component props
  props: {
    placeholder: "Choose Status",
    options: [
      { label: "EXCLUDE", value: "EXCLUDE" },
      { label: "ELIGIBLE", value: "ELIGIBLE" },
      { label: "INCLUDE", value: "INCLUDE" },
      { label: "DEFER", value: "DEFER" },
    ],
  },
};

const AGE_FILTER = {
  component: Select,
  name: "age",
  props: {
    placeholder: "Choose Age Range",
    // change value
    options: [
      { label: "under 20", value: "under 20" },
      { label: "21-40", value: "21-40" },
      { label: "41-60", value: "41-60" },
      { label: "61-80", value: "61-80" },
      { label: "older than 81", value: "older than 81" },
    ],
  },
};

// Ethnic Group
const ETHNIC_FILTER = {
  component: Select,
  name: "ethnic",
  props: {
    placeholder: "Choose Ethnic Group",
    options: [
      { label: "Hispanic Other", value: "Hispanic Other" },
      { label: "Hispanic Mexican", value: "Hispanic Mexican" },
      { label: "Not Hispanic/Latino", value: "Not Hispanic/Latino" },
      { label: "Not Reported/Declined", value: "Not Reported/Declined" },
    ],
  },
};

// Sex
const SEX_FILTER = {
  component: Select,
  name: "sex",
  props: {
    placeholder: "Choose Sex",
    options: [
      { label: "Female", value: "Female" },
      { label: "Male", value: "Male" },
      { label: "Other", value: "Other" },
    ],
  },
};
// Race Group
const RACE_FILTER = {
  component: Select,
  name: "race",
  props: {
    placeholder: "Choose Race",
    options: [
      { label: "2 or more races", value: "2 or more races" },
      { label: "Asian", value: "Asian" },
      {
        label: "Black or African Americans",
        value: "Black or African Americans",
      },
      { label: "Caucasian/White", value: "Caucasian/White" },
      { label: "Not Reported/Declined", value: "Not Reported/Declined" },
      { label: "Other", value: "Other" },
    ],
  },
};

// Test Result
const RESULT_FILTER = {
  component: Select,
  name: "test_result",
  props: {
    placeholder: "Choose Test Result",
    options: [
      { label: "Positive", value: "POSITIVE" },
      { label: "Negative", value: "NEGATIVE" },
      { label: "N/A", value: "N/A" },
    ],
  },
};

// Test Result Notified
const NOTIFIED_FILTER = {
  component: Select,
  name: "notified",
  props: {
    placeholder: "Choose If Test Result Is Notified",
    options: [
      { label: "Yes", value: "Yes" },
      { label: "No", value: "No" },
      { label: "N/A", value: "N/A" },
    ],
  },
};

export const CohortSearchFormConfig = [
  AGE_FILTER,
  RACE_FILTER,
  SEX_FILTER,
  ETHNIC_FILTER,
];

export const SeedReportSearchFormConfig = [
  STATUS_FILTER,
  AGE_FILTER,
  RACE_FILTER,
  SEX_FILTER,
  ETHNIC_FILTER,
];

export const PeerTestReportSearchFormConfig = [RESULT_FILTER, NOTIFIED_FILTER];

//Peer Coupon with contacts Distribution config
const PeerCouponWContactsTableColumnsConfigMap = {
  INVITE_CONTACTS: {
    width: "15%",
    render: (value, row, index) => {
      return (
        <Row>
          <Col>
            <button
              style={{
                color: "white",
                fontSize: "13px",
                background: "#4287f5",
                borderColor: "black",
                height: "100%",
                width: "150%",
                marginRight: "20%",
              }}
            >
              INVITE
            </button>
          </Col>

          <Col>
            <form
              style={{
                marginLeft: "90%",
                height: "100%",
                width: "150%",
              }}
            >
              {row["CONTACT"]}
            </form>
          </Col>
        </Row>
      );
    },
  },
  ACTION: {
    width: "6%",
    render: (value, row, index) => {
      return (
        <Row>
          <div>
            <Tooltip title={`Click button to send coupon to this contact.`}>
              <button
                style={{
                  color: "white",
                  fontSize: "13px",
                  background: "#4287f5",
                  borderColor: "black",
                  height: "150%",
                  width: "120%",
                }}
              >
                INVITE
              </button>
            </Tooltip>
          </div>
        </Row>
      );
    },
  },
};

//Peer Coupon Distribution config
const PeerCouponTableColumnsConfigMap = {
  ACTION: {
    width: "12%",
    render: (value, row, index) => {
      return (
        <Row>
          <div>
            <Tooltip title={`Click button to send coupon to this contact.`}>
              <button
                style={{
                  color: "white",
                  fontSize: "13px",
                  background: "#4287f5",
                  borderColor: "black",
                  height: "150%",
                  width: "120%",
                }}
              >
                INVITE
              </button>
            </Tooltip>
          </div>
        </Row>
      );
    },
  },
};

export const PeerCouponTableColumnsToolTipsMap = {
  CONTACT: "Click the button to see the peers information of this contact.",
  NUM_COUPON: "The numbers of coupon you want to send to this contact.",
  COUPON_SENT: "Total number of coupons that have sent to this contact.",
  FIRST_NAME: "First name of the seed.",
  LAST_NAME: "Last name of the seed.",
  EMAIL_ADDRESS: "The email address of the seed.",
  ALTERNATIVE_EMAIL:
    "Click the cell to add or edit the alternative email to send coupons to",
  RECORD_ID: "The record ID of the seed.",
  PHONE: "Phone number of the seed.",
};

export const PeerCouponTableFiltersMap = {
  RECORD_ID: {
    sorter: true,
  },
  "FIRST NAME": {
    filterMultiple: false,
    sorter: true,
  },
  "LAST NAME": {
    filterMultiple: false,
    sorter: true,
  },
};

export const PeerCouponTableColumnsConfig = [
  //  "INVITE_CONTACTS",
  "ACTION",
  "CONTACT",
  "COUPON_SENT",
  "FIRST_NAME",
  "LAST_NAME",
  "PHONE",
  "ALTERNATIVE_EMAIL",
  "EMAIL_ADDRESS",
  "RECORD_ID",
  "COUPON_ISSUE_DATE",
  "COUPON_REDEEM_DATE",
  "CONSENT_DATE",
  "SURVEY_COMPLETION_DATE",
].map((colStr) => {
  const col = {
    title: () => (
      <Tooltip title={`${PeerCouponTableColumnsToolTipsMap[colStr]}`}>
        {colStr}
      </Tooltip>
    ),
    dataIndex: colStr,
    key: colStr,
    ...(PeerCouponWContactsTableColumnsConfigMap[colStr] || {}),
  };

  //Editable columns
  if (["INVITE_CONTACTS", "ACTION", "ALTERNATIVE_EMAIL"].includes(colStr)) {
    return {
      ...col,
      onCell: (record) => {
        return {
          record,
          editable: colStr !== "ACTION",
          //          editable: colStr !== "INVITE_CONTACTS",
          title: col.title,
          dataIndex: col.dataIndex,
          key: colStr,
        };
      },
    };
  }
  return col;
});

export const PeerCouponNoContactsTableColumnsConfig = [
  "ACTION",
  "NUM_COUPONS",
  "COUPON_SENT",
  "FIRST_NAME",
  "LAST_NAME",
  "PHONE",
  "ALTERNATIVE_EMAIL",
  "EMAIL_ADDRESS",
  "RECORD_ID",
  "COUPON_ISSUE_DATE",
  "COUPON_REDEEM_DATE",
  "CONSENT_DATE",
  "SURVEY_COMPLETION_DATE",
].map((colStr) => {
  const col = {
    title: () => (
      <Tooltip title={`${PeerCouponTableColumnsToolTipsMap[colStr]}`}>
        {colStr}
      </Tooltip>
    ),
    dataIndex: colStr,
    key: colStr,
    ...(PeerCouponTableColumnsConfigMap[colStr] || {}),
  };

  //Editable columns
  if (["ACTION", "NUM_COUPONS", "ALTERNATIVE_EMAIL"].includes(colStr)) {
    return {
      ...col,
      onCell: (record) => {
        return {
          record,
          editable: colStr !== "ACTION",
          title: col.title,
          dataIndex: col.dataIndex,
          key: colStr,
        };
      },
    };
  }
  return col;
});

/**Column selector configs need to be consistent with the table column of the report*/
export const SeedTableFilterColumnList = [
  "MRN",
  "TEST_RESULT",
  "HOME_NUM",
  "ZIP",
  "LANGUAGE",
];

/**need to be consistent with the table column of the report*/
export const CohortTableFilterColumnList = [
  "HOME_NUM",
  "PAT_AGE",
  "PAT_SEX",
  "RACE",
  "ETHNIC_GROUP",
  "ZIP",
  "LANGUAGE",
];

/**need to be consistent with the table column of the report*/
export const PeerDistributeColumnList = [
  "RECORD_ID",
  "COUPON_ISSUE_DATE",
  "COUPON_REDEEM_DATE",
  "CONSENT_DATE",
  "SURVEY_COMPLETION_DATE",
];

/**need to be consistent with the table column of the report*/
export const TestScheduleColumnFilterList = ["MOBILE_NUM", "HOME_NUM", "ZIP"];

export const MAX_PEERS = 10;
