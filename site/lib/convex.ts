import { ConvexHttpClient } from "convex/browser";
import { makeFunctionReference } from "convex/server";

const refs = {
  devicesStart: makeFunctionReference<"mutation">("devices:start"),
  devicesAuthorize: makeFunctionReference<"mutation">("devices:authorize"),
  devicesPoll: makeFunctionReference<"mutation">("devices:poll"),
  credentialsWhoami: makeFunctionReference<"query">("credentials:whoami"),
  credentialsRevoke: makeFunctionReference<"mutation">("credentials:revoke"),
  peoplePublish: makeFunctionReference<"mutation">("people:publish"),
  peopleListOwn: makeFunctionReference<"query">("people:listOwn"),
  peopleWithdraw: makeFunctionReference<"mutation">("people:withdraw"),
  peopleGetPublic: makeFunctionReference<"query">("people:getPublic"),
  peopleListByUsername: makeFunctionReference<"query">("people:listByUsername"),
  peopleRelationsByUsername: makeFunctionReference<"query">("people:relationsByUsername"),
  peoplePublicGraph: makeFunctionReference<"query">("people:publicGraph"),
  peopleListAll: makeFunctionReference<"query">("people:listAllPublic"),
} as const;

export const convexApi = refs;

/**
 * Server-side Convex client. Returns null when the deployment is not
 * configured; callers surface a stable 503 rather than inventing fallbacks.
 */
export function convexClient(): ConvexHttpClient | null {
  const url = process.env.CONVEX_URL ?? process.env.NEXT_PUBLIC_CONVEX_URL;
  if (typeof url !== "string" || !/^https:\/\/[a-z0-9-]+\.convex\.cloud$/u.test(url)) return null;
  return new ConvexHttpClient(url, { skipConvexDeploymentUrlCheck: true });
}
