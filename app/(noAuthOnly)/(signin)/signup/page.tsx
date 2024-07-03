import Link from "next/link";

export default function SignUp() {
  return (
    <>
      <p className="text-center text-neutral-400 text-xs mt-3">
        By clicking &quot;Create account&quot;,
        <br />
        you agree to the{" "}
        <Link target="_blank" href="/terms" className="text-white">
          Terms of Use
        </Link>{" "}
        and{" "}
        <Link target="_blank" href="/privacy" className="text-white">
          Privacy Policy.
        </Link>
      </p>
      <p className="text-center mt-4">
        Already have an account?{" "}
        <Link className="text-white underline" href="/login">
          Log in
        </Link>
      </p>
    </>
  );
}
