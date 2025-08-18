/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
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
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import {
  useSendOtpMutation,
  useVerifyOtpMutation,
} from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dot } from "lucide-react";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";

export default function Verify() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state);
  const [email] = useState(location.state);
  const [confirm, setConfirm] = useState(false);
  const [sendOtp] = useSendOtpMutation();
  const [verifyOtp] = useVerifyOtpMutation();
  const [timer, setTimer] = useState(5);
    useEffect(() => {
      if (!email) {
        navigate("/");
      }
  },[email])

  useEffect(() => {
    if (!email || !confirm) {
      return;
    }
    const timerId = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      console.log("coler");
    }, 1000);
    return () => clearInterval(timerId);
  }, [email, confirm]);

  const handleSendOtp = async () => {
    
    const toastId = toast.loading("Sending Otp");
    try {
      const res = await sendOtp({ email: email }).unwrap();

      if (res.success) {
        toast.success("Otp sent", { id: toastId });
        setConfirm(true);
        setTimer(10);

      }
    } catch (err) {
      console.log(err);
      toast.error("Email sent failed");
    }
  };

  const formSchema = z.object({
    pin: z.string().min(6, {
      message: "Your one-time password must be 6 characters.",
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pin: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
    const userInfo = {
      email,
      otp: data.pin,
    };
    const toastId = toast.loading("Email Verifying");
    try {
      const res = await verifyOtp(userInfo).unwrap();

      if (res.success) {
        toast.success("Email verified", { id: toastId });
      }
    } catch (err:any) {
      toast.error("Email verification failed");
    }
  };
  return (
    <div className="grid place-content-center h-screen">
      {confirm ? (
        <Card>
          <CardHeader>
            <CardTitle>Verify your email address </CardTitle>
            <CardDescription>
              Please enter the one-time password sent to {email}.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                id="otp-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className=" space-y-6"
              >
                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={1} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <Dot></Dot>
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={4} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormDescription>
                        <Button
                          onClick={handleSendOtp}
                          type="button"
                          variant="link"
                          className={cn("p-0 m-0", {
                            "cursor-pointer": timer === 0,
                            "text-gray-400": timer !== 0,
                          })}
                          disabled={timer !== 0}
                        >
                          Resend OTP
                        </Button>
                        {" : "}
                        {timer}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button form="otp-form" type="submit" className=" ">
              Submit
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Verify your email address </CardTitle>
            <CardDescription>
              We will send you and otp to {email}.
            </CardDescription>
          </CardHeader>
          <CardFooter className="w-full">
            <Button onClick={handleSendOtp} className=" w-[300px]">
              Confirm
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
