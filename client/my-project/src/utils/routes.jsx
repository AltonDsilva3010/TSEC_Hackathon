import App from "../App";
import RegistrationForm from "../Components/Common/RegistrationForm";
import HomePage from "../Components/HomePage/HomePage";
import RegistrationPage from "../Components/Common/RegistrationPage";
export const routers = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/register",
    element: <RegistrationPage />,
    children: [
      {
        index: true,
        element: <RegistrationForm />,
      },
    ],
  },
];
