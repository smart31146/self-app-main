import './WellnessStoryTestHard.css';
import StepOneForm from "./StepOneForm";
import {useState} from 'react';
import StepTwoForm from "./StepTwoForm";
import { useNavigate } from 'react-router-dom';
import {saveStoryForm} from "../service";

const WellnessStoryTestHard = () => {
  const [experiences, setExperiences] = useState({});
  const navigate = useNavigate();

  const handleFormOneSubmit = (submittedFormValues) => {
    console.log("submittedFormValues", submittedFormValues)
    setExperiences(submittedFormValues);
  }

  const handleFormTwoSubmit = (submittedFormValues) => {
    console.log("submittedFormValues step 2", submittedFormValues)
    const formData = {
      ...experiences,
      ...submittedFormValues
    };
    console.log("form data: ", formData)
    saveStoryForm("story_hard", formData).then(() => {
      navigate("/wellness/story-day-one")
    });
  }

  return (
    <div>
      {!experiences.experience && (<StepOneForm onFormSubmit={handleFormOneSubmit} />)}
      {experiences.experience && (<StepTwoForm onFormSubmit={handleFormTwoSubmit} />)}
    </div>
  )
}

export default WellnessStoryTestHard;