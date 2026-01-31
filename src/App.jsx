import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Navbar from "./components/common/Navbar.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import UpdatePassword from "./pages/UpdatePassword.jsx";
import Error from "./pages/Error.jsx";
import OpenRoute from "./components/core/Auth/OpenRoute.jsx";
import PrivateRoute from "./components/core/Auth/PrivateRoute.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import MyProfile from "./components/core/Dashboard/MyProfile.jsx";
import Settings from "./components/core/Dashboard/Settings/Settings.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import CourseDetails from "./pages/CourseDetails.jsx";
import Catalog from "./pages/Catalog.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserDetails } from "./services/operations/profileAPI.js";
import InstructorSection from "./components/core/HomePage/InstructorSection.jsx";
import { ACCOUNT_TYPE } from "./Util/constants.js";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = JSON.parse(localStorage.getItem("token"));
      dispatch(getUserDetails(token, navigate));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex min-h-screen w-screen flex-col bg-richblack-900 font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="courses/:courseId" element={<CourseDetails />} />
        <Route path="catalog/:catalogName" element={<Catalog />} />
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />

        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />

        <Route
          path="reset-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />

        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />

        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/settings" element={<Settings />} />

           {/* Instructor Routes */}
          <Route path="dashboard/instructor" element={
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR ? <InstructorSection /> : <Error />
          } />
          {/* <Route path="dashboard/my-courses" element={
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR ? <MyCourses /> : <Error />
          } /> */}
          {/* <Route path="dashboard/add-course" element={
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR ? <AddCourse /> : <Error />
          } />
          <Route path="dashboard/edit-course/:courseId" element={
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR ? <EditCourse /> : <Error />
          } /> */}
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
