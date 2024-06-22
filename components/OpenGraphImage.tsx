import Logo from "./Logo";

export default function OpenGraphImage({
  backgroundColor = "#0a0a0a",
  themeColor = "#fff",
}: {
  backgroundColor?: string;
  themeColor?: string;
}) {
  return (
    <div
      style={{
        fontSize: 128,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: backgroundColor,
      }}
    >
      <Logo colorHexCode={themeColor} />
    </div>
  );
}
