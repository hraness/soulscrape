export type ProfileIdentity = Readonly<{
  username: string;
  handle: string;
  subjectKind?: string;
  wikidataId?: string;
}>;

export type ProfileTarget = Readonly<{
  target: string;
  targetKind?: string;
  targetWikidataId?: string;
}>;

export type ProfileResolver<T extends ProfileIdentity = ProfileIdentity> = (
  username: string,
  target: ProfileTarget,
) => Readonly<{ profile: T; resolution: "publisher-handle" | "publisher-asserted-qid" }> | null;

export function createProfileResolver<T extends ProfileIdentity>(rows: readonly T[]): ProfileResolver<T> {
  const profiles = new Map<string, T[]>();
  const qids = new Map<string, T[]>();
  for (const row of rows) {
    const locator = `${row.username}/${row.handle}`;
    const matches = profiles.get(locator) ?? [];
    matches.push(row);
    profiles.set(locator, matches);
    if (row.wikidataId !== undefined) {
      const key = `${row.username}/${row.wikidataId}`;
      const bindings = qids.get(key) ?? [];
      bindings.push(row);
      qids.set(key, bindings);
    }
  }
  return (username, target) => {
    const compatible = (profile: T) =>
      (profile.subjectKind === "person" || profile.subjectKind === "organization") &&
      (profiles.get(`${profile.username}/${profile.handle}`)?.length === 1) &&
      (target.targetKind === undefined || target.targetKind === profile.subjectKind) &&
      (target.targetWikidataId === undefined || target.targetWikidataId === profile.wikidataId);
    const bindings = target.targetWikidataId === undefined ? [] : qids.get(`${username}/${target.targetWikidataId}`) ?? [];
    if (bindings.length === 1 && compatible(bindings[0]!)) {
      return { profile: bindings[0]!, resolution: "publisher-asserted-qid" };
    }
    if (bindings.length === 0) {
      const matches = profiles.get(`${username}/${target.target}`) ?? [];
      if (matches.length === 1 && compatible(matches[0]!)) {
        return { profile: matches[0]!, resolution: "publisher-handle" };
      }
    }
    return null;
  };
}
