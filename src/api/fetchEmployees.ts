import { useEffect, useState } from "react";
import { Employee } from "../reducers/employeeSlice";
import { sliceIntoChunks } from "../utils";
import data from "../employees.json";

const allEmployees: Employee[] = data as [];

const CHUNK_SIZE = 50;

export const useFetchEmployees = (
  pageNumber: number,
  selectedCompanies: number[] = []
) => {
  const filteredEmployees = allEmployees.filter((employee) =>
    selectedCompanies.includes(employee.companyId)
  );

  const chunks = sliceIntoChunks(filteredEmployees, CHUNK_SIZE);

  const [isLoading, setIsLoading] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    const promise = new Promise<Employee[]>((resolve) => {
      setIsLoading(true);
      if (!chunks.length) return [];

      setTimeout(() => {
        const result = [] as any;

        for (let i = 1; i <= pageNumber; i++) {
          result.push(...chunks[i - 1]);
        }

        resolve(result);
      }, 0);
    })
      .then((res) => {
        setEmployees(res);
        setHasMore(
          filteredEmployees.length > CHUNK_SIZE && res.length === CHUNK_SIZE
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [pageNumber, selectedCompanies]);

  return { isLoading, hasMore, fetchedEmployees: employees };
};
