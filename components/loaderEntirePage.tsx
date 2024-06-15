import Logo from "@/components/Logo";

type LoaderEntirePageType = {
  text?: string;
  isBgOnly?: boolean;
};

export default function LoaderEntirePage({
  isBgOnly,
  text = "",
}: LoaderEntirePageType) {
  return (
    <div
      className="w-screen h-screen bg-neutral-900 fixed left-0 top-0 flex items-center justify-center"
      style={{ zIndex: 1000 }}
    >
      <div className="flex flex-col items-center justify-center">
        {!isBgOnly && <Logo className="w-40 h-40" />}
        <p className="text-xl mb-4">{text}</p>
        <div className="flex space-x-2 justify-center items-center ">
          <div className="h-5 w-5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-5 w-5 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-5 w-5 bg-white rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
}
