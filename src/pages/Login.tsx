import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { set_user } from "@/state/user/UserSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// user_id (primary key)
// username
// password_hash
// email
// role (e.g., 'admin', 'user', 'operator')
// created_at
// updated_at

export default function LoginPage() {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [mail, setMail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const user = { username: "VCS", email: mail, token: "abcdg" };
      dispatch(set_user(user));
      Navigate("/instructions");
    } catch (err) {
      console.log("ERROR: ", err);
    }
  };

  return (
    <div className="flex items-center align-middle py-36">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action="#" onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={mail}
                  onChange={(e) => setMail(e.target.value)} //
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" required />
              </div>
              <Button
                type="submit"
                className="w-full"
                // onClick={(e) => handleSubmit(e)}
              >
                Login
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => Navigate("/dashboard")}
              >
                Login with Google
              </Button>
            </div>
          </form>
          <div
            className="mt-4 text-center text-sm"
            onClick={() => Navigate("/signup")}
          >
            Don&apos;t have an account?{""}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// import React from "react";

// const LoginPage = () => {
//   return <div>LoginPage</div>;
// };

// export default LoginPage;
