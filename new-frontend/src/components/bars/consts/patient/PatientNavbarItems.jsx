import PeopleIcon from "@mui/icons-material/People";
import ArticleIcon from "@mui/icons-material/Article";
import InventoryIcon from "@mui/icons-material/Inventory";
import { AppbarLabel } from "../enums";
export const PatientNavbarItems = [
  {
    id: 0,
    icon: <PeopleIcon />,
    label: "Family Members",
    route: "authentication",
    appbarLabel: AppbarLabel.ViewFamilyMembers,
  },
  {
    id: 1,
    icon: <ArticleIcon />,
    label: "Appointments",
    route: "authentication",
    appbarLabel: AppbarLabel.ViewAppointments,
  },
  {
    id: 3,
    icon: <InventoryIcon />,
    label: "Prescriptions",
    route: "hosting",
    appbarLabel: "",
  },
  {
    id: 4,
    icon: <InventoryIcon />,
    label: "Doctors",
    route: "hosting",
    appbarLabel: "",
  },
  {
    id: 5,
    icon: <InventoryIcon />,
    label: "Packages",
    route: "hosting",
  },
];
