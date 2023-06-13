import "./WellnessTest.css";
import formData from "./formData";
import {useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {db, auth} from "../../firebase.config";
import {addDoc, collection} from "firebase/firestore";
import {useNavigate} from "react-router-dom";
import WellnessTestForm from "./WellnessTestForm";
import WellnessTestScore from "./WellnessTestScore";

const WellnessTest = () => {
  const pathElements = window.location.pathname.split("/");
  const id = pathElements[pathElements.length - 1];
  const className = "WellnessTest";
  const selectedFormData = formData[id];
  const [formState, setFormState] = useState({values: {}, isValid: false});
  const [result, setResult] = useState(null);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  if (!selectedFormData) return <div>Form not found</div>;

  // Some assessments have a consistent scale for each question, and others have different possible answers for each question and need to be mapped across in Form.js
  const options = selectedFormData.scale;

  const handleSubmit = () => {
    if (selectedFormData.getScore && formState.isValid) {
      const result = selectedFormData.getScore(
        selectedFormData.questions,
        options,
        formState.values
      )
      const dbObject = {
        user: user.uid,
        score: result.score,
        formType: id,
        ...(result.originalValues || {}),
        created: new Date().getTime()
      }
      console.log(dbObject)
      addDoc(collection(db, "WellnessTestResults"), dbObject).then(resp => {
        setResult(result);
      })
    }
  };

  return (
    <div className={className}>
      <h1 className={`${className}-header`}>
        <div>{selectedFormData.title}</div>
        <div className={`${className}-testDetails`}>
          {selectedFormData.questions.length} questions -{" "}
          {selectedFormData.time}
        </div>
      </h1>

      {!result && (<WellnessTestForm selectedFormData={selectedFormData} options={options} setFormState={setFormState}
                        formState={formState} handleSubmit={handleSubmit} />)}

      {result && (<WellnessTestScore result={result} selectedFormData={selectedFormData} />)}
    </div>
  );
};

export default WellnessTest;
