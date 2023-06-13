import './WellnessDashboardTests.css';
import formCategories from "./formCategories";

const WellnessDashboardTests = ({userTestsData}) => {
  const className = 'WellnessDashboardTests';
  return (
    <div className={className}>
      <div className={`${className}-container`}>
        <div className={`${className}-categoryTest`} style={{fontWeight: "bold", borderBottom: "thin solid #ccc", padding: "16px 8px"}}>
          <div/>
          {/*<div>Status</div>*/}
          <div>Score</div>
          <div>Date</div>
          <div/>
        </div>
        {formCategories.map(category => (
          <div className={`${className}-categoryContainer`} key={`${category.title.replace(/\s/gi, "_")}`}>
            <div className={`${className}-categoryTitle`}>{category.title}</div>
            <div className={`${className}-categoryTestsContainer`}>
              {category.tests.map((test, index) => (
                <div key={`${category.title.replace(/\s/gi, "_")}-${index}`} className={`${className}-categoryTest`}>
                  <div>
                    {test.title || category.title}
                  </div>
                  {/*<div>*/}
                  {/*  -*/}
                  {/*</div>*/}
                  <div>
                    {userTestsData[test.key] ? userTestsData[test.key].score : "-"}
                  </div>
                  <div>
                    {userTestsData[test.key] ? new Date(userTestsData[test.key].created).toLocaleDateString() : "-"}
                  </div>
                  <div>
                    <a className={`${className}-testLink`} href={test.url}>{userTestsData[test.key] ? "Retake test" : "Take test"}</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
};

export default WellnessDashboardTests;