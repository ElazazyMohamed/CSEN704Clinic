import PeopleIcon from "@mui/icons-material/People";
import ArticleIcon from "@mui/icons-material/Article";
import InventoryIcon from "@mui/icons-material/Inventory";

export const DoctorNavbarItems = [
  {
    id: 0,
    icon: <PeopleIcon />,
    label: "User Management",
    route: "authentication",
  },
  {
    id: 1,
    icon: <ArticleIcon />,
    label: "Doctors' Registrations",
    route: "authentication",
  },
  {
    id: 3,
    icon: <InventoryIcon />,
    label: "Health Packages",
    route: "hosting",
  },
];
