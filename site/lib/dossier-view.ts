import type { PersonIndex, PersonIndexEvent } from "../../skills/soulscrape/scripts/person-index";
import { sortedTimeline } from "./profile-view";

const TOPICS = [
  { id: "birth", label: "Birth", kinds: ["birth"] },
  { id: "founding", label: "Founding", kinds: ["founded"] },
  { id: "education", label: "Education and apprenticeships", kinds: ["education", "apprenticeship"] },
  { id: "roles", label: "Roles", kinds: ["role"] },
  { id: "projects", label: "Projects", kinds: ["project"] },
  { id: "publications", label: "Publications", kinds: ["publication"] },
  { id: "awards", label: "Awards", kinds: ["award"] },
  { id: "exhibitions", label: "Exhibitions", kinds: ["exhibition"] },
  { id: "media", label: "Media", kinds: ["media"] },
  { id: "funding", label: "Funding", kinds: ["funding"] },
  { id: "milestones", label: "Milestones", kinds: ["milestone"] },
];

const TOPIC_KINDS = new Set(TOPICS.flatMap(topic => topic.kinds));

export type TimelineTopic = Readonly<{
  id: string;
  label: string;
  events: readonly PersonIndexEvent[];
}>;

export function timelineTopics(packet: PersonIndex): TimelineTopic[] {
  const events = sortedTimeline(packet);
  return [
    ...TOPICS.map(topic => ({
      id: topic.id,
      label: topic.label,
      events: events.filter(event => topic.kinds.includes(event.kind)),
    })),
    { id: "other", label: "Other events", events: events.filter(event => !TOPIC_KINDS.has(event.kind)) },
  ].filter(topic => topic.events.length > 0);
}

export function timelineEventId(event: PersonIndexEvent): string {
  return `timeline-event-${event.id}`;
}
