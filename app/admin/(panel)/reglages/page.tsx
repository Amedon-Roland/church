import { SettingsForm } from "@/components/admin/SettingsForm";
import { getSettings } from "@/lib/settings";

export const metadata = { title: "Réglages du site" };

export default async function SettingsPage() {
  return <SettingsForm initial={await getSettings()} />;
}
