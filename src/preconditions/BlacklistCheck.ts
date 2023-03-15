import { PrismaClient } from '@prisma/client';
import { Precondition, Piece, Result } from '@sapphire/framework';
import type { CommandInteraction, ContextMenuCommandInteraction, Message } from 'discord.js';

const prisma = new PrismaClient();

const blacklistCache = new Map<string, boolean>();

export class BlacklistCheck extends Precondition {
	public constructor(context: Piece.Context, options: Precondition.Options) {
		super(context, {
			...options,
			position: 20
		});
	}

	public override chatInputRun(interaction: CommandInteraction) {
		return this.doBlacklistCheck(interaction.guildId);
	}

	private async doBlacklistCheck(guildId: string | null) {
		if (guildId === null) return this.ok();

		const isBannedGuild = blacklistCache.get(guildId) ?? await prisma.blacklist.findUnique({
			where: {
				guild_id: String(guildId),
			},
		});

		if (!isBannedGuild) {
			blacklistCache.set(guildId, false);
			this.container.logger.info(`Guild ${guildId} is not blacklisted`);
			return this.ok();
		}

		blacklistCache.set(guildId, true);
		this.container.logger.info(`Guild ${guildId} is blacklisted`);
		return this.error({ message: "1" });
	}
}
