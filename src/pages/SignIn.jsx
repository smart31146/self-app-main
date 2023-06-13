import React, { useState } from "react";
import { isFormCompleted, signIn } from "../utils";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "../styles/signin.scss";
import Spinner from "../components/Spinner";
const SignIn = () => {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    source: "Other",
    otherInfo: "",
    friend: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const result = await signIn(
      formState.email,
      formState.password,
      formState.firstName,
      formState.lastName,
      formState.source,
      formState.otherInfo,
      formState.friend,
      setIsLoading,
      setError,
      userId
    );
    return result;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="form-container">
      {!isLoading && (
        <>
          <h2>Create Account</h2>
          <form>
            <div className="names">
              <input
                name="firstName"
                value={formState.firstName}
                onChange={(e) => handleInputChange(e)}
                type="text"
                placeholder="FirstName"
              />
              <input
                name="lastName"
                type="text"
                value={formState.last}
                onChange={(e) => handleInputChange(e)}
                placeholder="LastName"
              />
            </div>
            <input
              name="email"
              value={formState.email}
              onChange={(e) => handleInputChange(e)}
              type="email"
              placeholder="Email"
            />
            <input
              name="password"
              value={formState.password}
              onChange={(e) => handleInputChange(e)}
              type="password"
              placeholder="Password"
            />
            <div className="hear_about_us">
              <h3>How did you hear about us?</h3>
              <div className="radio-wrapper">
                <label>Facebook</label>
                <input
                  type="radio"
                  name="source"
                  value="Facebook"
                  checked={formState.source === "Facebook"}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <div className="radio-wrapper">
                <label>Reddit</label>
                <input
                  type="radio"
                  value="Reddit"
                  name="source"
                  checked={formState.source === "Reddit"}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <div className="radio-wrapper">
                <label>Instagram</label>
                <input
                  type="radio"
                  value="Instagram"
                  name="source"
                  checked={formState.source === "Instagram"}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <div className="radio-wrapper">
                Micah
                <label></label>
                <input
                  type="radio"
                  name="source"
                  value="Micah"
                  checked={formState.source === "Micah"}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <div className="radio-wrapper">
                <label>Friend</label>
                <input
                  type="radio"
                  name="source"
                  value="Friend"
                  checked={formState.source === "Friend"}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              {formState.source === "Friend" && (
                <>
                  <label>Friend's Name:</label>
                  <input
                    type="text"
                    value={formState.friend}
                    onChange={(e) => handleInputChange(e)}
                  />
                </>
              )}

              <div className="radio-wrapper">
                <label>Other</label>
                <input
                  type="radio"
                  value="Other"
                  name="source"
                  checked={formState.source === "Other"}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              {formState.source === "Other" && (
                <input
                  type="text"
                  value={formState.otherInfo}
                  onChange={(e) => handleInputChange(e)}
                />
              )}
            </div>
            <span className="question">
              Already have an account,{" "}
              <Link to={"/login"}>
                <b>Login</b>
              </Link>
            </span>
            <button
              className={
                !isFormCompleted(formState)
                  ? "disabled_button"
                  : "enabled_button"
              }
              disabled={!isFormCompleted(formState)}
              onClick={async (e) => {
                const result = await handleSignIn(e);
                if (result) return navigate("/discover/dashboard");
                else {
                  return navigate("/signin");
                }
              }}
            >
              Sign Up
            </button>
          </form>
        </>
      )}
      {isLoading && <Spinner />}
      {error && <span className="error">{error}</span>}
    </div>
  );
};

export default SignIn;
