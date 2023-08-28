import { lazy } from "react";
import { Navigate } from "react-router-dom";
import UserTable from "../views/tables/UsersTablePage.js";
import FormNews from "../views/formInput/NewsFormPage.js";
import EditNewsFormPage from "../views/formInput/NewsFormEditPage.js";
import LoginPage from "../views/auth/LoginPage.js";
import EventFormPage from "../views/formInput/EventsFormPage.js";
import EditEventFormPage from "../views/formInput/EventsFormEditPage.js";
import DiscussionFormPage from "../views/formInput/DiscussionFormPage.js";
import UserFormPage from "../views/formInput/UserFormPage.js";
import EditDiscussionFormPage from "../views/formInput/DiscussionFormEditPage.js";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout/FullLayout.js"));
/****End Layouts*****/

/*****Tables******/
const NewsTable = lazy(() => import("../views/tables/NewsTablePage.js"));
const EventsTable = lazy(() => import("../views/tables/EventsTablePage.js"));
const TopicDiscussionTable  =lazy(() => import("../views/tables/TopicDiscussionTablePage.js"));

/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: localStorage.getItem("authToken") ? <Navigate to="tables/news-table"/> : <Navigate to="login" /> },
      { path: "tables/news-table", element: localStorage.getItem("authToken") ? <NewsTable /> :<Navigate to="../../login" />},
      { path: "tables/events-table", element: localStorage.getItem("authToken") ? <EventsTable />:<Navigate to="../../login" /> },
      { path: "tables/users-table", element: localStorage.getItem("authToken") ? <UserTable />:<Navigate to="../../login" /> },
      { path: "tables/topic-discussion-table", element: localStorage.getItem("authToken") ? <TopicDiscussionTable />:<Navigate to="../../login" /> },
      { path: "/form-layouts/form-news", element: localStorage.getItem("authToken") ? <FormNews /> :<Navigate to="../../login" />},
      { path: "/form-layouts/form-event", element: localStorage.getItem("authToken") ? <EventFormPage /> :<Navigate to="../../login" />},
      { path: "/form-layouts/form-discus", element: localStorage.getItem("authToken") ? <DiscussionFormPage /> :<Navigate to="../../login" />},
      { path: "/form-layouts/form-user", element: localStorage.getItem("authToken") ? <UserFormPage /> :<Navigate to="../../login" />},
      { path: "/form-layouts/edit-form-event/:eventId", element: localStorage.getItem("authToken") ? <EditEventFormPage />:<Navigate to="../../login" /> },
      { path: "/form-layouts/edit-form-news/:newsId", element: localStorage.getItem("authToken") ? <EditNewsFormPage />:<Navigate to="../../login" /> },
      { path: "/form-layouts/edit-form-discus/:discussionId", element: localStorage.getItem("authToken") ? <EditDiscussionFormPage />:<Navigate to="../../login" /> },
     ],
  },
  {
    path: "/login",
    element:!localStorage.getItem("authToken") ? <LoginPage /> : <Navigate to="/" />, 
  },
];

export default ThemeRoutes;
