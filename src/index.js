import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import Footer from "./components/Footer";
import DiscoverHome from "./pages/DiscoverHome";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import DiscoverDashboard from "./pages/DiscoverDashboard";
import SignIn from "./pages/SignIn";
import About from "./pages/About";
import ComingSoon from "./components/ComingSoon";
import "./styles/styles.scss";
import Personal from "./pages/Personal";
import Relationship from "./pages/Relationship";
import Career from "./pages/Career";
import MobileNavbar from "./components/MobileNavbar";
import SharingLink from "./pages/SharingLink";
import ShareCard from "./pages/ShareCard";
import WellnessDashboard from "./pages/WellnessDashboard";
import WellnessHome from "./pages/WellnessHome";
import SignInWellness from "./pages/SignInWellness";
import LoginWellness from "./pages/LoginWellness";
import WellnessGettingStarted from "./pages/WellnessGettingStarted";
import WellnessGettingStartedEncouraged from "./pages/WellnessGettingStartedEncouraged";
import WellnessTest from "./pages/WellnessTest";
import WellnessStoryIntro from "./pages/WellnessStoryIntro";
import WellnessDayOne from "./pages/WellnessDayOne";
import WellnessStoryTest from "./pages/WellnessStoryTest";
import { ThemeContext } from "./contexts/ThemeContext";
import ThemeToggleButton from "./components/ThemeToggleButton";

const AppLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === "/" ? true : false;
  const [colorMode, setColorMode] = useState('Woman');

  return (
    <>
      <ThemeContext.Provider value={{ colorMode, setColorMode }}>
        <div className={`app theme-${colorMode}`}>
          {!isHome ? <Navbar /> : ""}
          {!isHome ? <MobileNavbar /> : ""}
          <Outlet />
          {!isHome ? <Footer /> : ""}
          <ThemeToggleButton />
        </div>
      </ThemeContext.Provider>
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/discover",
        element: <DiscoverHome />,
      },
      {
        path: "discover/comingsoon",
        element: <ComingSoon />,
      },
      {
        path: "discover/about",
        element: <About />,
      },
      {
        path: "signup",
        element: <SignIn />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "discover/dashboard",
        element: <DiscoverDashboard />,
      },
      {
        path: "shared-profile/:id",
        element: <SharingLink />,
      },
      {
        path: "sharing-card/:type/:id",
        element: <ShareCard />,
      },
      {
        path: "discover/personal",
        element: <Personal />,
      },
      {
        path: "discover/relationship",
        element: <Relationship />,
      },
      {
        path: "discover/career",
        element: <Career />,
      },
      {
        path: "wellness",
        element: <WellnessHome />,
      },
      {
        path: "wellness/dashboard",
        element: <WellnessDashboard />,
      },
      {
        path: "wellness/getting-started-essentials",
        element: <WellnessGettingStarted />,
      },
      {
        path: "wellness/getting-started-encouraged",
        element: <WellnessGettingStartedEncouraged />,
      },
      {
        path: "wellness/test/:testId",
        element: <WellnessTest />,
      },
      {
        path: "wellness/signup",
        element: <SignInWellness />,
      },
      {
        path: "wellness/login",
        element: <LoginWellness />,
      },
      {
        path: "wellness/story-test/:testId",
        element: <WellnessStoryTest />,
      },
      {
        path: "wellness/signup",
        element: <SignInWellness />,
      },
      {
        path: "wellness/login",
        element: <LoginWellness />,
      },
      {
        path: "wellness/story-intro",
        element: <WellnessStoryIntro />,
      },
      {
        path: "wellness/story-day-one",
        element: <WellnessDayOne />,
      }
    ]
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
