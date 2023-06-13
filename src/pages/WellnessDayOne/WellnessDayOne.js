import TestsList from "../../components/TestsList";
import {useState, useEffect} from 'react';
import './WellnessDayOne.css';
import {getStoryTests} from "./service";

const WellnessDayOne = () => {
  const className = 'WellnessDayOne';
  const [tests, setTests] = useState(null);

  useEffect(() => {
    getStoryTests().then(
      storyTests => setTests(storyTests)
    )
  }, [])

  if(!tests) return null;

  return (
    <div className={className}>
      <div className={`${className}__title`}>Todays's work</div>

      <div className={`${className}__content`}>
        <div>We’ll go through 3 prompts, each of increasing difficulty.</div>

        <div className={`${className}__tableContainer`}>
          <TestsList tests={tests} />
        </div>
      </div>
    </div>
  )
}

export default WellnessDayOne;