import React from "react";
import Link from "next/link";
import Button from "../components/Button";

const NotFoundPage = () => {
  return (
    <div className="text-center">
      <h1 className="text-[150px] text-white font-bold">404</h1>

      <p className="text-[24px] text-white font-bold">Page not found</p>

      <Button>
        <Link href={"/"}>Back to Homepage</Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
