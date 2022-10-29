import { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { EmployeeRow } from "../row";
import { getSelectedCompanies } from "../../../reducers/companySlice";
import {
  getEmployees,
  getSelectedEmployees,
  loadEmployees,
  selectAllEmployees,
} from "../../../reducers/employeeSlice";
import "./table.scss";

import { useFetchEmployees } from "../../../api";

const EmployeesTable = () => {
  const dispath = useAppDispatch();

  const selectedCompanies = useAppSelector(getSelectedCompanies);
  const employees = useAppSelector(getEmployees);
  const selectedEmployees = useAppSelector(getSelectedEmployees);
  const theadRef = useRef<any>();
  const [page, setPage] = useState(1);

  const { isLoading, hasMore, fetchedEmployees } = useFetchEmployees(
    page,
    selectedCompanies
  );

  const observer: any = useRef();
  const lastEmployeeRowElement = useCallback(
    (node: any) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevValue) => prevValue + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  useEffect(() => {
    dispath(loadEmployees(fetchedEmployees));
  }, [fetchedEmployees]);

  useEffect(() => {
    setPage(1);
    if (theadRef.current) {
      (theadRef.current as HTMLDivElement).scrollIntoView({
        block: "start",
        inline: "start",
      });
    }
  }, [selectedCompanies]);

  if (!selectedCompanies.length) return null;

  return (
    <table className="table employees-table">
      <thead ref={theadRef}>
        <tr>
          <th>
            <input
              type="checkbox"
              checked={employees.length === selectedEmployees.length}
              onChange={() => dispath(selectAllEmployees())}
            />
          </th>

          <th>Last Name</th>

          <th>First Name</th>

          <th>Position</th>
        </tr>
      </thead>

      <tbody>
        {employees.map((employee, index) => (
          <EmployeeRow
            ref={
              employees.length === index + 1
                ? lastEmployeeRowElement
                : undefined
            }
            key={employee.id}
            {...{
              isSelect: selectedEmployees.includes(employee.id),
              ...employee,
            }}
          />
        ))}
      </tbody>
    </table>
  );
};

export default EmployeesTable;
