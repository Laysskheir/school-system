import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePagination } from "@/hooks/use-pagination";
import { useStudentStore } from "@/store/student-store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  paginationItemsToDisplay?: number;
  setPage: (page: number) => void;
  isLoading: boolean;
};

export default function StudentPagination({
  currentPage,
  totalPages,
  onPageChange,
  paginationItemsToDisplay = 5,
  setPage,
  isLoading = false,
}: Props) {
  const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
    currentPage,
    totalPages,
    paginationItemsToDisplay,
  });

  const { perPage, setPerPage, } = useStudentStore();

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || isLoading) return;
    onPageChange(page);
    setPage(page);
  };

  return (
    <div className="mt-6 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">View</span>
        <Select
          value={perPage.toString()}
          onValueChange={(value) => setPerPage(parseInt(value))}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={perPage.toString()} />
          </SelectTrigger>
          <SelectContent>
            {[10, 15, 20, 25, 50].map((value) => (
              <SelectItem key={value} value={value.toString()}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground">Per page</span>
      </div>

      <div className="flex items-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
              />
            </PaginationItem>

            {showLeftEllipsis && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {pages.map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  isActive={page === currentPage}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            {showRightEllipsis && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
