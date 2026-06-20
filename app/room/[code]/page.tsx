import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import RoomClient from "./RoomClient";

export default async function RoomPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;

  const { data: session, error } = await supabase
    .from("sessions")
    .select("*")
    .eq("room_code", code)
    .single();

  if (error || !session) {
    notFound();
  }

  return (
    <RoomClient session={session} />
  );
}
