import { Events, Listener } from "@sapphire/framework";

export class ApiShardEvent extends Listener<typeof Events.ShardReady> {
  public constructor(context: Listener.Context, options: Listener.Options) {
    super(context, {
      ...options,
      event: "shardReady",
    });
  }

  public run(id: number) {
    // if (id === 0) {
    //   this.container.server.connect();
    //   this.container.logger.info("The API is now up and running!");
    // }

    this.container.logger.info(`Shard #${id} is now ready and logged in as ${this.container.client.user?.tag}!`)
  }
}