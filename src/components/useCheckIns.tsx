import useSWR from "swr";

export const useCheckIns = (startDate: Date, endDate: Date) => {
  const checkInApiUrl = "http://localhost:3000/api/check-ins"; // this would need to change to the actual url in production
  const fetcher = (startDate: Date, endDate: Date) => {
    const startDateParam = startDate.getTime().toString();
    const endDateParam = endDate.getTime().toString();
    const url = `${checkInApiUrl}?startDate=${startDateParam}&endDate=${endDateParam}`;
    return fetch(url).then((response) => response.json());
  };

  const { data, error, mutate } = useSWR([startDate, endDate], fetcher);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
    mutate: mutate,
  };
};
