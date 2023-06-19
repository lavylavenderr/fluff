import { join } from "path";
import { PrismaClient } from "@prisma/client";
import { GatewayIntentBits } from "discord.js";
import { getRootData } from "@sapphire/pieces";
import { LogLevel, SapphireClient, container } from "@sapphire/framework";

import "@sapphire/plugin-api/register";

export class BotClient extends SapphireClient {
  private rootData = getRootData();

  public constructor() {
    super({
      intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
      ],
      api: {
        prefix: "",
        origin: "*",
        listenOptions: {
          port: 3333,
        },
      },
      loadMessageCommandListeners: true,
      defaultPrefix: "f!",
      logger: {
        level: LogLevel.Debug,
      },
      shards: "auto",
    });

    this.stores
      .get("listeners")
      .registerPath(join(this.rootData.root, "listeners"));
    this.stores
      .get("interaction-handlers")
      .registerPath(join(this.rootData.root, "interactions"));
  }

  public override async login(token?: string) {
    container.prisma = new PrismaClient();

    return super.login(token);
  }

  public override async destroy() {
    await container.prisma.$disconnect();
    return super.destroy();
  }
}

declare module "@sapphire/pieces" {
  interface Container {
    prisma: PrismaClient;
  }
}
