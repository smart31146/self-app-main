import "./Form.css";
import RadioInput from "./RadioInput";
import { useForm } from "react-hook-form";

const Form = ({ questions, options, setFormState }) => {
  const formHook = useForm();
  const {
    register,
    handleSubmit,
    formState: {},
  } = formHook;
  const onSubmit = (data) => console.log(data);

  const handleFormChange = () => {
    const values = formHook.getValues();
    setFormState({
      values,
      isValid: !Object.values(values).includes(null),
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} onChange={handleFormChange}>
        {questions.map((question, index) => {
          return (
            <div key={`question_${question.name}`}>
              <RadioInput
                // handleChange={handleChange}
                // Some assessments have a consistent scale for each question, and others have different possible answers for each question
                options={options || question.answers}
                register={register}
                name={question.name}
                label={`${index + 1}. ${question.question}`}
              />
            </div>
          );
        })}
      </form>
    </div>
  );
};

export default Form;
