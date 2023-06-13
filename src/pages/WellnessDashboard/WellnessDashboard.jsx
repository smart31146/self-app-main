import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { doc, getDoc, getDocs, collection, where, query } from "firebase/firestore";
import { db, auth } from "../../firebase.config";
import "../../styles/wellnessDashboard.scss";
import formCategories from "./WellnessDashboardTests/formCategories";
import {
  MHQ_ASSESSMENT_URL,
  SSES_ASSESSMENT_URL,
  HAMILTON_ASSESSMENT_URL,
  QIDS_SR_16_ASSESSMENT_URL,
  EAT_26_ASSESSMENT_URL,
  EATING_DISORDER_ASSESSMENT_URL,
} from "../../constants/assessments-urls";
import { getPercentage } from "../../utils";
import ProgressBar from "../../components/ProgressBar";
import Button from "../../components/Button";
import WellnessDashboardTests from "./WellnessDashboardTests";

const WellnessDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [userTestsData, setUserTestsData] = useState(null);
  const [user, error] = useAuthState(auth);
  const [wellnessPercentage, setWellnessPercentage] = useState(0);
  const [wellnessFormsCompleted, setWellnessFormsCompleted] = useState([]);

  const navigate = useNavigate();

  const getUserData = async (user) => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUserData(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  const addWellnessCompletedForm = (newCompletedForm) => {
    setWellnessFormsCompleted((formsCompleted) => [
      ...formsCompleted,
      newCompletedForm,
    ]);
  };

  useEffect(() => {
    const percentage = getPercentage(wellnessFormsCompleted, 9);
    setWellnessPercentage(percentage);
  }, [wellnessFormsCompleted]);

  useEffect(() => {
    if (user) {
      getUserData(user);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      const testsRef = collection(db, "WellnessTestResults");
      const q = query(testsRef, where("user", "==", user.uid));
      getDocs(q).then(res => {
        const testsAsMap = {};
        res.forEach((doc) => {
          const testData = doc.data()
          if(!testsAsMap[testData.formType] || testsAsMap[testData.formType].created < testData.created)
            testsAsMap[testData.formType] = {
              score: testData.score,
              created: testData.created,
            };
        });
        setUserTestsData(testsAsMap);
      });
    }
  }, [user]);

  if(!userTestsData) return null;


  const totalNumberOfTests = formCategories.reduce((acc, category) => (acc + category.tests.length), 0);
  const totalNumberOfCompletedTests = Object.keys(userTestsData).length;
  const testProgress = Number((totalNumberOfCompletedTests / totalNumberOfTests) * 100).toFixed(2);

  if (user) {
    return (
      <div className="profile">
        <div className="titles">
          <h1>Your Health Record</h1>
          <Button type={"primary"}>
            <Link
              onClick={() => window.scrollTo(0, 0)}
              to={"/wellness/getting-started-essentials"}
              className="join_now"
            >
              {testProgress ? "Check-in" : "Let's get started!"}
            </Link>
          </Button>
        </div>
        <div className="tests-section">
          <div className="heading">
            <h2>Mental Health</h2>

            <ProgressBar percentage={testProgress} />
          </div>
          <WellnessDashboardTests userTestsData={userTestsData} />
        </div>
      </div>
    );
  }
};

export default WellnessDashboard;
