import {
  FaHandHoldingMedical,
  FaHospital,
  FaHospitalUser,
} from "react-icons/fa";
import {VscOrganization} from 'react-icons/vsc'
export const userMenu = [
  {
    name: "Inventory",
    path: "/",
    icon: (
      <>
        <FaHospitalUser />
      </>
    ),
  },
  {
    name: "Donor",
    path: "/donor",
    icon: (
      <>
        <FaHandHoldingMedical />
      </>
    ),
  },
  {
    name: "Hospital",
    path: "/hospital",
    icon: (
      <>
        <FaHospital />
      </>
    ),
  }, 
  {
    name: "Organization",
    path: "/organization",
    icon: (
      <>
        <VscOrganization />
      </>
    ),
  },
];
