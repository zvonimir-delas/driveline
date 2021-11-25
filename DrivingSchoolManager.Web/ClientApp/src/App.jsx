import React from "react";
import "./styles/main.scss";
import "./styles/common/_selectors.scss";
import "./styles/common/_crud-table.scss";
import "./styles/common/_pagination.scss";
import "react-day-picker/lib/style.css";

// Helper functions
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { configureAxios } from "./services/config";
// Helper components
import ScrollRestore from "./components/helpers/ScrollRestore";
// Marketplace components
import Login from "./components/screens/marketplace/login/Login";
import Marketplace from "./components/screens/marketplace/driving-schools/Marketplace";
import DrivingSchoolDetails from "./components/screens/marketplace/driving-school-details/DrivingSchoolDetails";
// Student components
import StudentProfile from "./components/screens/student/profile/StudentProfile";
import Scheduler from "./components/screens/student/scheduler/Scheduler";
import StudentEvents from "./components/screens/student/events/StudentEvents";
// Instructor components
import InstructorProfile from "./components/screens/instructor/profile/InstructorProfile";
import InstructorEvents from "./components/screens/instructor/events/InstructorEvents";
import Students from "./components/screens/instructor/students/Students";
// Admin components
import AdminLayout from "./components/layouts/AdminLayout";
import AdminUsers from "./components/screens/admin/users/AdminUsers";
import AdminEvents from "./components/screens/admin/events/AdminEvents";
import AdminGroups from "./components/screens/admin/groups/AdminGroups";

const App = () => {
  configureAxios();

  return (
    <BrowserRouter>
      {/* Marketplace */}
      <Route exact path="/marketplace" render={() => <Marketplace />} />
      <Route exact path="/login" render={() => <Login />} />
      <Route
        exact
        path="/marketplace/:id"
        render={(props) => (
          <>
            <ScrollRestore />
            <DrivingSchoolDetails {...props} />
          </>
        )}
      />

      {/* Student */}
      <Route path="/student">
        <Route
          exact
          path="/student/profile"
          render={() => <StudentProfile />}
        />
        <Route exact path="/student/events" render={() => <StudentEvents />} />
        <Route exact path="/student/scheduler" render={() => <Scheduler />} />
      </Route>

      {/* Instructor */}
      <Route path="/instructor">
        <Route
          exact
          path="/instructor/profile"
          render={() => <InstructorProfile />}
        />
        <Route
          exact
          path="/instructor/events"
          render={() => <InstructorEvents />}
        />
        <Route exact path="/instructor/students" render={() => <Students />} />
      </Route>

      {/* Admin */}
      <Route path="/admin">
        <AdminLayout />
        <Route exact path="/admin/users" render={() => <AdminUsers />} />
        <Route exact path="/admin/groups" render={() => <AdminGroups />} />
        <Route exact path="/admin/events" render={() => <AdminEvents />} />
      </Route>

      <Route exact path="/" render={() => <Redirect to="/marketplace" />} />
    </BrowserRouter>
  );
};

export default App;
