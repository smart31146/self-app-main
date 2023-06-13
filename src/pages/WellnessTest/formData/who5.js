export default {
  title: "WHO-5",
  time: "1 min",
  description: "The WHO-5 is a questionnaire that measures current mental well-being (time frame the previous two weeks) developed by the World Health Organization.",
  prompt: "Over the past two weeks,",
  questions: [
    {
      question: "I have felt cheerful and in good spirits",
      name: "cheerful"
    },
    {question: "I have felt calm and relaxed", name: "calm"},
    {
      question: "I have felt active and vigorous",
      name: "active"
    },
    {question: "I woke up feeling fresh and rested", name: "rested"},
    {
      question: "My daily life has been filled with things that interest me",
      name: "interest"
    }
  ],
  scale: [
    "At no time",
    "Some of the time",
    "Less than half of the time",
    "More than half of the time",
    "Most of the time",
    "All of the time"
  ],
  getScore: (questions, scale, values) => {
    const finalValue = questions.reduce((acc, question, index) => {
      const questionValue = values[question.name];
      acc.score = acc.score + scale.indexOf(questionValue);
      acc.values[index + 1] = scale.indexOf(questionValue);
      acc.originalValues[question.name] = questionValue;
      return acc
    }, {score: 0, values: {}, originalValues: {}});
    finalValue.score = finalValue.score * 4;
    return finalValue;
  },
  minScore: 0,
  maxScore: 200
}
