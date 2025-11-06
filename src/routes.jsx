import { lazy } from "react";

import InProgressScreen from "./MainBar/views/InProgressScreen";
import UserHome from "./UserHome";

const QuestScreen = lazy(() => import("./MainBar/views/QuestScreen"));
const PhysicalLog = lazy(() => import("./MainBar/views/PhysicalLog"));
const MentalLog = lazy(() => import("./MainBar/views/MentalLog"));
const ShopScreen = lazy(() => import("./MainBar/views/ShopScreen"));

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
