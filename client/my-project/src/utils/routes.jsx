import App from "../App";
import  HomePage from "../Components/HomePage/HomePage";
import UserDashboard from "../Components/UserDashboard/UserDashboard";
import RegistrationForm from "../Components/Common/RegistrationForm";
import RegistrationPage from "../Components/Common/RegistrationPage";
import DisplayPropertyPage from "../Components/Common/DisplayPropertyPage";
export const routers = [
  {
    path: "/",
    element: <App />,
    children: [{
      index: true,
      element: <HomePage />
    },
    {
      path : "/property/:id",
      element : <DisplayPropertyPage/>
    },
    {
      path : "/register",
      element : <RegistrationPage/>,
      children : [
        {
          index : true,
          element : <RegistrationForm/>
        },
      ],
    },
  ]
  },
];
