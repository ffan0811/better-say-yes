import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { SubmitButton } from "@/components/SubmitButton";
import { createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { useTranslations } from 'next-intl';

export default function DeleteAccountContainer({
  userId,
  errorMessage,
}: {
  userId: string;
  errorMessage?: string;
}) {
  const t = useTranslations('settings.deleteAccount');

  const deleteAccount = async () => {
    "use server";
    const supabase = createClient(
      `https://${process.env.NEXT_PUBLIC_SUPABASE_HOST!}`,
      process.env.SUPABASE_SERVICE_ROLE!
    );

    const { error } = await supabase.auth.admin.deleteUser(userId);
    if (error) {
      return redirect(`/settings?message=${error.message}`);
    }
    return redirect(`/login`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="mt-8">
          <Button variant="destructive">{t('button')}</Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription>
            {t('description')}
            {errorMessage && (
              <span className="block mt-8 text-red-600">{errorMessage}</span>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <form>
            <SubmitButton
              formAction={deleteAccount}
              type="submit"
              variant="destructive"
            >
              {t('confirm')}
            </SubmitButton>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
