import React from "react";
import { Typography, Card, Row, Col } from "antd";

/**
 * Welcome Component
 */
export default function Welcome() {
  return (
    <div>
      <Row style={{ paddingTop: "20px" }}>
        <Col span={14} push={2}>
          <Card style={{ paddingLeft: "20px", paddingTop: "20px" }}>
            <Typography>
              <h3>What is SnowballGR?</h3>
              <div>
                The Snowball Study is testing ways to identify and contact
                people who may have been exposed to infection by a virus such as
                SARS-CoV-2 (also known as coronavirus, or COVID-19). The study
                is led by researchers and physicians at Duke University. Later
                the team aimed to release Snowball General Release (SnowballGR)
                for open source project, with more generic features, so that it
                can also be used for other types of infectious diseases study.
                <div>
                  The main features of SnowballGR application are:
                  <ul>
                    <li>
                      Stand alone respondent-driven sampling application which
                      integrates consent and survey.
                    </li>
                    <li>
                      Separated frontend and API repository, uses Docker
                      containers for fast, easy and portable application
                      development - desktop and cloud.
                    </li>
                    <li>
                      Support both email and SMS text message for sending cohort
                      invitation to enroll.
                    </li>
                    <li>Support Cloud platform deployment.</li>
                    <li>
                      Support test schedule for peer participants (See 'peer'
                      definition in "How to use Snowball" section).{" "}
                    </li>
                    <li>
                      Support CRM (Customer Relationship Management) to track
                      the communication with participants.
                    </li>
                    <li>
                      Support download all user data collected by the
                      application.
                    </li>
                    <li>
                      Support customized consent by uploading consent with
                      different versions.
                    </li>
                    <li>Support customized survey by using SurveyJS.</li>
                    <li>
                      Support distributing coupons to peers by individual invite
                      or bulk invite.
                    </li>
                    <li>
                      Support configurable numbers of peers to be added by the
                      seeds.
                    </li>
                    <li>
                      Support study team to operate both on-site or remotely.
                    </li>
                  </ul>
                </div>
              </div>
              <h3>How to use Snowball?</h3>
              <p>
                Below content will describe how to use SnowballGR open source
                project.
              </p>
              <p>
                <b>Study Team</b>: The researchers or the scientist team who
                perform the study. They will use this application to collect
                participants data such as survey questionnaire answers,
                demographics information, enrollment meta data, CRM
                communication logs etc.
              </p>
              <p>
                <b>Participants</b>: the users who are the people that the study
                team has interest to enroll for the study. The original
                participants who have been diagnosed positiive are call "Seed".
                Study Team sends the seed a link to enroll to the study. The
                link contains an unique 4 words combination which will lead the
                seed to confirm the contact information, fill the consent, fill
                in the survey, and add the contacts. The contacts are the people
                they have been contacted during their infectious window at their
                best guess. The contacts are called "Peer", Study Team can send
                invites to the Seed, so the Seed can pass the invites to the
                Peers to join the study.
              </p>
              <p>
                To see how Study Team can use the application, check "Study Team
                Guide" below.{" "}
              </p>
              <p>
                To see how the application is used by participants, check
                "Participants Guide" below.{" "}
              </p>
              <p>
                <b>TODO</b>: add diagram here. Add video here.{" "}
              </p>
              <h3>Study Team Guide</h3>
              <h4>1. How to Set Up, Customize and Deploy this application?</h4>
              <p>
                This project contains frontend repository "snowballgr-ui" and
                API repository "snowballgr". It is deployed to Azure Cloud. You
                can choose your own cloud platform to run the application. This
                application uses external services:
                <a href="https://sendgrid.com/">Twilio SendGrid</a>
                for email service,
                <a href="https://azure.microsoft.com/en-us/services/communication-services/">
                  Azure Communication Service
                </a>
                for sending SMS text message,
                <a href="https://surveyjs.io/">SurveyJS</a> to create survey
                that used by the study, and{" "}
                <a href="https://azure.microsoft.com/en-us/services/cosmos-db/">
                  Azure Cosmos DB
                </a>{" "}
                for data storage. You can create your own account for the above
                services and design your own survey for the study. As mentioned,
                this project uses Azure Cosmos DB, which is a non-relational
                database to store the data. There are 5 collections used for
                this project: "Seeds", "Participants", "Events"(<b>TODO</b>:
                rename to CRM), "Consent" and "Surveys". Study Team can
                configure: coupon expiration window, number of peers that seed
                can invite, Seed report table columns, columns to display in
                each table etc.
              </p>
              <h4>2.Consent</h4>
              <p>
                Different research organizations may have various requirements
                for consent process. This application has integrated electronic
                consent process. Study Team first needs to upload a PDF consent
                under "Admin Tools" page. It supports study team to upload
                amended consents by uploading multiple times of consents with
                different versions and comments. The latest uploaded consent
                document will shown for Participants after they redeem the
                coupon and reach to consent page. They will also see the updated
                date of current the consent they are going to sign on. The
                uploaded consent documents are stored in If the study team wants
                to use their own consent system or process, they can modify
                related source code.
              </p>
              <h4>3.Survey</h4>
              This project supports study team to create their own surveys by
              using{" "}
              <a href="https://surveyjs.io/create-survey">SurveyJS Creator</a>
              Check out{" "}
              <a href="https://surveyjs.io/Examples/Survey-Creator/">
                SurveyJS Creator example here
              </a>{" "}
              if you are new to SurveyJS. Once you have created the survey,
              under Survey Creator, "JSON Editor", copy the whole JSON object to
              replace the variable surveyJSON under:
              <p>snowballgr-ui repo -> src/components/Surveys/questions.js</p>
              <h4>4.Seed Report</h4>
              <div>
                Study Team can import seeds by 2 approaches under "Seed Report"
                page. 1. upload CSV. 2. Click "Add New Seed" button to manually
                input the seed information. Both approaches will result in
                storing seeds information into Cosmos DB "Seeds" collection. To
                upload CSV, please download CSV template in this page under
                "Resources". The application assumes the MRN is unique.
                Duplicate MRN records will be rejected. Once Study Team has
                uploaded/created seeds, they can change seed status by click
                buttons under "ACTION" column.
                <p>
                  <b>INLCUDE:</b> Click this button to send invite seed to
                  enroll to the study. The invite will be sent to emai address
                  on the table by default, if email is not present, it sends SMS
                  text message to the cell phone. Click EMAIL_ADDRESS,
                  MOBILE_NUM cells to edit email, mobile phone number.
                </p>
                <p>
                  <b>EXCLUDE:</b> Click this button to mark the seed to be
                  excluded from being chosen to join the study.
                </p>
                <p>
                  <b>DEFER:</b> Click this button if this seed is in the
                  secondary consideration to be invited to join the study.
                </p>
                <p>
                  <b>ELIGIBLE:</b>This status means the seed is eligible to be
                  considered to join the study. Test result cell is also
                  editable (TEST_RESULT column), in case the study team needs to
                  update the test result.
                </p>
                <p>
                  On this page, study team can also use filter to narrow down
                  the seeds range, by selecting below filters:
                </p>
                <p>
                  <b>Days from report date:</b> this is the date when study team
                  import the seeds either by uploading CSV file or add new seed.
                  API created REPORT_DATE that attaches to the records.
                </p>
                <p>
                  <b>Status, Age, Race, Sex, Ethnic filters</b>
                </p>
                <p>
                  Study team can also use "Select Columns To Display" to control
                  which columns to display on the table.{" "}
                </p>
              </div>
              <h4>5.Cohort Management</h4>
              <p>
                After study team sends out invite, a record is created in
                Participants collection, with record id, coupon, and seed
                information from seed report. The record will show up in Cohort
                Management regardless if the participant redeems the coupon or
                not. If the participant has redeemed coupon, the table will have
                more information of this record, such as the coupon redeemed
                date, consent date, survey completion date etc. Study Team can
                click "CRM" button to log the communication with the
                participant.
              </p>
              <h4>6.Peer Coupon Distribution</h4>
              <p>
                After the seed completed the enrollment, Study Team can
                distribute the invitations to the seed, so the seed can forward
                the invitation to their contacts (peers). If the seed has filled
                "Add Contacts" form during the enrollment process (after
                survey), then the contacts initials or names will show up on the
                top table of "Peer Coupon Distribution" page. If the seed
                skipped "Add Contacts" form during the enrollment, then Study
                Team can use bottom table in "Peer Coupon Distribution" page, to
                fill in numbers of invitations to distribute to the seed in
                editable cell "NUM_COUPONS". In both tables, Study Team can send
                invite to another email other than the seed's email by entering
                the email address in ALTERNATIVE_EMAILL cell. If there is no
                alternative email present, the invite will send to
                "EMAIL_ADDRESS" by default.{" "}
              </p>
              <h4>7.Schedule Test For Peers</h4>
              <p>
                Once the peer has received invitation and redeemed coupon, Study
                Team can schedule test for the peer. Under "Schedule Test For
                Peers" page, Study Team can input the peer's test date, test
                result, result date and if the result has been notified to the
                peer or not.{" "}
              </p>
              <h4>8.Admin Tools</h4>
              <p>
                Under this page, Study Team can upload consent form and download
                reports which has the data collected by this application.
              </p>
              <h3>Participants Guide</h3>
              <p>
                This section describes how participants use this application.
              </p>
              <h4>1.Redeem Coupon</h4>
              <p>
                After Study Team invites the participants, they receive
                enrollment invitation either by email or SMS text message. In
                the invitation, there is a link that contains an unique 4 words
                combination coupon. After they click the link, they will be led
                to the enrollment process, which contains coupon redeem,
                consent, survey and add contacts information.
              </p>
              <h4>2.Consent</h4>
              <p>
                The participants will see the latest consent that uploaded by
                the Study Team. Under the consent document, they can see what is
                the latest consent uploaded time. If they all the study team to
                use their samples, they are required to provide initials. If
                they accept to join the study, they are required to provide
                e-signature in this application. If they choose not to join the
                study, they are asked to provide reasons, and the flow ends
                here. They won't be led to survey or add contacts pages.{" "}
              </p>
              <h4>3.Survey</h4>
              <p>
                Participants will see Survey page after they consent. After they
                finish the survey, they are led to "Add Contacts" page.
              </p>
              <h4>4.Add Contacts</h4>
              <p>
                Add contacts is optional for the participants. Current
                configuration in this repo is set to, seeds can add upto 10
                peers (contacts). After participants submitting, this is the end
                of the enrollment. Participants will see a thank you page.
              </p>
              <h4>5. Forward invitations to Peers</h4>
              <p>
                After Study Team send invitations to peers, if seed's email is
                used, seed will receive the invation and needs to forward to the
                contacts.
              </p>
              <h3>About Us</h3>
              <p>
                Crucible is Duke’s data science accelerator. We provide the
                development and engineering capabilities needed to address
                Duke’s most complex data science problems. Data-intensive
                workflows demand unique approaches to engineering. Such
                engineering depends in turn on a workforce accustomed to ‘direct
                contact’ with machine learning and able to design, build, and
                deploy data flows for training machine-learning algorithms.
                Established under the leadership of{" "}
                <a href="https://crucible.duke.edu/team/erich-huang/">
                  Dr. Erich Huang
                </a>{" "}
                with the support of{" "}
                <a href="https://medschool.duke.edu/">
                  Duke School of Medicine
                </a>
                , Crucible partners with{" "}
                <a href="https://forge.duke.edu/">Duke Forge</a>,{" "}
                <a href="https://www.ctsi.duke.edu/">Duke CTSI</a>, and{" "}
                <a href="https://surgery.duke.edu/">Duke Dept. of Surgery</a> to
                amplify and scale thought leadership with increased engineering
                capacity.
              </p>
            </Typography>
          </Card>
        </Col>
        <Col span={8} push={3}>
          <Card style={{ paddingLeft: "20px", paddingTop: "20px" }}>
            <Typography>
              <h3>Resources</h3>
              <h5>Download Seed Report CSV Template</h5>
              <h5>
                <a href="https://github.com/duke-crucible/Snowball-UI">
                  Github: SnowballGR UI
                </a>
              </h5>
              <h5>
                <a href="https://github.com/duke-crucible/Snowball-API">
                  Github: SnowballGR API
                </a>
              </h5>
              <h5>
                <a href="https://sites.duke.edu/snowball/">
                  Snowball Duke Website
                </a>
              </h5>
              <h5>
                <a href="https://crucible.duke.edu/">Duke Crucible</a>
              </h5>
            </Typography>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
