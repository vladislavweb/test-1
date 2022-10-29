import {
  CompanyTable,
  CreateCompanyForm,
  CreateEmployeeForm,
  EditCompanyForm,
  EditEmployeeForm,
  EmployeesTable,
  Menu,
} from "../../components";
import "./main.scss";

const Main = () => {
  return (
    <div className="main">
      <Menu />
      <CompanyTable />
      <EmployeesTable />

      <EditCompanyForm />
      <EditEmployeeForm />
      <CreateCompanyForm />
      <CreateEmployeeForm />
    </div>
  );
};

export default Main;
