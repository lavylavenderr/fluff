import { ActivityType, Client } from "discord.js";

interface ActivityItem {
  details: string;
  type:
    | ActivityType.Playing
    // Don't this is usable
    // | ActivityType.Streaming
    | ActivityType.Listening
    | ActivityType.Watching
    // Don't this is usable
    // | ActivityType.Competing
    | undefined;
}

const presences: ActivityItem[] = [
    {
        details: `/help | fluffbot.app`,
        type: ActivityType.Listening
    }
]

export async function cyclePresence(client: Client) {
    const index = Math.floor(Math.random() * presences.length);
    const activity = presences[index]

    client.user?.setActivity(activity.details, { type: activity.type })
}