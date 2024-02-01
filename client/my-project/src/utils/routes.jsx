import App from "../App";
import HomePage from "../Components/HomePage/HomePage";
import UserDashboard from "../Components/UserDashboard/UserDashboard";
import RegistrationForm from "../Components/Common/RegistrationForm";
import RegistrationPage from "../Components/Common/RegistrationPage";
import ListingPage from "../Components/Listing/ListingPage";
import LandRegisterForm from "../Components/Listing/LandRegisterForm";
import ApartmentRegistrationForm from "../Components/Listing/ApartmentRegistrationForm";
import DisplayPropertyPage from "../Components/Common/DisplayPropertyPage";
export const routers = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/user/dashboard",
        element: <userDashboard />,
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
      {
        path: "/listing",
        element: <ListingPage />,
        children: [
          {
            index: true,
            element: <LandRegisterForm />,
          },
        ],
      },
      {
        path: "/listingapt",
        element: <ListingPage />,
        children: [
          {
            index: true,
            element: <ApartmentRegistrationForm />,
          },
        ],
      },
      {
        path: "/property/:id",
        element: <DisplayPropertyPage/>,
      },
    ],
  },
  // {
  //   path: "/register",
  //   element: <RegistrationPage />,
  //   children: [
  //     {
  //       index: true,
  //       element: <RegistrationForm />,
  //     },
  //   ],
  // },
  // {
  //   path: "/listing",
  //   element: <ListingPage />,
  //   children: [
  //     {
  //       index: true,
  //       element: <LandRegisterForm />,
  //     },
  //   ],
  // },
];
