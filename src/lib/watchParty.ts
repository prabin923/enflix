import fs from "fs";
import path from "path";

const PARTIES_FILE = path.join(process.cwd(), "data", "parties.json");

export interface WatchParty {
  id: string;
  movieId: string;
  hostId: string;
  hostName: string;
  createdAt: string;
  participants: { id: string; name: string }[];
}

function getParties(): WatchParty[] {
  try {
    if (!fs.existsSync(PARTIES_FILE)) {
      fs.writeFileSync(PARTIES_FILE, "[]");
      return [];
    }
    const data = fs.readFileSync(PARTIES_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function saveParties(parties: WatchParty[]) {
  const dir = path.dirname(PARTIES_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(PARTIES_FILE, JSON.stringify(parties, null, 2));
}

export function createParty(
  movieId: string,
  hostId: string,
  hostName: string
): WatchParty {
  const parties = getParties();
  const party: WatchParty = {
    id: crypto.randomUUID(),
    movieId,
    hostId,
    hostName,
    createdAt: new Date().toISOString(),
    participants: [{ id: hostId, name: hostName }],
  };
  parties.push(party);
  saveParties(parties);
  return party;
}

export function joinParty(
  partyId: string,
  userId: string,
  userName: string
): WatchParty | null {
  const parties = getParties();
  const party = parties.find((p) => p.id === partyId);
  if (!party) return null;

  if (!party.participants.find((p) => p.id === userId)) {
    party.participants.push({ id: userId, name: userName });
    saveParties(parties);
  }
  return party;
}

export function getParty(partyId: string): WatchParty | null {
  const parties = getParties();
  return parties.find((p) => p.id === partyId) || null;
}
