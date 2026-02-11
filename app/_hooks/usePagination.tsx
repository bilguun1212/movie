"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export const usePagination = () => {
  const { push } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onlyTenPages = 10;
  const maxVisibleButtons = 3;
  const currentPage = Number(searchParams.get("page") ?? 1);

  const handlePrevious = () => {};

  const handleNext = () => {};

  const handlePageChange = (pageNumber: Number) => () => {};
  return {};
};
