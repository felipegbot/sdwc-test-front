import { clearAuthData } from "@/lib/redux/reducers/auth-data.reducer";
import { useAppDispatch } from "@/lib/redux/store";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { CircularProgress } from "@nextui-org/progress";

const LogoutPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(clearAuthData());
    router.push("/login");
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <CircularProgress
        classNames={{
          svg: "w-24 h-24",
        }}
      />
    </div>
  );
};

export default LogoutPage;
