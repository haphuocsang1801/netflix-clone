import { yupResolver } from "@hookform/resolvers/yup";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import Button from "../components/base/Button";
import ErrorMessage from "../components/base/ErrorMessage";
import Field from "../components/base/Field";
import Input from "../components/base/Input";
import { Loading } from "../components/Loading";
import useAuth from "../hooks/useAuth";

interface Inputs {
  email: string;
  password: string;
}
const schema = yup.object({
  email: yup
    .string()
    .email("Please enter valid email address")
    .required("Please enter your email address"),
  password: yup
    .string()
    .min(8, "Your password must be at least 8 characters or greater")
    .required("Please enter your password"),
});
const login = () => {
  const { signIn, loading } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    await signIn(email, password);
  };
  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="https://rb.gy/ulxxee" />
      </Head>
      {loading && <Loading></Loading>}
      <Image
        src="https://rb.gy/p2hphi"
        layout="fill"
        className="-z-10 !hidden opacity-60 sm:!inline"
        objectFit="cover"
      />
      <img
        src="https://rb.gy/ulxxee"
        className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
        width={150}
        height={150}
      />

      <form
        className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-4xl">Sign In</h1>
        <div className="space-y-4">
          <Field>
            <Input
              type="text"
              name="email"
              placeholder="Email"
              className="input"
              control={control}
            />
            <ErrorMessage error={errors.email} />
          </Field>
          <Field>
            <Input
              type="password"
              name="password"
              placeholder="password"
              className="input"
              control={control}
            />
            <ErrorMessage error={errors.password} />
          </Field>
        </div>
        <Button>Sign In</Button>
        <div className="text-[gray] text-center !mt-2.5 ">
          <Link href={"/forgotPassword"}>
            <span className="cursor-pointer ml-auto text-white transition hover:underline">
              Forgot password
            </span>
          </Link>
        </div>
        <div className="text-[gray]">
          New to Netflix?{" "}
          <Link href={"/signup"}>
            <span className="cursor-pointer text-white transition hover:underline">
              Sign up now
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default login;
