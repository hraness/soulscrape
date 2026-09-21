import personIndexSchema from "../../schema/soulscrape-person-index-v1.schema.json";

import { API_VERSION } from "./api";

type JsonValue = null | boolean | number | string | JsonValue[] | { [key: string]: JsonValue };
type Schema = { [key: string]: JsonValue };

function embeddedPersonIndexSchema(value: unknown): JsonValue {
  if (value === null || typeof value === "boolean" || typeof value === "number" || typeof value === "string") {
    return value;
  }
  if (Array.isArray(value)) return value.map(embeddedPersonIndexSchema);
  if (typeof value !== "object") throw new TypeError("person-index schema must contain JSON values only");
  const result: Record<string, JsonValue> = {};
  for (const [key, child] of Object.entries(value)) {
    if (key === "$schema" || key === "$id") continue;
    result[key] = key === "$ref" && typeof child === "string" && child.startsWith("#/")
      ? `#/components/schemas/PersonIndex${child.slice(1)}`
      : embeddedPersonIndexSchema(child);
  }
  return result;
}

function ref(name: string): Schema {
  return { $ref: `#/components/schemas/${name}` };
}

function objectSchema(
  required: readonly string[],
  properties: Record<string, JsonValue>,
  extra: Schema = {},
): Schema {
  return {
    type: "object",
    required: [...required],
    additionalProperties: false,
    properties,
    ...extra,
  };
}

function arraySchema(items: Schema, maxItems?: number): Schema {
  return { type: "array", items, ...(maxItems === undefined ? {} : { maxItems }) };
}

function jsonResponse(description: string, schema: Schema): Schema {
  return {
    description,
    content: { "application/json": { schema } },
  };
}

const apiVersionSchema: Schema = { type: "string", const: API_VERSION };
const millisecondTimestampSchema: Schema = {
  type: "integer",
  minimum: 0,
  maximum: Number.MAX_SAFE_INTEGER,
  description: "Unix timestamp in milliseconds.",
};
const digestSchema: Schema = { type: "string", pattern: "^[a-f0-9]{64}$" };
const usernameSchema: Schema = { type: "string", minLength: 2, maxLength: 64 };
const handleSchema: Schema = {
  type: "string",
  minLength: 2,
  maxLength: 64,
  pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$",
};

const errorResponses: Schema = {
  "400": { $ref: "#/components/responses/BadRequest" },
  "401": { $ref: "#/components/responses/Unauthorized" },
  "429": jsonResponse("Publishing or device limit reached; follow retryable and retryAfterMs.", ref("ErrorResponse")),
  "500": { $ref: "#/components/responses/InternalFailure" },
  "503": { $ref: "#/components/responses/Unavailable" },
};

export const soulscrapeOpenApiDocument = {
  openapi: "3.1.0",
  jsonSchemaDialect: "https://json-schema.org/draft/2020-12/schema",
  info: {
    title: "Soulscrape API",
    version: "1.1.0",
    termsOfService: "https://hraness.com/terms",
    contact: { name: "Soulscrape support", email: "hraness@pm.me" },
    summary: "Read and publish source-backed public person indexes.",
    description:
      "Soulscrape exposes public person-index, corpus, graph, theme, and open-question reads. Free Hraness account holders can list, publish, revise, withdraw, and restore their own public indexes through a revocable device credential. The user’s agent performs research with its own model and tools. No Soulscrape subscription, credits, or card is required. The API does not accept private contact books, messages, or private person models. Public aggregate responses may be cached for 30 seconds; full profile and private responses are not cached.",
  },
  servers: [{ url: "https://soulscrape.com" }],
  externalDocs: {
    description: "Public person-index procedure and evidence boundaries",
    url: "https://github.com/hraness/soulscrape/blob/main/skills/soulscrape/references/public-person-index.md",
  },
  tags: [
    { name: "Discovery", description: "Unauthenticated reads of the live public corpus." },
    { name: "Profiles", description: "Unauthenticated reads of one published index." },
    { name: "Device authorization", description: "Short-lived pairing for a revocable publishing credential." },
    { name: "Publishing", description: "Authenticated management of the caller's public indexes." },
    { name: "Credential", description: "Inspect or revoke the presented publishing credential." },
  ],
  paths: {
    "/api/v1/openapi.json": {
      get: {
        operationId: "getOpenApiDocument",
        summary: "Read this API description",
        tags: ["Discovery"],
        security: [],
        "x-soulscrape-risk": "R1",
        responses: {
          "200": jsonResponse("The OpenAPI 3.1 document.", { type: "object" }),
        },
      },
    },
    "/api/v1/index.json": {
      get: {
        operationId: "listPublicIndexes",
        summary: "List the live public index corpus",
        description:
          "Follow pagination.nextCursor with the same endpoint and filters until isDone. Pages are bounded to 100 profiles and are not an atomic snapshot. corpusDigest covers the current unfiltered page only. A since value filters each page but omits deletions; periodically reconcile a fresh traversal. Cursors are endpoint-specific.",
        tags: ["Discovery"],
        security: [],
        "x-soulscrape-risk": "R1",
        parameters: [{ $ref: "#/components/parameters/Since" }, { $ref: "#/components/parameters/Cursor" }, { $ref: "#/components/parameters/IndexLimit" }],
        responses: {
          "304": { description: "Semantically unchanged; weak ETag excludes observation time. Cached aggregates may remain visible for 30 seconds after a change." },
          "400": { $ref: "#/components/responses/BadRequest" },
          "200": jsonResponse("The bounded live corpus index.", ref("CorpusIndexResponse")),
          "503": { $ref: "#/components/responses/Unavailable" },
        },
      },
    },
    "/api/v1/graph.json": {
      get: {
        operationId: "getPublicGraph",
        summary: "Read the live public relationship graph",
        description:
          "Paged graph v3 defaults to 10 profiles, with limit from 1 to 25. Follow endpoint-specific cursors. Identity resolution is allowed only when the first page also completes the corpus; multi-page fragments keep targets unresolved to avoid false identity joins. Collect and reconcile all pages before client-side resolution. since filters outbound sources within each page, omitting deletions. corpusDigest describes this page, not the whole corpus; traversal is not an atomic snapshot.",
        tags: ["Discovery"],
        security: [],
        "x-soulscrape-risk": "R1",
        parameters: [{ $ref: "#/components/parameters/Since" }, { $ref: "#/components/parameters/Cursor" }, { $ref: "#/components/parameters/GraphLimit" }],
        responses: {
          "304": { description: "Semantically unchanged; weak ETag excludes observation time. Cached aggregates may remain visible for 30 seconds after a change." },
          "400": { $ref: "#/components/responses/BadRequest" },
          "200": jsonResponse("The bounded graph projection.", ref("GraphResponse")),
          "503": { $ref: "#/components/responses/Unavailable" },
        },
      },
    },
    "/api/v1/themes.json": {
      get: {
        operationId: "listPublicThemes",
        description: "Follow endpoint-specific pagination.nextCursor. limit defaults to 10 and is at most 25 profiles. These are pages, not whole-corpus snapshots.",
        parameters: [{ $ref: "#/components/parameters/Cursor" }, { $ref: "#/components/parameters/GraphLimit" }],
        summary: "List themes across the live public corpus",
        tags: ["Discovery"],
        security: [],
        "x-soulscrape-risk": "R1",
        responses: {
          "304": { description: "Semantically unchanged; weak ETag excludes observation time. Cached aggregates may remain visible for 30 seconds after a change." },
          "400": { $ref: "#/components/responses/BadRequest" },
          "200": jsonResponse("The live corpus themes.", ref("ThemesResponse")),
          "503": { $ref: "#/components/responses/Unavailable" },
        },
      },
    },
    "/api/v1/questions.json": {
      get: {
        operationId: "listPublicQuestions",
        description: "Follow endpoint-specific pagination.nextCursor. limit defaults to 10 and is at most 25 profiles. These are pages, not whole-corpus snapshots.",
        parameters: [{ $ref: "#/components/parameters/Cursor" }, { $ref: "#/components/parameters/GraphLimit" }],
        summary: "List open questions across the live public corpus",
        tags: ["Discovery"],
        security: [],
        "x-soulscrape-risk": "R1",
        responses: {
          "304": { description: "Semantically unchanged; weak ETag excludes observation time. Cached aggregates may remain visible for 30 seconds after a change." },
          "400": { $ref: "#/components/responses/BadRequest" },
          "200": jsonResponse("The live corpus open questions.", ref("QuestionsResponse")),
          "503": { $ref: "#/components/responses/Unavailable" },
        },
      },
    },
    "/api/v1/profiles/{username}/{handle}": {
      get: {
        operationId: "getPublicProfile",
        summary: "Read one published person index",
        tags: ["Profiles"],
        security: [],
        "x-soulscrape-risk": "R1",
        parameters: [
          { name: "username", in: "path", required: true, schema: usernameSchema },
          { name: "handle", in: "path", required: true, schema: handleSchema },
          {
            name: "format",
            in: "query",
            required: false,
            schema: { type: "string", enum: ["json", "markdown"], default: "json" },
          },
        ],
        responses: {
          "200": {
            description: "The full packet as JSON, or its Markdown body when format=markdown.",
            content: {
              "application/json": { schema: ref("PublicProfileResponse") },
              "text/markdown": { schema: { type: "string" } },
            },
          },
          "404": { $ref: "#/components/responses/NotFound" },
          "503": { $ref: "#/components/responses/Unavailable" },
        },
      },
    },
    "/api/v1/device/start": {
      post: {
        operationId: "startDeviceAuthorization",
        summary: "Start short-lived device authorization",
        description:
          "Returns a human-entered code, a private polling secret, and a browser verification URL. The code cannot be authorized or exchanged after fifteen minutes. Expired pairing records are removed in scheduled batches. The polling secret must not be shown to the model or user. Starts share a global burst of twenty attempts, refilling one attempt every ten seconds (360 per hour sustained). This admission applies in the backend before pending-code scans, including when all 1,000 live pending slots are occupied. HTTP 429 returns DEVICE_START_RATE_LIMITED or DEVICE_START_CAPACITY with retryAfterMs and Retry-After; no code is created on rejection.",
        tags: ["Device authorization"],
        security: [],
        "x-soulscrape-risk": "R2",
        "x-soulscrape-side-effect": "Debits one global scan-admission token and creates one expiring code record containing only code/secret digests. A full pending pool commits the debit without creating a code.",
        requestBody: {
          required: false,
          content: {
            "application/json": {
              schema: objectSchema([], { deviceName: { type: "string", minLength: 1, maxLength: 80, default: "soulscrape cli" } }),
            },
          },
        },
        responses: {
          "200": jsonResponse("A pending device authorization.", ref("DeviceStartResponse")),
          "400": { $ref: "#/components/responses/BadRequest" },
          "429": {
            ...jsonResponse("Global start rate or pending-code capacity reached. Retryable; wait for retryAfterMs before starting again.", ref("ErrorResponse")),
            headers: { "Retry-After": { description: "Delay in whole seconds, rounded up from retryAfterMs.", schema: { type: "integer", minimum: 1, maximum: 900 } } },
          },
          "502": { $ref: "#/components/responses/UpstreamFailure" },
          "503": { $ref: "#/components/responses/Unavailable" },
        },
      },
    },
    "/api/v1/device/poll": {
      post: {
        operationId: "pollDeviceAuthorization",
        summary: "Poll a pending device authorization",
        description:
          "Poll no faster than pollAfterMs. An authorized response returns the publishing credential once and consumes the pending code. The credential must be stored outside model-visible state. Free accounts allow twenty active publishing devices. Revoked credential digests become eligible for bounded deletion after thirty days.",
        tags: ["Device authorization"],
        security: [],
        "x-soulscrape-risk": "R2",
        "x-soulscrape-side-effect": "Consumes an authorized device code and returns its credential exactly once.",
        requestBody: {
          required: true,
          content: { "application/json": { schema: ref("DevicePollRequest") } },
        },
        responses: {
          "429": jsonResponse("Twenty active devices already exist; log out a known device or contact support. This pairing remains pending; no automatic retry.", ref("ErrorResponse")),
          "200": jsonResponse("Pending or authorized device state.", ref("DevicePollResponse")),
          "400": { $ref: "#/components/responses/BadRequest" },
          "404": { $ref: "#/components/responses/NotFound" },
          "410": { $ref: "#/components/responses/Expired" },
          "502": { $ref: "#/components/responses/UpstreamFailure" },
          "503": { $ref: "#/components/responses/Unavailable" },
        },
      },
    },
    "/api/v1/auth": {
      get: {
        operationId: "getCredentialAccount",
        summary: "Resolve the publishing credential to its account",
        tags: ["Credential"],
        security: [{ publishCredential: [] }],
        "x-soulscrape-risk": "R1",
        responses: {
          "200": jsonResponse("The credential's account identity.", ref("CredentialAccountResponse")),
          "401": { $ref: "#/components/responses/Unauthorized" },
          "502": { $ref: "#/components/responses/UpstreamFailure" },
          "503": { $ref: "#/components/responses/Unavailable" },
        },
      },
      delete: {
        operationId: "revokeCredential",
        summary: "Revoke the presented publishing credential",
        tags: ["Credential"],
        security: [{ publishCredential: [] }],
        "x-soulscrape-risk": "R2",
        "x-soulscrape-idempotent": true,
        "x-soulscrape-side-effect": "Revokes only the presented credential. Published profiles remain live.",
        responses: {
          "200": jsonResponse("The credential is revoked.", ref("CredentialRevokedResponse")),
          "401": { $ref: "#/components/responses/Unauthorized" },
          "502": { $ref: "#/components/responses/UpstreamFailure" },
          "503": { $ref: "#/components/responses/Unavailable" },
        },
      },
    },
    "/api/v1/people": {
      get: {
        operationId: "listOwnedIndexes",
        summary: "List the caller's published and withdrawn indexes",
        tags: ["Publishing"],
        security: [{ publishCredential: [] }],
        "x-soulscrape-risk": "R1",
        responses: {
          "200": jsonResponse("The caller's bounded index list.", ref("OwnedIndexesResponse")),
          "401": { $ref: "#/components/responses/Unauthorized" },
          "500": { $ref: "#/components/responses/InternalFailure" },
          "503": { $ref: "#/components/responses/Unavailable" },
        },
      },
      put: {
        operationId: "publishPersonIndex",
        summary: "Publish, revise, or restore one public person index",
        description:
          "The request accepts either a person-index packet or an object whose packet member is that packet. The canonical packet digest is the idempotency key. Identical live bytes are a write-free no-op, identical withdrawn bytes restore the same revision, and changed bytes increment the revision. Free accounts retain up to 200 profiles and 20 MiB of canonical packet data. Meaningful writes use a token bucket replenishing 60 per hour with burst 10. Packets are at most 512 KiB; graph projections are at most 64 KiB. Withdrawal does not spend publishing quota.",
        tags: ["Publishing"],
        security: [{ publishCredential: [] }],
        "x-soulscrape-risk": "R3",
        "x-soulscrape-idempotent": true,
        "x-soulscrape-side-effect": "Makes the validated packet public at soulscrape.com/<username>/<handle>.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                oneOf: [
                  ref("PersonIndex"),
                  {
                    type: "object",
                    required: ["packet"],
                    properties: { packet: ref("PersonIndex") },
                  },
                ],
              },
            },
          },
        },
        responses: {
          "200": jsonResponse("The publication result.", ref("PublishResponse")),
          ...errorResponses,
          "409": { $ref: "#/components/responses/LimitExceeded" },
        },
      },
    },
    "/api/v1/people/{handle}": {
      delete: {
        operationId: "withdrawPersonIndex",
        summary: "Withdraw one public person index",
        description:
          "Withdrawal removes the full profile from live reads while retaining the packet for audit and later restoration. Public summary, graph, theme, and question caches have a 30-second freshness window. Republishing the identical packet restores it at the same revision.",
        tags: ["Publishing"],
        security: [{ publishCredential: [] }],
        "x-soulscrape-risk": "R3",
        "x-soulscrape-idempotent": true,
        "x-soulscrape-side-effect": "Removes the profile from public reads without deleting its retained publication record.",
        parameters: [{ name: "handle", in: "path", required: true, schema: handleSchema }],
        responses: {
          "200": jsonResponse("The index is withdrawn.", ref("WithdrawResponse")),
          "400": { $ref: "#/components/responses/BadRequest" },
          "401": { $ref: "#/components/responses/Unauthorized" },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalFailure" },
          "503": { $ref: "#/components/responses/Unavailable" },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      publishCredential: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "spt_<48 base64url characters>",
        description: "Revocable credential issued after the member authorizes the device flow.",
      },
    },
    parameters: {
      Cursor: { name: "cursor", in: "query", required: false, description: "Opaque continuation from this endpoint only; keep the same filters. Omit for a fresh traversal.", schema: { type: "string", minLength: 1, maxLength: 2048 } },
      GraphLimit: { name: "limit", in: "query", required: false, schema: { type: "integer", minimum: 1, maximum: 25, default: 10 } },
      IndexLimit: { name: "limit", in: "query", required: false, schema: { type: "integer", minimum: 1, maximum: 100, default: 100 } },
      Since: {
        name: "since",
        in: "query",
        required: false,
        description:
          "Return rows updated at or after this non-negative millisecond timestamp. This is a bounded row delta, not a durable cursor, and does not include deletions.",
        schema: millisecondTimestampSchema,
      },
    },
    responses: {
      BadRequest: jsonResponse("The request is malformed or the packet is invalid.", ref("ErrorResponse")),
      BadSince: jsonResponse("The since parameter is not a non-negative safe integer timestamp.", ref("ErrorResponse")),
      Unauthorized: jsonResponse("The publishing credential is missing, invalid, or revoked.", ref("ErrorResponse")),
      NotFound: jsonResponse("The requested record or device code was not found.", ref("ErrorResponse")),
      Expired: jsonResponse("The device code expired.", ref("ErrorResponse")),
      LimitExceeded: jsonResponse("The account's profile limit is reached.", ref("ErrorResponse")),
      InternalFailure: jsonResponse("The operation could not be confirmed. Read retryable and reconcile mutation state before retrying.", ref("ErrorResponse")),
      UpstreamFailure: jsonResponse("The bounded provider operation failed and may be retried as directed by the response.", ref("ErrorResponse")),
      Unavailable: jsonResponse("Publishing is not configured for this deployment.", ref("ErrorResponse")),
    },
    schemas: {
      Pagination: objectSchema(["nextCursor", "isDone", "snapshot"], {
        nextCursor: { oneOf: [{ type: "string", minLength: 1, maxLength: 2048 }, { type: "null" }] },
        isDone: { type: "boolean" },
        snapshot: { type: "boolean", const: false },
      }),
      ErrorResponse: objectSchema(["ok", "version", "error"], {
        ok: { type: "boolean", const: false },
        version: apiVersionSchema,
        error: objectSchema(["code", "message", "retryable"], {
          code: { type: "string", minLength: 1, maxLength: 80 },
          message: { type: "string", minLength: 1, maxLength: 500 },
          retryable: { type: "boolean" },
          retryAfterMs: { type: "integer", minimum: 0, maximum: Number.MAX_SAFE_INTEGER },
        }),
      }),
      PersonIndex: embeddedPersonIndexSchema(personIndexSchema) as Schema,
      CorpusProfile: objectSchema(
        ["username", "handle", "displayName", "summary", "packetDigest", "revision", "publishedAtMs", "updatedAtMs"],
        {
          username: usernameSchema,
          handle: handleSchema,
          displayName: { type: "string", minLength: 1, maxLength: 200 },
          summary: { type: "string", minLength: 1, maxLength: 600 },
          subjectKind: { type: "string", enum: ["person", "organization"] },
          wikidataId: { type: "string", pattern: "^Q[1-9][0-9]{0,9}$" },
          packetDigest: digestSchema,
          revision: { type: "integer", minimum: 1 },
          publishedAtMs: millisecondTimestampSchema,
          updatedAtMs: millisecondTimestampSchema,
        },
      ),
      SyncState: objectSchema(
        ["mode", "scope", "complete", "deletionsIncluded", "fullReconciliationRequired", "asOfMsMeaning"],
        {
          mode: { type: "string", enum: ["full", "row-delta"] },
          scope: { type: "string", const: "paged-live-corpus" },
          complete: { type: "boolean", const: false },
          deletionsIncluded: { type: "boolean", const: false },
          fullReconciliationRequired: { type: "boolean", const: true },
          asOfMsMeaning: { type: "string", const: "response-start-not-cursor" },
        },
      ),
      CorpusIndexResponse: objectSchema(
        ["ok", "version", "asOfMs", "pagination", "corpusDigestVersion", "corpusDigest", "profiles", "sync"],
        {
          ok: { type: "boolean", const: true },
          version: apiVersionSchema,
          pagination: ref("Pagination"),
          asOfMs: millisecondTimestampSchema,
          corpusDigestVersion: { type: "string", const: "soulscrape.corpus-page.v1" },
          corpusDigest: digestSchema,
          profiles: arraySchema(ref("CorpusProfile"), 100),
          sync: ref("SyncState"),
        },
      ),
      GraphNode: objectSchema(["id", "kind", "handle", "displayName"], {
        id: { type: "string", minLength: 1, maxLength: 256 },
        kind: { type: "string", enum: ["profile", "external"] },
        handle: { type: "string", minLength: 1, maxLength: 200 },
        displayName: { type: "string", minLength: 1, maxLength: 200 },
        username: usernameSchema,
        subjectKind: { type: "string", minLength: 1, maxLength: 80 },
        wikidataId: { type: "string", pattern: "^Q[1-9][0-9]{0,9}$" },
        binding: { type: "string", enum: ["publisher-asserted-qid", "publisher-scoped-slug"] },
      }),
      GraphEdge: objectSchema(["id", "from", "to", "kind", "origin", "targetHandle", "resolution"], {
        id: { type: "string", pattern: "^edge-[a-f0-9]{64}$" },
        from: { type: "string", minLength: 1, maxLength: 129 },
        to: { type: "string", minLength: 1, maxLength: 256 },
        kind: { type: "string", minLength: 1, maxLength: 80 },
        origin: { type: "string", enum: ["relation", "timeline", "appearance"] },
        recordId: { type: "string", minLength: 1 },
        targetHandle: { type: "string", minLength: 1, maxLength: 200 },
        targetWikidataId: { type: "string", pattern: "^Q[1-9][0-9]{0,9}$" },
        targetKind: { type: "string", minLength: 1, maxLength: 80 },
        resolution: { type: "string", enum: ["publisher-handle", "publisher-asserted-qid", "external"] },
        note: { type: "string", minLength: 1, maxLength: 500 },
        start: { type: "string", minLength: 4, maxLength: 10 },
        end: { type: "string", minLength: 4, maxLength: 10 },
        sourceIds: arraySchema({ type: "string", pattern: "^source-[a-f0-9]{20}$" }, 24),
      }),
      ChangedSource: objectSchema(["id", "username", "handle", "packetDigest", "revision", "updatedAtMs"], {
        id: { type: "string", minLength: 1, maxLength: 129 },
        username: usernameSchema,
        handle: handleSchema,
        packetDigest: digestSchema,
        revision: { type: "integer", minimum: 1 },
        updatedAtMs: millisecondTimestampSchema,
      }),
      GraphResponse: objectSchema(
        ["ok", "version", "pagination", "projectionVersion", "asOfMs", "corpusDigest", "corpusDigestVersion", "meta", "changedSources", "sync", "nodes", "edges"],
        {
          ok: { type: "boolean", const: true },
          version: apiVersionSchema,
          pagination: ref("Pagination"),
          projectionVersion: { type: "string", const: "soulscrape.graph.v3" },
          asOfMs: millisecondTimestampSchema,
          corpusDigest: digestSchema,
          corpusDigestVersion: { type: "string", const: "soulscrape.corpus-page.v1" },
          meta: objectSchema(["profiles", "nodes", "edges"], {
            profiles: { type: "integer", minimum: 0 },
            nodes: { type: "integer", minimum: 0 },
            edges: { type: "integer", minimum: 0 },
          }),
          changedSources: arraySchema(ref("ChangedSource"), 25),
          sync: objectSchema(
            ["mode", "sinceMs", "replacement", "resolutionScope", "scope", "complete", "deletionsIncluded", "fullReconciliationRequired", "asOfMsMeaning"],
            {
              mode: { type: "string", enum: ["full", "row-delta"] },
              sinceMs: { oneOf: [millisecondTimestampSchema, { type: "null" }] },
              replacement: { type: "string", const: "outbound-sets-for-changed-sources" },
              resolutionScope: { type: "string", enum: ["complete-corpus", "unresolved-page"] },
              scope: { type: "string", const: "paged-live-corpus" },
              complete: { type: "boolean", const: false },
              deletionsIncluded: { type: "boolean", const: false },
              fullReconciliationRequired: { type: "boolean", const: true },
              asOfMsMeaning: { type: "string", const: "response-start-not-cursor" },
            },
          ),
          nodes: arraySchema(ref("GraphNode")),
          edges: arraySchema(ref("GraphEdge")),
        },
      ),
      Theme: objectSchema(["subject", "kind", "title"], {
        subject: { type: "string", minLength: 1, maxLength: 129 },
        kind: { type: "string", minLength: 1, maxLength: 80 },
        title: { type: "string", minLength: 1, maxLength: 300 },
        status: { type: "string", minLength: 1, maxLength: 80 },
      }),
      ThemesResponse: objectSchema(["ok", "version", "asOfMs", "pagination", "themes"], {
        ok: { type: "boolean", const: true },
        version: apiVersionSchema,
          pagination: ref("Pagination"),
        asOfMs: millisecondTimestampSchema,
        themes: arraySchema(ref("Theme")),
      }),
      Question: objectSchema(["subject", "question"], {
        subject: { type: "string", minLength: 1, maxLength: 129 },
        question: { type: "string", minLength: 1, maxLength: 500 },
      }),
      QuestionsResponse: objectSchema(["ok", "version", "asOfMs", "pagination", "questions"], {
        ok: { type: "boolean", const: true },
        version: apiVersionSchema,
          pagination: ref("Pagination"),
        asOfMs: millisecondTimestampSchema,
        questions: arraySchema(ref("Question")),
      }),
      PublicProfileResponse: objectSchema(["ok", "version", "profile"], {
        ok: { type: "boolean", const: true },
        version: apiVersionSchema,
        profile: objectSchema(["username", "handle", "packetDigest", "revision", "packet"], {
          username: usernameSchema,
          handle: handleSchema,
          packetDigest: digestSchema,
          revision: { type: "integer", minimum: 1 },
          packet: ref("PersonIndex"),
        }),
      }),
      DeviceStartResponse: objectSchema(["ok", "version", "code", "secret", "verificationUrl", "expiresInSec", "pollAfterMs"], {
        ok: { type: "boolean", const: true },
        version: apiVersionSchema,
        code: { type: "string", pattern: "^SS-[2-9A-HJKMNP-TV-Z]{4}-[2-9A-HJKMNP-TV-Z]{4}$" },
        secret: { type: "string", format: "password", pattern: "^sps_[A-Za-z0-9_-]{48}$", "x-sensitive": true },
        verificationUrl: { type: "string", format: "uri", pattern: "^https://soulscrape\\.com/connect\\?code=" },
        expiresInSec: { type: "integer", const: 900 },
        pollAfterMs: { type: "integer", const: 2_000 },
      }),
      DevicePollRequest: objectSchema(["secret"], {
        secret: { type: "string", format: "password", pattern: "^sps_[A-Za-z0-9_-]{48}$", "x-sensitive": true },
      }),
      DevicePollResponse: {
        oneOf: [
          objectSchema(["ok", "version", "status", "pollAfterMs"], {
            ok: { type: "boolean", const: true },
            version: apiVersionSchema,
            status: { type: "string", const: "pending" },
            pollAfterMs: { type: "integer", const: 2_000 },
          }),
          objectSchema(["ok", "version", "status", "token", "username"], {
            ok: { type: "boolean", const: true },
            version: apiVersionSchema,
            status: { type: "string", const: "authorized" },
            token: { type: "string", format: "password", pattern: "^spt_[A-Za-z0-9_-]{48}$", "x-sensitive": true },
            username: usernameSchema,
          }),
        ],
      },
      CredentialAccountResponse: objectSchema(["ok", "version", "accountId", "username"], {
        ok: { type: "boolean", const: true },
        version: apiVersionSchema,
        accountId: { type: "string", minLength: 1, maxLength: 128 },
        username: usernameSchema,
      }),
      CredentialRevokedResponse: objectSchema(["ok", "version", "revoked"], {
        ok: { type: "boolean", const: true },
        version: apiVersionSchema,
        revoked: { type: "boolean", const: true },
      }),
      OwnedIndex: objectSchema(["handle", "displayName", "packetDigest", "revision", "publishedAtMs", "updatedAtMs", "withdrawn"], {
        handle: handleSchema,
        displayName: { type: "string", minLength: 1, maxLength: 200 },
        packetDigest: digestSchema,
        revision: { type: "integer", minimum: 1 },
        publishedAtMs: millisecondTimestampSchema,
        updatedAtMs: millisecondTimestampSchema,
        withdrawn: { type: "boolean" },
      }),
      OwnedIndexesResponse: objectSchema(["ok", "version", "people"], {
        ok: { type: "boolean", const: true },
        version: apiVersionSchema,
        people: arraySchema(ref("OwnedIndex"), 200),
      }),
      PublishResponse: objectSchema(["ok", "version", "handle", "username", "packetDigest", "revision", "changed", "url"], {
        ok: { type: "boolean", const: true },
        version: apiVersionSchema,
        handle: handleSchema,
        username: usernameSchema,
        packetDigest: digestSchema,
        revision: { type: "integer", minimum: 1 },
        changed: { type: "boolean" },
        url: { type: "string", format: "uri", pattern: "^https://soulscrape\\.com/" },
      }),
      WithdrawResponse: objectSchema(["ok", "version", "withdrawn", "handle"], {
        ok: { type: "boolean", const: true },
        version: apiVersionSchema,
        withdrawn: { type: "boolean", const: true },
        handle: handleSchema,
      }),
    },
  },
} as const;
