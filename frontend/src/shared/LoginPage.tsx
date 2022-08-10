import { useState } from "react";
import ConsumerDashboard from "./ConsumerDashboard";
import VendorDashboard from "./VendorDashboard";

function LoginPage() {
  const [role, setRole] = useState<undefined | "consumer" | "vendor">();

  return role === "consumer" ? (
    <ConsumerDashboard />
  ) : role === "vendor" ? (
    <VendorDashboard />
  ) : (
    <>
      <button className="btn btn-blue m-3" onClick={() => setRole("consumer")}>
        I am a consumer
      </button>
      <button className="btn btn-blue m-3" onClick={() => setRole("vendor")}>
        I am a vendor
      </button>
    </>
  );
}

export default LoginPage;
