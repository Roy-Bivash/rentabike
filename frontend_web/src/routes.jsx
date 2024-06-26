import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Error404 from "./pages/error404/Error404";
import Accueil from "./pages/accueil/Accueil";
import Map from "./pages/map/Map";
import Authentification from "./pages/auth/Authentitifcation";
import Contact from "./pages/contact/Contact";
import Reservation from "./pages/reservation/Reservation";
import CurrentRide from "./pages/currentRide/CurrentRide";
import Account from "./pages/account/Account";
import Historique from "./pages/historique/Historique";
import Support from "./pages/support/Support";
import Materiel from "./pages/materiel/Materiel";
import Maintenance from "./pages/maintenance/Maintenance";


// chamin de l'application :
const router = createBrowserRouter([
  {
    path: "/",
    element: <Accueil />
  },
  {
    path: "map",
    element: <Map />
  },
  {
    path: "account",
    element: <Account />
  },
  {
    path: "historique",
    element: <Historique />
  },
  {
    path: "authentification/:type",
    element: <Authentification />
  },
  {
    path: "/*",
    element: <Error404 />
  },
  {
    path: "contact",
    element: <Contact />
  },
  {
    path: "reservation/:stationId",
    element: <Reservation />
  },
  {
    path: "currentRide",
    element: <CurrentRide />
  },
  {
    path: "/materiel",
    element: <Materiel />
  },
  {
    path: "support",
    element: <Support />
  },
  {
    path: "maintenance",
    element: <Maintenance />
  }
]);

// composant de routage
export default function Routes() {
  return <RouterProvider router={router} />;
}