import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  deleteCompany,
  getSelectedCompanies,
} from "../../reducers/companySlice";
import {
  deleteEmployee,
  getSelectedEmployees,
} from "../../reducers/employeeSlice";
import {
  openCreateCompanyModal,
  openCreateEmployeeModal,
} from "../../reducers/uiSlice";
import { Button } from "../button";
import "./menu.scss";

const Menu = () => {
  const dispatch = useAppDispatch();

  const selectedCompanies = useAppSelector(getSelectedCompanies);
  const selectedEmployees = useAppSelector(getSelectedEmployees);

  const handleOpenCreateCompanyModal = () => dispatch(openCreateCompanyModal());
  const handleOpenCreateEmployeeModal = () =>
    dispatch(openCreateEmployeeModal());
  const handleDeleteCompanies = () => dispatch(deleteCompany());
  const handleDeleteEmployees = () => dispatch(deleteEmployee());

  return (
    <div className="menu">
      <Button onClick={handleOpenCreateCompanyModal}>Create Company</Button>
      <Button
        disabled={!selectedCompanies.length}
        onClick={handleDeleteCompanies}
      >
        Delete Companies
      </Button>
      <Button onClick={handleOpenCreateEmployeeModal}>Create Employee</Button>
      <Button
        disabled={!selectedEmployees.length}
        onClick={handleDeleteEmployees}
      >
        Delete Employees
      </Button>
    </div>
  );
};

export default Menu;
