"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

// Form validation schema
const companyFormSchema = z.object({
  company_name: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  GST: z.string().min(15).max(15, {
    message: "GST number must be exactly 15 characters.",
  }),
  address: z.string().min(10, {
    message: "Please enter a complete address.",
  }),
});

interface CompanyFormProps {
  change: boolean;
  setChange: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CompanyForm({
  change,
  setChange,
  setIsOpen,
}: CompanyFormProps) {
  const token = useSelector((state: RootState) => state.user.token);
  const form = useForm<z.infer<typeof companyFormSchema>>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      company_name: "",
      email: "",
      phone: "",
      GST: "",
      address: "",
    },
  });

  async function onSubmit(values: z.infer<typeof companyFormSchema>) {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/company",
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201 && response.data) {
        toast.success("Company created successfully");
        setChange(!change);
        setIsOpen(false);
        form.reset();
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        toast.error("Unauthorized: No token provided or token is invalid.");
      } else {
        toast.error("Failed to submit company information. Please try again.");
      }
      console.error("Error:", error);
    }
  }

  return (
    <div className="container mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Company Registration</CardTitle>
          <CardDescription>
            Enter your company details below. All fields are required unless
            marked optional.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="company_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter company name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="company@example.com"
                          className="w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="GST"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>GST Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter 15-digit GST number"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Must be exactly 15 characters long
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-between gap-4">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="w-2/3">
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter complete address"
                          rows={5}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormItem className="w-1/3 mb-8">
                  <FormLabel>Company Logo</FormLabel>
                  <div className="h-full rounded-md bg-gray-100 flex flex-col justify-center items-center border border-dotted p-4">
                    <label
                      htmlFor="company_logo"
                      className="cursor-pointer text-gray-600 flex flex-col items-center"
                    >
                      <p className="text-2xl">+</p>
                      <p className="text-sm">Upload Logo</p>
                      <Input
                        id="company_logo"
                        type="file"
                        className="hidden"
                        accept="image/*"
                      />
                    </label>
                  </div>
                  <FormMessage />
                </FormItem>
              </div>

              <Button type="submit" className="w-full">
                Register Company
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}