import { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  getCompanies,
  getSelectedCompanies,
  loadCompanies,
  selectAllCompanies,
} from "../../../reducers/companySlice";
import { CompanyRow } from "../row";
import "./table.scss";

import { useFetchCompanies } from "../../../api";

const CompanyTable = () => {
  const dispath = useAppDispatch();
  const [page, setPage] = useState(1);

  const { isLoading, fetchedCompanies } = useFetchCompanies(page);

  const observer: any = useRef();
  const lastCompanyRowElement = useCallback(
    (node: any) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevValue) => prevValue + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading]
  );

  const companies = useAppSelector(getCompanies);
  const selectedCompanies = useAppSelector(getSelectedCompanies);

  useEffect(() => {
    dispath(loadCompanies(fetchedCompanies));
  }, [fetchedCompanies]);

  return (
    <table className="company-table table">
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              checked={companies.length === selectedCompanies.length}
              onChange={() => dispath(selectAllCompanies())}
            />
          </th>

          <th>Company Name</th>

          <th>Employees</th>

          <th>Address</th>
        </tr>
      </thead>

      <tbody>
        {companies.map((company, index) => (
          <CompanyRow
            ref={
              companies.length === index + 1 ? lastCompanyRowElement : undefined
            }
            key={company.id}
            {...{
              isSelect: selectedCompanies.includes(company.id),
              ...company,
            }}
          />
        ))}
      </tbody>
    </table>
  );
};

export default CompanyTable;
