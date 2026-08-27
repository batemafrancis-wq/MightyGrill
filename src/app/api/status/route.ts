import { getLiveStatus } from "@/lib/hours";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(getLiveStatus());
}
