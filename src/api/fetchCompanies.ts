import { useEffect, useState } from "react";
import { Company } from "../reducers/companySlice";
import { sliceIntoChunks } from "../utils";
import data from "../companies.json";

const chunks = sliceIntoChunks<Company>(data, 20);

export const useFetchCompanies = (pageNumber: number) => {
  const [isLoading, setIsLoading] = useState(false);
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    const promise = new Promise<Company[]>((resolve) => {
      setIsLoading(true);

      setTimeout(() => {
        resolve(chunks[pageNumber - 1]);
      }, 0);
    })
      .then((res) => {
        setCompanies(res);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [pageNumber]);

  return { isLoading, fetchedCompanies: companies };
};
