import { cronJobs } from "convex/server";

import { internal } from "./_generated/api";

const crons = cronJobs();

crons.interval("remove expired device codes", { minutes: 1 }, internal.devices.pruneExpired, {});
crons.interval("remove old revoked credentials", { hours: 1 }, internal.credentials.pruneRevoked, {});

export default crons;
