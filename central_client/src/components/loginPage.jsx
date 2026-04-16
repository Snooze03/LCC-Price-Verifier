import { useState } from "react";
import logo from "../assets/logoLCC.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    // TODO: handle login
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eef2fb] to-[#e8ecf8] flex flex-col items-center justify-center px-4">
      {/* Box on top */}
      <div className="rounded-2xl  p-4  flex  items-center flex-col">
        <img src={logo} alt="Logo" className="w-30 h-30 object-contain" />
        <p className="font-bold text-xl">Liberty Commercial Center</p>
        <p className="text-xs text-gray-400">Store Admin Portal</p>
      </div>

      <Card>
        {/* Sign in box */}

        {/* Header */}
        <CardHeader>
          <CardTitle>Sign In</CardTitle>

          <CardDescription>
            Enter your credentials to access the dashboard
          </CardDescription>
        </CardHeader>

        {/* Fields */}
        {/* <div className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition"
            /> */}
        <CardContent>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Admin Code"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            className="w-full py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold transition"
          >
            Sign in
          </button>
        </CardContent>
        <CardFooter>Liberty Commercial Center © 1945</CardFooter>
      </Card>
    </div>
  );
}
