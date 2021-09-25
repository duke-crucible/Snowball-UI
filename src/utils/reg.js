import Schema from "async-validator";

export const cellPhoneReg = /^\d{3}-\d{3}-\d{4}$/;
export const ageReg = /^[1-9]\d{0,2}$/;
export const dateReg = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

export const validator = {
  EMAIL_ADDRESS: new Schema({
    EMAIL_ADDRESS: [
      { type: "email", message: "The input is not a valid E-mail." },
    ],
  }),
  ALTERNATIVE_EMAIL: new Schema({
    ALTERNATIVE_EMAIL: [
      { type: "email", message: "The input is not a valid E-mail." },
    ],
  }),
  MOBILE_NUM: new Schema({
    MOBILE_NUM: {
      validator(rule, value, callback) {
        if (value) {
          return !!value.toString().match(cellPhoneReg);
        }
        return false;
      },
      message: "Mobile Phone number format is XXX-XXX-XXXX",
    },
  }),
  TEST_DATE: new Schema({
    TEST_DATE: {
      validator(rule, value, callback) {
        if (value) {
          return !!value.toString().match(dateReg);
        }
        return false;
      },
      message: "Please input a valid test date with format: YYYY-MM-DD",
    },
  }),
  RESULT_DATE: new Schema({
    RESULT_DATE: {
      validator(rule, value, callback) {
        if (value) {
          return !!value.toString().match(dateReg);
        }
        return false;
      },
      message: "Please input a valid result date with format: YYYY-MM-DD",
    },
  }),
  TEST_RESULT: new Schema({
    TEST_RESULT: [
      {
        type: "enum",
        enum: ["POSITIVE", "NEGATIVE", "N/A"],
        message: "Please input POSITIVE, NEGATIVE or N/A",
      },
    ],
  }),
  RESULT_NOTIFIED: new Schema({
    TEST_RESULT: [
      {
        type: "enum",
        enum: ["YES", "NO", "N/A"],
        message: "Please input YES, NO or N/A",
      },
    ],
  }),
  NUM_COUPONS: new Schema({
    NUM_COUPONS: {
      validator(rule, value, callback) {
        if (value) {
          return !!(value <= 10);
        }
        return false;
      },
      message:
        "Please input a valid number of coupon to be sent, no larger than 10.",
    },
  }),
};
