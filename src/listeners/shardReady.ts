import { Events, Listener } from "@sapphire/framework";

export class ApiShardEvent extends Listener<typeof Events.ShardReady> {
  public constructor(context: Listener.Context, options: Listener.Options) {
    super(context, {
      ...options,
      event: "shardReady",
    });
  }

  public run(id: number) {
    this.container.logger.info(`Shard #${id} is now ready and logged in as ${this.container.client.user?.tag}!`)
  }
}