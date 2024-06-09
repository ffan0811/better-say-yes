import { Button } from "../ui/button";
import { InputWithLabel } from "../ui/input";

export default function ProductionSecret() {
  return (
    <div className="flex justify-center items-center h-screen w-screen container flex-col">
      <div className="w-1/3 space-y-4">
        <InputWithLabel label="Secret Code" />
        <Button className="w-full">Welcome</Button>
      </div>
    </div>
  );
}
