import "./TestLink.css";

const TestLink = ({ isDone, link }) => {
  const className = "TestLink";
  if (isDone) return <div className={`${className}-testDoneStatus`}>Done</div>;

  return (
    <a href={link} className={`${className}-takeTestLink`}>
      Take
    </a>
  );
};

export default TestLink;
