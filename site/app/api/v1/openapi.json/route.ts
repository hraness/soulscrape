import { soulscrapeOpenApiDocument } from "../../../../lib/openapi";

export const dynamic = "force-static";

export function GET(): Response {
  return Response.json(soulscrapeOpenApiDocument, {
    headers: { "cache-control": "public, max-age=300" },
  });
}
