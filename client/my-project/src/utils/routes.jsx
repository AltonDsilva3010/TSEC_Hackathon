import App from "../App";
import  HomePage from "../Components/HomePage/HomePage";
export const routers = [
  {
    path: "/",
    element: <App />,
    children: [{
      index: true,
      element: <HomePage />
    }]
  },
];