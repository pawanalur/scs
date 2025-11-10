import { lazy } from "react";

import InProgressScreen from "./MainBar/screens/InProgressScreen";
import UserHome from "./UserHome";

const QuestScreen = lazy(() => import("./MainBar/screens/QuestScreen"));
const PhysicalLog = lazy(() => import("./MainBar/screens/PhysicalLogScreen"));
const MentalLog = lazy(() => import("./MainBar/screens/MentalLogScreen"));
const ShopScreen = lazy(() => import("./MainBar/screens/ShopScreen"));

export const userRoutes = {
  path: "/home",
  element: <UserHome />,
  children: [
    { index: true, element: <InProgressScreen /> },
    { path: "quests", element: <QuestScreen /> },
    { path: "physical-log", element: <PhysicalLog /> },
    { path: "mental-log", element: <MentalLog /> },
    { path: "shop", element: <ShopScreen /> },
  ],
};
