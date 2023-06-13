import "./WellnessGettingStarted.css";
import Button from "../../components/Button";
import TestLink from "../../components/TestLink";
import {useAuthState} from "react-firebase-hooks/auth";
import {testsData} from './testsData';
import {useState, useEffect} from "react";
import {db, auth} from "../../firebase.config";
import {getDocs, collection, where, getDoc, query} from "firebase/firestore";

const WellnessGettingStarted = () => {
  const className = "WellnessGettingStarted";
  const [tests, setTests] = useState(testsData);
  const [user] = useAuthState(auth);

  useEffect(() => {
    if(user && user.uid) {
      const testsRef = collection(db, "WellnessTestResults");
      const q = query(testsRef, where("user", "==", user.uid));
      getDocs(q).then(res => {
        const testsAsMap = {};
        res.forEach((doc) => {
          testsAsMap[doc.data().formType] = true;
        });
        const updatedTests = tests.map(test => {
          if(testsAsMap[test.key]) {
            return {...test, isDone: true};
          }
          return test
        });
        setTests(updatedTests);
      });
    }
  }, [user])

  return (
    <div className={className}>
      <h1 className={`${className}-title`}>Getting Started Essentials</h1>
      <div className={`${className}-content`}>
        <div className={`${className}-spaceBottom`}>
          To begin, let’s cover the basic areas of mental health. We encourage
          you to do all the basics now, but you are free to take them if and
          when you want.
        </div>
        <div>
          In under 15 minutes, you’ll have an overview of how you are doing
          across the following categories:
        </div>

        <ul className={`${className}-testList`}>
          {tests.map((test) => {
            return (
              <li
                key={`test-row-${test.testLink}`}
                className={`${className}-testListItem`}
              >
                <div>{test.name}</div>
                <div>{test.duration}</div>
                <div>
                  <TestLink isDone={test.isDone} link={test.testLink} />
                </div>
                <div>
                  {test.isDone ? (
                    <img
                      className={`${className}-statusIcon`}
                      src={"/icons/check_mark.png"}
                      alt={"check mark icon"}
                    />
                  ) : (
                    <img
                      className={`${className}-statusIcon`}
                      src={"/icons/empty_checkbox.png"}
                      alt={"empty checkbox icon"}
                    />
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={`${className}-buttonContainer`}>
        <a href={"/wellness/dashboard"}>
          <Button type={"default"}>Go back</Button>
        </a>
        <a href={"/wellness/dashboard"}>
          <Button type={"primary"}>Dashboard</Button>
        </a>
      </div>
    </div>
  );
};

export default WellnessGettingStarted;
