// noinspection JSUnusedGlobalSymbols

import { join } from "path";
import { PrismaClient } from "@prisma/client";
import { GatewayIntentBits } from "discord.js";
import { getRootData } from "@sapphire/pieces";
import { LogLevel, SapphireClient, container } from "@sapphire/framework";
import * as Sentry from "@sentry/node";

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
    container.sentry = Sentry.init({
      dsn: process.env.SENTRYDSN,
      tracesSampleRate: 1.0,
    });

    return super.login(token);
  }

  public override async destroy() {
    await container.prisma.$disconnect();
    return super.destroy();
  }
}

declare module "@sapphire/pieces" {
  interface Container {
    prisma: PrismaClient,
    sentry: any;
  }
}
