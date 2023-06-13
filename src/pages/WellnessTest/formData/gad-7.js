export default {
  title: "GAD-7",
  time: "2 min",
  description: "The GAD-7 is the most commonly used screener for anxiety and has been used in 2,500 peer reviewed publications.",
  prompt: "Over the last 2 weeks, how often have you been bothered by the following problems?",
  questions:  [
    {
      question: "Feeling nervous, anxious or on edge?",
      name: "nervous"
    },
    {
      question: "Not being able to stop or control worrying?",
      name: "control"
    },
    {
      question: "Worrying too much about different things?",
      name: "different"
    },
    {
      question: "Trouble relaxing?",
      name: "relaxing"
    },
    {
      question: "Being so restless that it is hard to sit still?",
      name: "restless"
    },
    { question: "Becoming easily annoyed or irritable?", name: "annoyed" },
    {
      question: "Feeling afraid as if something awful might happen?",
      name: "afraid"
    }
  ],
  scale: [
    "Not at all",
    "Several days",
    "More than half the days",
    "Nearly every day"
  ],
  getScore: (questions, scale, values) => {
    return questions.reduce((acc, question, index) => {
      const questionValue = values[question.name];
      acc.originalValues[question.name] = questionValue;
      acc.values[index + 1] = scale.indexOf(questionValue);
      acc.score = acc.score + scale.indexOf(questionValue);
      return acc;
    }, {score: 0, values: {}, originalValues: {}})
  },
  minScore: 0,
  maxScore: 21,
  labels: [
    {
      range: "0-4",
      description: "Minimal Anxiety"
    },
    {
      range: "5-9",
      description: "Mild Anxiety"
    },
    {
      range: "10-14",
      description: "Moderate Anxiety"
    },
    {
      range: "15-21",
      description: "Severe Anxiety"
    }
  ]
}
