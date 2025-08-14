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

export default function AddTourType() {
  const { data } = useGetTourTypesQuery(undefined);
  const [removeTourType] = useRemoveTourTypeMutation();

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
    </div>
  );
}
