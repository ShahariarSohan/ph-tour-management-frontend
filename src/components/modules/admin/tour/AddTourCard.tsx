import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import MultipleImageUploader from "@/components/ui/MultipleImageUploader";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { FileMetadata } from "@/hooks/use-file-upload";
import { cn } from "@/lib/utils";
import { useGetDivisionQuery } from "@/redux/features/division/division.api";
import {
  useAddTourMutation,
  useGetTourTypesQuery,
} from "@/redux/features/tour/tour.api";
import { format, formatISO } from "date-fns";
import { CalendarIcon, Plus,  Trash2 } from "lucide-react";
import { useState } from "react";
import {
  useFieldArray,
  useForm,
  type FieldValues,
  type SubmitHandler,
} from "react-hook-form";
import { toast } from "sonner";

export default function AddTourCard() {
  const [images, setImages] = useState<(File | FileMetadata)[] | []>([]);
  
  const { data: divisionData, isLoading: isDivisionLoading } =
    useGetDivisionQuery(undefined);
  const { data: tourTypeData, isLoading: isTourTypeLoading } =
    useGetTourTypesQuery(undefined);
  const [addTour] = useAddTourMutation();
  const form = useForm({
    defaultValues: {
      title: "",
      division: "",
      tourType: "",
      startDate: "",
      endDate: "",
      description: "",
      included: [{ value: "" }],
      excluded: [{ value: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "included",
  });
  const { fields:excludeFields, append:excludeAppend, remove:excludeRemove } = useFieldArray({
    control: form.control,
    name: "excluded",
  });
  
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const tourData = {
      ...data,
      startDate: formatISO(data.startDate),
      endDate: formatISO(data.endDate),
      included: data.included.map((item: { value: string }) => item.value),
      excluded: data.excluded.map((item: { value: string }) => item.value),
    };
    console.log(tourData);
    const formData = new FormData();
    formData.append("data", JSON.stringify(tourData));
    images.forEach((image) => formData.append("files", image as File));

     const toastId = toast.loading("Adding tour");
     try {
       const res = await addTour(formData).unwrap();

       if (res.success) {
         toast.success("Tour Added", { id: toastId });

       }
     } catch (error) {
       console.log(error);
       toast.error("Add Tour failed");
     }
  };
  return (
    <div>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Add Tour</CardTitle>
          <CardDescription className="sr-only">Add Tour</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              id="add-tour"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tour Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Title" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col md:flex-row gap-2">
                <FormField
                  control={form.control}
                  name="division"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Division</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isDivisionLoading}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a division" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {divisionData?.data?.map(
                            (
                              item: { _id: string; name: string },
                              index: number
                            ) => (
                              <SelectItem key={index} value={item._id}>
                                {item.name}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tourType"
                  render={({ field }) => (
                    <FormItem className=" flex-1">
                      <FormLabel>Tour Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isTourTypeLoading}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a Tour Type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {tourTypeData?.data?.map(
                            (
                              item: { _id: string; name: string },
                              index: number
                            ) => (
                              <SelectItem key={index} value={item._id}>
                                {item.name}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col md:flex-row gap-2">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col flex-1">
                      <FormLabel>Start Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={new Date(field.value)}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date <
                              new Date(
                                new Date().setDate(new Date().getDate() - 1)
                              )
                            }
                            captionLayout="dropdown"
                          />
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col flex-1">
                      <FormLabel>End Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={new Date(field.value)}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date <
                              new Date(
                                new Date().setDate(new Date().getDate() - 1)
                              )
                            }
                            captionLayout="dropdown"
                          />
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            className="h-52"
                            placeholder="Type your message here."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex-1 mt-5">
                  <MultipleImageUploader
                    onUpload={setImages}
                  ></MultipleImageUploader>
                </div>
              </div>
              {/* included */}
              <div className="border-b border-muted w-full"></div>
              <div>
                <div className="flex justify-between items-center mb-5">
                  <h3 className="font-semibold">Include</h3>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => append({ value: "" })}
                  >
                    <Plus size="icon"></Plus>
                  </Button>
                </div>
                <div>
                  <div>
                    {fields.map((item, index) => (
                      <div className="flex gap-2 mb-5">
                        <FormField
                          control={form.control}
                          name={`included.${index}.value`}
                          key={item.id}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input
                                  placeholder="include"
                                  type="text"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="button" onClick={() => remove(index)}>
                          <Trash2></Trash2>
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* exclude */}
              <div className="border-b border-muted w-full"></div>
              <div>
                <div className="flex justify-between items-center mb-5">
                  <h3 className="font-semibold">Exclude</h3>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => excludeAppend({ value: "" })}
                  >
                    <Plus size="icon"></Plus>
                  </Button>
                </div>
                <div>
                  <div>
                    {excludeFields.map((item, index) => (
                      <div className="flex gap-2 mb-5">
                        <FormField
                          control={form.control}
                          name={`excluded.${index}.value`}
                          key={item.id}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input
                                  placeholder="include"
                                  type="text"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="button" onClick={() => excludeRemove(index)}>
                          <Trash2></Trash2>
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button form="add-tour" type="submit" className="w-1/6">
            Add
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
