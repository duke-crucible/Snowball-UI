import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  Button,
  Input,
  Form,
  Radio,
  Space,
  DatePicker,
  TimePicker,
  Checkbox,
  message,
} from "antd";
import { fetchCfUrl, signedCf } from "../../service/apiService";
import SignatureCanvas from "react-signature-canvas";

const CheckboxGroup = Checkbox.Group;

const ConsentForm = () => {
  const history = useHistory();
  const id = new URLSearchParams(useLocation().search).get("record_id");
  const contactOptions = ["Telephone", "Text", "Email"];
  const reasonOptions = [
    "Not interested in this research",
    "No time",
    "Not feeling well",
    "Too complicated",
    "Uncomfortable about data privacy",
    "Nothing in it for me",
    "Don't understand",
    "Others:",
  ];

  //Form
  const [form] = Form.useForm();
  //Consent File Url
  const [cfUrl, setCfUrl] = useState("");
  //Consent File Version
  const [cfVersion, setCfVersion] = useState("");
  //Consent File Uploaded Date
  const [cfUploadDate, setCfUploadDate] = useState("");
  //Sign status
  const [cvs, setCvs] = useState(false);
  //Email check switch status
  const [checkEmail, setCheckEmail] = useState(false);
  //Other reasons input enable status
  const [otherInputDisable, setOtherInputDisable] = useState(true);
  //display initials
  const [displayInitial, setDisplayInitial] = useState(true);
  //accept consent status
  const [consented, setConsented] = useState(true);
  //Confirm request loading status
  const [confirmLoading, setConfirmLoading] = useState(false);

  // The initial value of the form
  const formInitialValues = {
    allow: "y",
    confirm: "y",
    hasEmail: "y",
    reasons: [],
  };

  // form layout
  const formLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };

  // Submit Function
  const onFormFinish = (value) => {
    if (confirmLoading) return;
    setConfirmLoading(true);

    const {
      allow,
      initials,
      confirm,
      firstName,
      lastName,
      email,
      mobile,
      homePhone,
      date,
      sign,
      dateSign,
      timeSign,
      contact,
      reasons,
      others,
    } = value;

    console.log(reasons);
    let reasonResult = [...reasons];
    if (reasonResult.includes("Others:")) {
      reasonResult.splice(reasonResult.indexOf("Others:"), 1);
    }

    signedCf({
      RECORD_ID: id,
      CF_VERSION: cfVersion,
      CF_UPLOAD_DATE: cfUploadDate,
      allow,
      initials,
      confirm,
      firstName,
      lastName,
      email,
      mobile,
      homePhone,
      date: date?.format("MM-DD-YYYY"),
      sign,
      dateSign: dateSign?.format("MM-DD-YYYY"),
      timeSign: timeSign?.format("HH:mm"),
      contact: (contact || []).join("#"),
      reasons: (reasonResult || []).join("#"),
      others,
    })
      .then((res) => {
        message.success(
          "Submit consent form for record : " + id + " successfully!"
        );
        form.resetFields();
        if (consented) {
          history.push(`/survey?record_id=${id}`);
        } else {
          history.push(`/thankyounotconsent`);
        }
      })
      .finally(() => {
        setConfirmLoading(false);
      });
  };

  //fetch consent file url
  const fetchCfURlInForm = () => {
    fetchCfUrl().then((res) => {
      setCfUrl(res.data.form);
      setCfVersion(res.data.version);
      setCfUploadDate(res.data.uploadDate);
    });
  };

  // Dynamic Email Check
  const isCheckEmail = (evt) => {
    setCheckEmail(evt.target.value === "y");
  };

  // Package All Data
  const onFormValueChange = (changed, all) => {
    const disableOthersInput = !all.reasons?.includes("Others:");
    all.allow === "y" ? setDisplayInitial(true) : setDisplayInitial(false);
    all.confirm === "y" ? setConsented(true) : setConsented(false);

    setOtherInputDisable(disableOthersInput);
    // clear Others Input
    if (disableOthersInput) {
      form.setFieldsValue({
        others: "",
      });
    }
  };

  // Mounted function
  useEffect(() => {
    fetchCfURlInForm();

    return () => {
      setCfUrl("");
    };
  }, []);

  const signEnd = () => {
    if (cvs) {
      form.setFieldsValue({
        sign: cvs.toDataURL("image/png"),
      });
    }
  };

  const clearCvs = () => {
    cvs.clear();
    form.setFieldsValue({
      sign: "",
    });
  };

  return (
    <>
      <iframe
        title="cfurl"
        src={"data:application/pdf;base64," + cfUrl + "#zoom=100"}
        type="application/pdf"
        className="cf-iframe"
        style={{ width: "50%" }}
      ></iframe>
      <div>* Consent latest updated date: {cfUploadDate}</div>
      <br />
      <Form
        {...formLayout}
        layout="vertical"
        form={form}
        initialValues={formInitialValues}
        onFinish={onFormFinish}
        onValuesChange={(changedValues, allValues) =>
          onFormValueChange(changedValues, allValues)
        }
      >
        <Form.Item
          name="allow"
          label="I allow my samples to be used for this research: "
          rules={[
            {
              required: true,
              message: "Must provide value.",
            },
          ]}
        >
          <Radio.Group>
            <Radio value="y">Yes</Radio>
            <Radio value="n">No</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item hidden={!displayInitial}>
          <Form.Item
            name="initials"
            label="Initials: "
            rules={[
              {
                required: consented ? true : false,
                message: "Must provide value.",
              },
            ]}
            style={{ marginBottom: "10px" }}
          >
            <Input.TextArea
              maxLength={20}
              style={{ width: "30%", resize: "none" }}
              rows={1}
            />
          </Form.Item>
        </Form.Item>

        <Form.Item
          name="confirm"
          label="I have read the consent form and I wish to participate in the study. "
          rules={[
            {
              required: true,
              message: "Must provide value.",
            },
          ]}
        >
          <Radio.Group>
            <Radio value="y">Yes</Radio>
            <Radio value="n">No</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="firstName"
          label="First Name"
          rules={[
            {
              required: true,
              message: "Must provide value",
            },
            {
              pattern: /^[a-zA-Z]+$/,
              message: "Must be a valid string of letter.",
            },
          ]}
        >
          <Input style={{ width: "30%", resize: "none" }} />
        </Form.Item>

        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[
            {
              required: true,
              message: "Must provide value.",
            },
          ]}
        >
          <Input style={{ width: "30%", resize: "none" }} />
        </Form.Item>

        <Form.Item>
          <Form.Item
            name="hasEmail"
            label="Do you have an email addess"
            rules={[
              {
                required: true,
                message: "Must provide value.",
              },
            ]}
          >
            <Radio.Group onChange={(evt) => isCheckEmail(evt)}>
              <Radio value="y">Yes</Radio>
              <Radio value="n">No</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="email"
            label="Please input your email address below if you have an email address."
            rules={[
              {
                required: checkEmail,
                message: "Must provide value.",
              },
              {
                type: "email",
                message: "Must be a valid email address.",
              },
            ]}
          >
            <Input style={{ width: "30%", resize: "none" }} />
          </Form.Item>
        </Form.Item>

        <Form.Item
          name="mobile"
          label="Mobile Phone"
          rules={[
            {
              required: consented ? true : false,
              message: "Must provide value.",
            },
          ]}
        >
          <Input style={{ width: "30%", resize: "none" }} />
        </Form.Item>

        <Form.Item name="homePhone" label="Home Phone (If applicable)">
          <Input style={{ width: "30%", resize: "none" }} />
        </Form.Item>

        <Form.Item
          hidden={!consented}
          name="date"
          label="Date of Consent"
          rules={[
            {
              required: consented ? true : false,
              message: "Must select date.",
            },
          ]}
        >
          <DatePicker format="MM-DD-YYYY" />
        </Form.Item>

        <Form.Item
          name="Contact"
          label="How would like to be contacted? (Check all that apply)"
        >
          <CheckboxGroup options={contactOptions} />
        </Form.Item>

        <Form.Item hidden={!consented}>
          <Space direction="vertical">
            <Form.Item
              name="sign"
              label="Add Signature. Please use your mouse or cursor to draw signature in below rectangle area. Click 'Reset' button if you want to draw another one."
              rules={[
                {
                  required: consented ? true : false,
                  message: "Must provide signature!",
                },
              ]}
            >
              <Space direction="vertical">
                <SignatureCanvas
                  ref={(ref) => setCvs(ref)}
                  onEnd={() => signEnd()}
                  backgroundColor="transparent"
                  canvasProps={{
                    width: 900,
                    height: 200,
                    className: "sign-canvas",
                  }}
                ></SignatureCanvas>
                <Space>
                  <Button onClick={() => clearCvs()}>Reset</Button>
                </Space>
              </Space>
            </Form.Item>
          </Space>
        </Form.Item>

        <Form.Item
          hidden={!consented}
          name="dateSign"
          label="Date of Signature"
          rules={[
            {
              required: consented ? true : false,
              message: "Must provide signature date!",
            },
          ]}
        >
          <DatePicker format="MM-DD-YYYY" />
        </Form.Item>

        <Form.Item
          hidden={!consented}
          name="timeSign"
          label="Time of Signature"
          rules={[
            {
              required: consented ? true : false,
              message: "Must provide signature time!",
            },
          ]}
        >
          <TimePicker format="HH:mm" />
        </Form.Item>

        <Form.Item
          hidden={consented}
          label="What is(are) the reason(s) for you not consenting? (Check all that apply)"
        >
          <Form.Item name="reasons">
            <CheckboxGroup className="list-group" options={reasonOptions} />
          </Form.Item>
          <Form.Item
            name="others"
            rules={[
              {
                required: !otherInputDisable,
                message: "Must provide value when 'Others:' option is checked!",
              },
            ]}
          >
            <Input disabled={otherInputDisable} />
          </Form.Item>
        </Form.Item>

        <Form.Item labelCol={0} wrapperCol={24}>
          <div className="dialog-footer">
            <Button
              loading={confirmLoading}
              className="choose-btn"
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

export default ConsentForm;
