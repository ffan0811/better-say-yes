import Link from "next/link";

export default function Login() {
  return (
    <>
      <p className="text-center mt-4">
        No account?{" "}
        <Link className="text-white underline" href="/signup">
          Create one
        </Link>
      </p>
    </>
  );
}
