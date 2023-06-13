import "./Button.css";

const Button = ({ children, type = "default", buttonType = "button", onClick, disabled }) => {
  const className = ["Button"];
  if (type === "primary") className.push("Button-primary");
  if (disabled) className.push("Button-disabled");
  return (
    <button
      type={buttonType}
      disabled={disabled}
      className={className.join(" ")}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
