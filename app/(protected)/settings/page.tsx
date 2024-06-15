import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient as createClientServer } from "@/lib/supabase/server";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import SignOutButton from "@/components/SignOutButton";
import { SubmitButton } from "@/components/SubmitButton";

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: { message?: string };
}) {
  const supabase = createClientServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const deleteAccount = async () => {
    "use server";
    const supabase = createClient(
      `https://${process.env.NEXT_PUBLIC_SUPABASE_HOST!}`,
      process.env.SUPABASE_SERVICE_ROLE!
    );

    const { error } = await supabase.auth.admin.deleteUser(user.id);
    if (error) {
      return redirect(`/settings?message=${error.message}`);
    }
    return redirect(`/login`);
  };

  return (
    <Layout>
      <div className="container">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-4">
              <p>Welcome, {user.email}</p>
              <SignOutButton />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Dialog>
              <DialogTrigger asChild>
                <div className="text-right mt-8">
                  <Button variant="destructive">Delete account</Button>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Delete account</DialogTitle>
                  <DialogDescription>
                    All of your data will be deleted. Are you sure?
                    {searchParams?.message && (
                      <span className="block mt-8 text-red-600">
                        {searchParams.message}
                      </span>
                    )}
                  </DialogDescription>
                </DialogHeader>
                {/* <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Username
                    </Label>
                    <Input
                      id="username"
                      defaultValue="@peduarte"
                      className="col-span-3"
                    />
                  </div>
                </div> */}
                <DialogFooter>
                  <form>
                    <SubmitButton
                      formAction={deleteAccount}
                      type="submit"
                      variant="destructive"
                    >
                      Yes, I want to delete my account
                    </SubmitButton>
                  </form>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
