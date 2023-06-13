import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import HeroWellness from "../images/HeroWellness.png";
import "../styles/wellnessHome.scss";
import girlInsights from "../images/girlInsights.png";
import Quote from "../images/quote.svg";
import Testimonial1 from "../images/testimonial1.png";
import Testimonial2 from "../images/testimonial2.png";
import Testimonial3 from "../images/testimonial3.png";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase.config";

const WellnessHome = () => {
  const words = ["OWN", "Know", "Assess", "Maintain", "Protect"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState(1);
  const [user, error] = useAuthState(auth);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [words.length]);
  return (
    <div className="wellness_homepage">
      <div className="hero_wellness">
        <div className="hero_right">
          <div className="hero_right_header">
            <TransitionGroup>
              <CSSTransition
                key={currentWordIndex}
                timeout={1000}
                classNames="fade"
              >
                <span>{words[currentWordIndex]}</span>
              </CSSTransition>
            </TransitionGroup>{" "}
            your Mental Health with Self.
          </div>
          <p className="subtitle">
            Take quick assessments and learn about your well-being.
          </p>
          {user ? (
            <Link to="/wellness/dashboard" className="hero_right_btn">
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link to="/wellness/signup" className="hero_right_btn">
                Sign Up
              </Link>
              <span className="question">
                Already have an account,{" "}
                <Link to="/wellness/login">
                  <b>Login</b>
                </Link>
              </span>
            </>
          )}
        </div>
        <img src={HeroWellness} alt="" />
      </div>
      <div className="banner">
        <div className="content">
          <h2>A holistic view of you.</h2>
          <p>
            With everything in one place we can combine the psychometric and
            qualitative analysis with AI to help you understand your strengths,
            weakness, and everything else
          </p>
          {user && (
            <Link to="/wellness/dashboard" className="profile_btn">
              Go to profile
            </Link>
          )}
        </div>
      </div>
      <div className="insights">
        <div className="tabs">
          <h3>Insights into your mental health in minutes</h3>
          <button
            style={{ color: selectedTab === 1 ? "blue" : "black" }}
            onClick={() => setSelectedTab(1)}
            className="selector"
          >
            Depression
          </button>
          <button
            style={{ color: selectedTab === 2 ? "blue" : "black" }}
            onClick={() => setSelectedTab(2)}
            className="selector"
          >
            Loneliness
          </button>
          <button
            style={{ color: selectedTab === 3 ? "blue" : "black" }}
            onClick={() => setSelectedTab(3)}
            className="selector"
          >
            Anxiety
          </button>
          <button
            style={{ color: selectedTab === 4 ? "blue" : "black" }}
            onClick={() => setSelectedTab(4)}
            className="selector"
          >
            Stress
          </button>
          <Link>Learn More</Link>
        </div>
        <div className="content">
          {selectedTab === 1 && (
            <div className="item">
              <img src={girlInsights} alt="" />
              <p>Mutiple Assessments - 1</p>
            </div>
          )}
          {selectedTab === 2 && (
            <div className="item">
              <img src={girlInsights} alt="" />
              <p>Mutiple Assessments - 2</p>
            </div>
          )}
          {selectedTab === 3 && (
            <div className="item">
              <img src={girlInsights} alt="" />
              <p>Mutiple Assessments - 3</p>
            </div>
          )}
          {selectedTab === 4 && (
            <div className="item">
              <img src={girlInsights} alt="" />
              <p>Mutiple Assessments - 4</p>
            </div>
          )}
        </div>
      </div>
      <div className="create_wellbeing">
        <h2>Create your own wellbeing baseline</h2>
        <div className="box"></div>
        <div className="columns">
          <div className="col">
            <p>
              You shouldn’t have to pay hundreds of dollars to a professional to
              have a wellbeing checkin (annual physicals are covered so should
              your mentals)
            </p>
          </div>
          <div className="col">
            <p>
              Track your physical, emotional, and mental wellbeing over time
              across many attributes.
            </p>
          </div>
          <div className="col">
            <p>
              OWN your data and have access to your confidential physical and
              mental health record and history whenever you want it and wherever
              you need it.
            </p>
          </div>
        </div>
      </div>
      <div className="banner">
        <div className="content">
          <h2>
            Protect yourself with preventative and proactive mental health
          </h2>
          {user && (
            <Link to="/wellness/dashboard" className="profile_btn">
              Go to dashboard
            </Link>
          )}
        </div>
      </div>
      <div className="testimonials">
        <h2>Testimonials</h2>
        <div className="content">
          <div className="testimonial one">
            <img className="quote" src={Quote} alt="quote" />
            <img src={Testimonial1} alt="user" />
            <p>
              I used to think I knew myself, but Self helped me finally put a
              complete picture of myself together.
              <br />
              <br />
              -- Anonymous
            </p>
          </div>
          <div className="testimonial">
            <img className="quote" src={Quote} alt="quote" />
            <img src={Testimonial2} alt="user" />
            <p>
              I used to think I knew myself, but Self helped me finally put a
              complete picture of myself together.
              <br />
              <br />
              -- Anonymous
            </p>
          </div>
          <div className="testimonial">
            <img className="quote" src={Quote} alt="quote" />
            <img src={Testimonial3} alt="user" />
            <p>
              I used to think I knew myself, but Self helped me finally put a
              complete picture of myself together.
              <br />
              <br />
              -- Anonymous
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WellnessHome;
