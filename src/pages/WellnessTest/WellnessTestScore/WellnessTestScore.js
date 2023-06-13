import './WellnessTestScore.css';
import Button from "../../../components/Button";

const WellnessTestScore = ({result, selectedFormData}) => {
  const className = 'WellnessTestScore';
  console.log("result", result)
  return (
    <div className={className}>
      <div className={`${className}-scoreContainer`}>
        <div>
          <div className={`${className}-scoreResultContainer`}>
            <div className={`${className}-scoreResultProgressBackground`}/>
            <div className={`${className}-scoreResultProgressValue`}>
              {result.score}
            </div>
          </div>
        </div>
        {selectedFormData.labels && (
          <div>
            <ul className={`${className}-scoreLabelsList`}>
              {selectedFormData.labels.map(label => (
                <li key={`label-${label.range}`} className={`${className}-scoreLabelsListItem`}>
                  <div className={`${className}-scoreLabelTitle`}>{label.range}</div>
                  <div>{label.description}</div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className={`${className}-buttonContainer`}>
        <a href={"/wellness/getting-started-essentials"}>
          <Button buttonType={"primary"}>Go back to Essentials</Button>
        </a>
      </div>
    </div>
  )
}

export default WellnessTestScore;