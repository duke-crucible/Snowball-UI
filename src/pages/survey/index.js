import React, { useState, useRef, useEffect } from "react";
import { message } from "antd";
import "survey-react/survey.css";
import "survey-react/modern.css";
import * as Survey from "survey-react";
import surveyJSON from "../../components/Surveys/questions";
import { saveSurvey } from "../../service/apiService";
import { useHistory, useLocation } from "react-router-dom";

import "./index.css";

const REQUEST_DURATION = 30e3;

const SurveyPage = () => {
  const history = useHistory();
  const record_id = new URLSearchParams(useLocation().search).get("record_id");
  const [totalProgress, setTotalProgress] = useState(0);
  const [, setAnsweredData] = useState({});

  let timer = useRef(null);

  //progress percentile
  const onValueChanged = (data) => {
    // Save filled data
    setAnsweredData(data.data);
    //update progress
    setTotalProgress(data.getProgress());
  };

  /*
   * Submit
   */
  const submitAnswerData = (submit = false) => {
    //end the timer if submit
    if (submit && timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }

    setAnsweredData((data) => {
      saveSurvey({ ...data, RECORD_ID: record_id, completed: submit }).then(
        (res) => {
          if (submit) {
            message.success("Submit Success!");
            history.push(`/peers?record_id=${record_id}`);
          }
        }
      );
      return data;
    });
  };

  useEffect(() => {
    timer.current = setInterval(() => {
      submitAnswerData();
    }, REQUEST_DURATION);

    return () => {
      clearInterval(timer.current);
      timer.current = null;
    };
  });

  return (
    <div>
      <div className="survey-progress-number">
        Survey Completed: {totalProgress}%
      </div>
      <Survey.Survey
        showCompletedPage={true}
        onComplete={() => submitAnswerData(true)}
        onValueChanged={(data) => onValueChanged(data)}
        json={surveyJSON}
      />
    </div>
  );
};

export default SurveyPage;
