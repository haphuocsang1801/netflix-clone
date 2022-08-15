import { reload } from "firebase/auth";
import { useRouter } from "next/router";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { auth } from "../firebase";
import useAuth from "../hooks/useAuth";
const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
function Membership() {
  const [input, setInput] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState(false);
  const { user, changeEmail, resetPassword } = useAuth();
  const handleBlurEmail = async (e: React.FocusEvent<HTMLInputElement>) => {
    let email = e.target.value;
    if (validateEmail(email)) {
      try {
        await changeEmail(email);
        toast.success(`Change email successfuly`, { duration: 8000 });
        reload(user!);
      } catch (error) {
        const _error = error as Error;
        toast.error(_error.message);
      } finally {
        setInput(false);
        setError(false);
      }
    } else {
      setError(true);
    }
  };
  const changePassword = async () => {
    try {
      await resetPassword(user!.email!);
      toast(`Please check your email`, { duration: 8000 });
    } catch (error) {
      const _error = error as Error;
      toast(`${_error.message}`, { duration: 8000 });
    }
  };
  return (
    <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0">
      <Toaster position="top-center" />
      <div className="col-span-3">
        <div className="flex flex-col justify-between border-b border-white/10 py-4 md:flex-row">
          <div className=" max-w-[250px] w-full">
            {input ? (
              <input
                type="text"
                className={`${
                  error && "outline-red-500"
                } outline-none p-2 text-black rounded-sm w-full`}
                defaultValue={user?.email as string}
                ref={inputRef}
                onBlur={handleBlurEmail}
              />
            ) : (
              <p className="font-medium">{user?.email}</p>
            )}
            <p className="text-[gray]">Password: ********</p>
          </div>
          <div className="md:text-right">
            <p className="membershipLink" onClick={() => setInput(true)}>
              Change email
            </p>
            <p className="membershipLink">Change password</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Membership;
