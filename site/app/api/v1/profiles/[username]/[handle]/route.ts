import { isPersonHandle } from "../../../../../../../skills/soulscrape/scripts/person-index";

import { apiError, apiUnavailable } from "../../../../../../lib/api";
import { convexApi, convexClient } from "../../../../../../lib/convex";
import { publicRowToProfile } from "../../../../../../lib/profile-view";
import { parseUsernameSegment } from "../../../../../../lib/routes";

export const dynamic = "force-dynamic";

/**
 * `GET /api/v1/profiles/<username>/<handle>` — public machine-readable view.
 * `?format=markdown` returns the packet body; otherwise the full packet JSON.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ username: string; handle: string }> },
): Promise<Response> {
  const { username: rawUsername, handle: rawHandle } = await params;
  const username = parseUsernameSegment(rawUsername);
  const handle = isPersonHandle(rawHandle) ? rawHandle : null;
  if (username === null || handle === null) {
    return apiError({ code: "NOT_FOUND", message: "no such profile", retryable: false }, 404);
  }
  const convex = convexClient();
  if (convex === null) return apiUnavailable();
  const row = await convex.query(convexApi.peopleGetPublic, { username, handle });
  const profile = publicRowToProfile(row);
  if (profile === null) {
    return apiError({ code: "NOT_FOUND", message: "no such profile", retryable: false }, 404);
  }
  const format = new URL(request.url).searchParams.get("format");
  if (format === "markdown") {
    return new Response(profile.packet.body, {
      headers: {
        "cache-control": "public, max-age=300",
        "content-type": "text/markdown; charset=utf-8",
      },
    });
  }
  return Response.json({
    ok: true,
    version: "soulscrape.api.v1",
    profile: {
      username: profile.username,
      handle: profile.handle,
      packetDigest: profile.packetDigest,
      revision: profile.revision,
      packet: profile.packet,
    },
  }, { headers: { "cache-control": "public, max-age=300" } });
}
