import PeopleIcon from "@mui/icons-material/People";
import ArticleIcon from "@mui/icons-material/Article";
import InventoryIcon from "@mui/icons-material/Inventory";
import { AppbarLabel } from "../enums";

export const AdminNavbarItems = [
  {
    id: 0,
    icon: <PeopleIcon />,
    label: "User Management",
    route: "authentication",
    appbarLabel: AppbarLabel.ViewFamilyMembers,
  },
  {
    id: 1,
    icon: <ArticleIcon />,
    label: "Doctors' Registrations",
    route: "authentication",
    appbarLabel: "",
  },
  {
    id: 3,
    icon: <InventoryIcon />,
    label: "Health Packages",
    route: "hosting",
  },
];
