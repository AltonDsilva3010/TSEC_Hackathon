import App from "../App";
import  HomePage from "../Components/HomePage/HomePage";
import userDashboard from "../Components/UserDashboard/UserDashboard";
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
  },
];