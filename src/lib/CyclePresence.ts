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
    type: ActivityType.Listening,
  },
  {
    details: `f!help | fluffbot.app`,
    type: ActivityType.Listening,
  },
  {
    details: `over %s% servers`,
    type: ActivityType.Watching
  },
  {
    details: `over %u% users`,
    type: ActivityType.Watching
  }
];

export async function cyclePresence(client: Client) {
  const index = Math.floor(Math.random() * presences.length);
  const activity = presences[index];
  
  let activityString = "";

  if (activity.details.includes("%s%")) activityString = activity.details.replace("%s%", client.guilds.cache.size.toString());
  else activityString = activity.details.replace("%u%", client.users.cache.size.toString());

  client.user?.setActivity(activityString, { type: activity.type });
}
