import { oidcHandler } from "../../../../lib/session";

export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<Response> {
  return oidcHandler(request);
}

export async function POST(request: Request): Promise<Response> {
  return oidcHandler(request);
}
