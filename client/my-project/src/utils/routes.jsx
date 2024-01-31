import App from "../App";
import  HomePage from "../Components/HomePage/HomePage";
import userDashboard from "../Components/UserDashboard/UserDashboard";
import RegistrationForm from "../Components/Common/RegistrationForm";
import RegistrationPage from "../Components/Common/RegistrationPage";
export const routers = [
  {
    path: "/",
    element: <App />,
    children: [{
      index: true,
      element: <HomePage />
    },
    {
      path : "/user/dashboard",
      element : <userDashboard/>
    }
  ]
  },{
    path : "/register",
    element : <RegistrationPage/>,
    children : [
      {
        index : true,
        element : <RegistrationForm/>
      },
    ],
  },
];
