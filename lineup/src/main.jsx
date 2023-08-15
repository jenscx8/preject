import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import axios from "axios";
// import react router for the instructor profile
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import ErrorPage from "../components/ErrorPage.jsx";
import IndexPage from "../components/IndexPage.jsx";
import InstructorList from "../components/InstructorList.jsx";
import Profile from "../components/Profile.jsx";
import SignUpPage from "../components/SignUpPage.jsx";
import YourProfilePage from "../components/YourProfilePage.jsx";
import LoginPage from "../components/LoginPage.jsx";
import ResortLIst from "../components/ResortList.jsx";
// import react bootstrap for the sign up form modal

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route index element={<IndexPage />} />

      {/** */}
      <Route
        path="resorts"
        element={<ResortLIst />}
        loader={async (params) => {
          const res = await axios.get(`/api/resorts${params.resortId}`);
          return { instructors: res.data };
        }}
      />

      <Route
        path="instructors"
        element={<InstructorList />}
        loader={async () => {
          const res = await axios.get("/api/instructors");
          {
            /* params.resortId*/
          }
          return { instructors: res.data };
        }}
      />
      <Route
        path="instructors/:instructorId"
        element={<Profile />}
        loader={async ({ params }) => {
          const res = await axios.get(
            `/api/instructors/${params.instructorId}`
          );
          return { instructor: res.data };
        }}
      />

      <Route path="signup" element={<SignUpPage />} />

      <Route path="login" element={<LoginPage />} />

      <Route
        path="me"
        element={<YourProfilePage />}
        loader={async () => {
          const res = await axios.get("/api/profile");
          return { instructor: res.data };
        }}
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// add a resort route that will await axios.get('/api/resorts')
// create a resort list component that will render it
// in the link should route to a filtered instructor list
// change the instructor list route to pass in the params
