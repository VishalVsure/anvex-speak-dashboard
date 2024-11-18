import CallDetailsTable from "@/components/CallDetails";
import DashboardLayout from "@/layout/DashboardLayout";
import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface CallDetails {
  name: string;
  number: string;
  call_time: string;
  duration: string;
  transcript: string;
  recording: string;
  overall_response: string;
}

const Dashboard = () => {
  const [userData, setUserData] = useState<CallDetails[]>([]);
  // const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      toast.loading("Fetching user data...");
      try {
        const response = await axios.get(
          "https://anvex-akila-demo.onrender.com/api/sheets/read",
          {
            params: {
              range: "Akila Final Call List", // Ensure the parameter name matches the expected format
            },
          }
        );
        console.log(response.data.data);

        // Map through the data and create CallDetails objects, setting other fields to null
        const fetchedData = response.data.data
          .slice(1) // Skip header row
          .map((item: string[]) => {
            if (item && item.length > 0) {
              return {
                name: item[2] + " " + item[4], // Combine first and last name
                number: item[5],
              };
            }
            return null; // If data is not in the expected format
          })
          .filter((item: null) => item !== null); // Filter out null values

        setUserData(fetchedData); // Update the userData state
        toast.dismiss();
        toast.success(`Data Fetched Successfully!`);

        // Fetch additional data after the initial data is fetched
        fetchAdditionalData(fetchedData);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        // setError(error.message);
        toast.dismiss();
        toast.error("Failed to fetch user data");
      }
    };

    const fetchAdditionalData = async (fetchedData: CallDetails[]) => {
      try {
        // Call the second API to fetch additional details
        const additionalResponse = await axios.get(
          "https://anvex-akila-demo.onrender.com/api/sheets/read",
          {
            params: {
              range: "Akila Call Log", // Ensure the parameter name matches the expected format
            },
          }
        );
        const additionalData = additionalResponse.data.data; // Assuming it returns an array of data objects
        console.log(additionalData);

        // Merge the initial data with the additional data based on matching 'number'
        const updatedUserData = fetchedData.map((item) => {
          const matchingData = additionalData.find(
            (additionalItem: string[]) =>
              additionalItem[0] === item.number &&
              additionalItem[1] === "end-of-call-report"
          );
          console.log("MatchingData: ", matchingData);

          // If matching data is found, update the item with additional details
          if (matchingData) {
            return {
              ...item,
              transcript: matchingData[3] || null,
              recording: matchingData[2] || null,
              overall_response: matchingData[4] || null,
            };
          }
          return item; // If no match, return the original item
        });

        // Update the state with the merged data
        setUserData(updatedUserData);

        toast.success("Additional data fetched and merged!");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        // setError(error.message);
        toast.error("Failed to fetch additional data");
      }
    };

    fetchUserData();
  }, []);

  return (
    <DashboardLayout>
      <CallDetailsTable userData={userData} />
      <Toaster position="bottom-center" />
    </DashboardLayout>
  );
};

export default Dashboard;
