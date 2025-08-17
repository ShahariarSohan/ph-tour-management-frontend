
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { AddTourTypeModal } from "@/components/modules/admin/tourTypes/AddTourTypeModal";
import { Button } from "@/components/ui/button";
import { DeleteConfirmation } from "@/components/ui/DeleteConfirmation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useGetTourTypesQuery,
  useRemoveTourTypeMutation,
} from "@/redux/features/tour/tour.api";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";


export default function AddTourType() {
  const [currentPage, setCurrentPage] = useState(1);
 
  const { data } = useGetTourTypesQuery({ page: currentPage,limit:5 });
  
  const [removeTourType] = useRemoveTourTypeMutation();
  const totalPages =data?.meta?.totalPages || 1;

  const handleRemove = async (tourId: string) => {
    const toastId = toast.loading("Removing tour type");
    try {
      const res = await removeTourType(tourId).unwrap();
      if (res.success) {
        toast.success("Successfully Removed", { id: toastId });
      }
    } catch (err) {
      console.log(err);
      toast.error("Deletion Failed");
    }
  };
  return (
    <div className=" w-full max-w-5xl mx-auto">
      <div className="flex justify-between mb-5">
        <h1 className="font-bold">Tour Type</h1>
        <AddTourTypeModal></AddTourTypeModal>
      </div>
      <div className="border border-muted p-5">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map(
              (item: { _id: string; name: string }, index: number) => (
                <TableRow key={index}>
                  <TableCell className="font-medium w-full">
                    {item?.name}
                  </TableCell>
                  <TableCell>
                    <DeleteConfirmation
                      onConfirm={() => handleRemove(item._id)}
                    >
                      <Button size="sm">
                        <Trash2></Trash2>
                      </Button>
                    </DeleteConfirmation>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </div>
      {totalPages > 1 && (
        <div className="flex justify-end mt-5">
          <div className="">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage((prev: number) => prev - 1)}
                    className={
                      currentPage === 1
                        ? "pointer-events-none text-gray-500"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
                <PaginationItem>
                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                  ).map((page) => (
                    <PaginationLink className="ml-2" key={page} onClick={()=>setCurrentPage(page)} isActive={currentPage===page}>{page}</PaginationLink>
                  ))}
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage((prev: number) => prev + 1)}
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none text-gray-500"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      )}
    </div>
  );
}
