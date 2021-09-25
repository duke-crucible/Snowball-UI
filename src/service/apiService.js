import { message } from "antd";
import axois from "axios";

export const API_ROOT = window._env_.REACT_APP_API_ROOT;

// Axios Configuration
const R = axois.create({
  baseURL: API_ROOT,
});

R.interceptors.request.use((config) => {
  if (config.method === "get") {
    return {
      ...config,
      params: {
        ...(config.params || {}),
        t: Date.now(),
      },
    };
  }

  if (config.method === "post") {
    return config;
  }
});

R.interceptors.response.use(
  (response) => Promise.resolve(response),
  (err) => {
    if (err.response?.data?.reason) {
      message.error(`Failed: ${err.response.data.reason}`);
    }
    return Promise.reject(err.response);
  }
);

// Services
/**
 * Get List
 */
export const fetchTableData = (params) => {
  return R.get("/api/seedreport", {
    params,
  });
};

/**
 * Get Search List
 */
export const fetchSearchTableData = (params) => {
  return R.get("/api/seedreport", {
    params,
  });
};

/**
 * Get Search List
 */
export const fetchCohortTableData = (params) => {
  return R.get("/api/cohort", {
    params,
  });
};

/**
 * Modify
 */
export const updateSeed = (data) => {
  return R.post("/api/updateseed", data);
};

/**
 * Add
 */
export const handleAdd = (data) => {
  return R.post("/api/addseed", data);
};

/**
 * Upload seed report CSV file
 */
export const uploadCSV = (data) => {
  const formData = new FormData();
  formData.append("csv", data);
  return R({
    method: "post",
    url: "/api/uploadcsv",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

/**
 * Upload Consent pdf form
 */
export const uploadConsent = (data) => {
  const formData = new FormData();
  formData.append("form", data.cf);
  formData.append("comments", data.comments);

  return R({
    method: "post",
    url: "/api/consentform",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

/**
 * get cf_url
 */
export const fetchCfUrl = () => {
  return R({
    method: "get",
    url: "api/consentform",
  });
};

/**
 * Save signed consent form data
 */
export const signedCf = (data) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });

  return R({
    method: "post",
    url: "/api/consent",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

/**
 * get qualified seeds to send peer coupons
 */
export const peerDistribution = (params) => {
  return R.get("/api/participants", {
    params,
  });
};

/**
 * Get redeemed coupon related record info
 */
export const getCouponInfo = (params) => {
  return R.get("/api/redeem", {
    params,
  });
};

/**
 * confirm and redeem token
 */
export const confirmUserInfo = (data) => {
  return R({
    method: "post",
    data,
    url: "api/redeem",
  });
};

/**
 * Add peers contact information
 */
export const handleAddPeers = (formData) => {
  return R({
    method: "post",
    url: "/api/participants",
    data: formData,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

/**
 * Save Status
 */
export const saveStatus = (record, evt) => {
  //  console.log(record);
  if (evt && evt.target) {
    return R.post("/api/seedstatus", {
      MRN: record.MRN,
      STATUS: evt.target.innerText,
    }).then(() => {
      message.success(
        `The STATUS of ${record.MRN} has been modified to ${evt.target.innerText}`
      );
    });
  }
};

/**
 *  Update Alternative Email
 */
export const saveAlterEmail = (record, evt) => {
  if (evt && evt.target) {
    return R.post("/api/participants", {
      RECORD_ID: record.RECORD_ID,
      ALTERNATIVE_EMAIL: evt.target.innerText,
    }).then(() => {
      message.success(
        `Alternative email of ${record.RECORD_ID} has been updated to ${evt.target.innerText}`
      );
    });
  }
};

/**
 *  Update number of coupons to send for seed's contact
 */
export const updateNumCoupons = (record, evt) => {
  if (evt && evt.target) {
    return R.post("/api/participants", {
      RECORD_ID: record.RECORD_ID,
      NUM_COUPONS: evt.target.innerText,
    }).then(() => {
      message.success(
        `Set number of coupons to send for ${record.RECORD_ID} to ${evt.target.innerText}`
      );
    });
  }
};

/**
 *  Save Survey
 */
export const saveSurvey = (data) => {
  return R({
    method: "post",
    data,
    url: "api/survey",
  });
};

/**
 * Get peers information
 */
export const getPeersInfo = (params) => {
  return R.get("api/participants", {
    params,
  });
};

/**
 * Get CRM Comment
 */
export const getComment = (params) => {
  return R.get("api/crm", {
    params,
  });
};

/**
 * Submit CRM comment
 */
export const submitComment = (data) => {
  return R({
    method: "post",
    data,
    url: "api/crm",
  });
};

/**
 * Get Peers for scheduling test
 */
export const getPeersForTest = (data) => {
  return R({
    method: "get",
    params: {
      ...data,
    },
    url: "api/testschedule",
  });
};

/**
 * Edit test scheduling items for peers
 */
export const updatePeersForTest = (data) => {
  console.log(data);
  return R.post("api/testschedule", data);
};

/**
 * Invite Peer (record_id, contact_id)
 */
export const invitePeer = (record) => {
  if (record) {
    return R.post("/api/invitepeer", {
      RECORD_ID: record.RECORD_ID,
    }).then(() => {
      message.success(
        `Sending invitation email to record id: ${record.RECORD_ID} for this contact.`
      );
    });
  }
};

/**
 * download Seed Report
 */
// TODO: type=seeds, participants, crm, consent, surveys, temp_surveys, consentform
export const downloadReport = (data) => {
  return R({
    method: "get",
    params: {
      ...data,
    },
    url: "api/download",
  });
};
