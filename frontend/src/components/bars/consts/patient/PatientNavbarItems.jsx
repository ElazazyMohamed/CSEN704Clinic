import PeopleIcon from "@mui/icons-material/People";
import ArticleIcon from "@mui/icons-material/Article";
import InventoryIcon from "@mui/icons-material/Inventory";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
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
    icon: <LocalHospitalIcon />,
    label: "Appointments",
    route: "authentication",
    appbarLabel: AppbarLabel.ViewAppointments,
  },
  {
    id: 3,
    icon: <VaccinesIcon />,
    label: "Prescriptions",
    route: "hosting",
    appbarLabel: "",
  },
  {
    id: 4,
    icon: <MonitorHeartIcon />,
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
