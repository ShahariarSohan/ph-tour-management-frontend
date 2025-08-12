
import { AddTourTypeModal } from "@/components/modules/admin/tourTypes/AddTourTypeModal";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetTourTypesQuery } from "@/redux/features/tour/tour.api";
import { Trash2 } from "lucide-react";

export default function AddTourType() {
  const { data } = useGetTourTypesQuery(undefined);
  console.log(data);
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
            {data?.data?.map((item: { name: string }) => (
              <TableRow>
                <TableCell className="font-medium w-full">
                  {item?.name}
                </TableCell>
                <Button size="sm">
                  <Trash2></Trash2>
                </Button>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
