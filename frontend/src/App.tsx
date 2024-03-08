import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Registration from "./components/Registration";
import Login from "./components/Login";
import UserDashboard from "./components/user/Dashboard";
import AddShipment from "./components/user/AddShipment";
import TrackShipment from "./components/user/TrackShipment";
import AdminDashboard from "./components/admin/Dashboard";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Registration />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/user_dashboard",
      element: <UserDashboard />,
    },
    {
      path: "/admin_dashboard",
      element: <AdminDashboard />,
    },
    {
      path: "/create_shipment",
      element: <AddShipment />,
    },
    {
      path: "/shipment_tracking",
      element: <TrackShipment />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
