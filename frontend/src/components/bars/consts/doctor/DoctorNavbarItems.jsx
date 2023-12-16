import VaccinesIcon from "@mui/icons-material/Vaccines";
import ArticleIcon from "@mui/icons-material/Article";
import InventoryIcon from "@mui/icons-material/Inventory";

import { AppbarLabel } from "../enums";

export const DoctorNavbarItems = [
  {
    id: 0,
    icon: <InventoryIcon />,
    label: "Patients",
    route: "hosting",
  },
  {
    id: 1,
    icon: <ArticleIcon />,
    label: "Appointments Management",
    route: "authentication",
    appbarLabel: AppbarLabel.ViewAppointments,
  },
  {
    id: 3,
    icon: <VaccinesIcon />,
    label: "Medicines",
    route: "authentication",
  },
  // {
  //   id: 4,
  //   icon: <VaccinesIcon />,
  //   label: "Health Records",
  //   route: "authentication",
  // },
  {
    id: 5,
    icon: <VaccinesIcon />,
    label: "Doctor's Prescriptions",
    route: "authentication",
  },
];
