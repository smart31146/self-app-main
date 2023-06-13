import './WellnessStoryTest.css';
import {useParams} from "react-router-dom";
import WellnessStoryTestEasy from "./WellnessStoryTestEasy";
import WellnessStoryTestMedium from "./WellnessStoryTestMedium";
import WellnessStoryTestHard from "./WellnessStoryTestHard";

const WellnessStoryTest = () => {
  const {testId} = useParams();
  const className = 'WellnessStoryTest';

  return (
    <div className={className}>
      {testId.toLowerCase() === 'easy' && (<WellnessStoryTestEasy />)}
      {testId.toLowerCase() === 'medium' && (<WellnessStoryTestMedium />)}
      {testId.toLowerCase() === 'hard' && (<WellnessStoryTestHard />)}
    </div>
  )
}

export default WellnessStoryTest;