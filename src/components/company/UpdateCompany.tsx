import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { Pencil, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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

interface EditCompanyProps {
  defaultValues?: Partial<z.infer<typeof companyFormSchema>>;
  id?: string;
  change: boolean;
  setChange: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditCompany({
  defaultValues,
  id,
  change,
  setChange,
  setIsOpen,
}: EditCompanyProps) {
  const [isEditing, setIsEditing] = useState(false);
  const token = useSelector((state: RootState) => state.user.token);
  const permission = useSelector((state: RootState) => state.user.permissions);
  const permissionsArray = Array.isArray(permission)
    ? permission
    : Object.values(permission);

  const form = useForm<z.infer<typeof companyFormSchema>>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      company_name: defaultValues?.company_name || "",
      email: defaultValues?.email || "",
      phone: defaultValues?.phone || "",
      GST: defaultValues?.GST || "",
      address: defaultValues?.address || "",
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form]);

  async function onSubmit(values: z.infer<typeof companyFormSchema>) {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/company/${id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 && response.data) {
        toast.success("Company updated successfully!");
        setIsEditing(false);
        setIsOpen(false);
        setChange(!change);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        toast.error("Unauthorized: No token provided or token is invalid.");
      } else {
        toast.error("Failed to update company information. Please try again.");
      }
      console.error("Error:", error);
    }
  }
  //   console.log(permission);

  return (
    <div className="container mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Company Details</CardTitle>
          <CardDescription>
            {isEditing
              ? "You can edit the company details below."
              : "View company details. Click Edit to make changes."}
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
                      <Input
                        placeholder="Enter company name"
                        {...field}
                        disabled={!isEditing}
                      />
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
                          {...field}
                          disabled={!isEditing}
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
                        <Input
                          placeholder="Enter phone number"
                          {...field}
                          disabled={!isEditing}
                        />
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
                          disabled={!isEditing}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter complete address"
                        {...field}
                        disabled={!isEditing}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end space-x-4">
                {!isEditing ? (
                  <Button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    disabled={!permissionsArray.includes("update_company")}
                  >
                    <Pencil />
                  </Button>
                ) : (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false);
                        form.reset(defaultValues);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">
                      <Save />
                    </Button>
                  </>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
