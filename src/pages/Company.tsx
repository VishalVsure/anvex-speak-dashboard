import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, Trash2 } from "lucide-react";
import CompanyForm from "@/components/company/AddCompany";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import toast from "react-hot-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EditCompany from "@/components/company/UpdateCompany";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface CompanyInterface {
  GST: string;
  _id: string;
  address: string;
  company_name: string;
  email: string;
  user_id: string[];
  createdAt: string;
  updatedAt: string;
  logo?: string;
}

const Company = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [change, setChange] = useState<boolean>(false);
  const [edit, setEdit] = useState(false);
  const [companies, setCompanies] = useState<CompanyInterface[]>([]);
  const permission = useSelector((state: RootState) => state.user.permissions);
  const permissionsArray = Array.isArray(permission)
    ? permission
    : Object.values(permission);

  const token = useSelector((state: RootState) => state.user.token);

  const fetchCompany = async () => {
    if (!token) {
      toast.error("No token found. Please log in.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:3000/api/company", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200 && response.data) {
        console.log(response.data);
        setCompanies(response.data);
        toast.success("Companies fetched successfully!");
      }
    } catch (error) {
      console.error("Error fetching companies:", error);
      toast.error("Failed to fetch companies.");
    }
  };
  const deleteCompany = async (id: string) => {
    if (!token) {
      toast.error("No token found. Please log in.");
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:3000/api/company/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200 && response.data) {
        console.log(response.data);
        setChange(!change);

        toast.success("Company deleted!");
      }
    } catch (error) {
      console.error("Error deleting companies:", error);
      toast.error("Failed to delete company.");
    }
  };

  useEffect(() => {
    fetchCompany();
  }, [change]);

  return (
    <div className="w-full px-4">
      <h1 className="text-xl font-semibold mb-4">Company Management</h1>
      <div className="mb-4 space-x-2">
        <Button onClick={() => setIsOpen(true)}>Add Company</Button>
        <Button variant="outline" onClick={fetchCompany}>
          Fetch Companies
        </Button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div
            className="absolute inset-0"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div
            className="bg-white rounded-lg shadow-md w-full max-w-3xl relative z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <CompanyForm
              change={change}
              setChange={setChange}
              setIsOpen={setIsOpen}
            />
            <Button
              className="absolute top-4 right-4"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              X
            </Button>
          </div>
        </div>
      )}

      <div className="">
        <h2 className="text-lg font-semibold mb-2">Companies</h2>
        {companies.length > 0 ? (
          <div className="space-y-4">
            {companies.map((company) => (
              <div
                key={company._id}
                className="p-4 border rounded-lg shadow-md bg-white flex justify-between items-center"
              >
                <div className="flex items-center gap-2">
                  <Avatar className="h-14 w-14 rounded-full">
                    <AvatarImage
                      src={company.logo}
                      alt={company.company_name}
                    />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <h3 className="text-lg font-semibold">
                    {company.company_name}
                  </h3>
                </div>
                <div className="flex gap-2 justify-between items-center">
                  <Button
                    className=""
                    onClick={() => {
                      setEdit(true);
                    }}
                  >
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View company details</span>
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger
                      disabled={!permissionsArray.includes("delete_company")}
                      className="bg-red-500 text-neutral-50 shadow-sm hover:bg-red-500/90 dark:bg-red-900 dark:text-neutral-50 dark:hover:bg-red-900/90 px-4 py-3 rounded-lg"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete Company</span>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete the company and its data.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteCompany(company._id)}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
                {edit && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div
                      className="absolute inset-0"
                      onClick={() => setEdit(false)}
                      aria-hidden="true"
                    />
                    <div
                      className="bg-white rounded-lg shadow-md w-full max-w-3xl relative z-10"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <EditCompany
                        defaultValues={company}
                        id={company._id}
                        change={change}
                        setChange={setChange}
                        setIsOpen={setIsOpen}
                      />
                      <Button
                        className="absolute top-4 right-4"
                        variant="outline"
                        onClick={() => setEdit(false)}
                      >
                        X
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No companies found. Click "Fetch Companies" to load data.</p>
        )}
      </div>
    </div>
  );
};

export default Company;

//setEdit, setChange, change
