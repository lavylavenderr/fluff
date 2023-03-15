-- CreateTable
CREATE TABLE `Actions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `discord_id` VARCHAR(191) NOT NULL,
    `given` INTEGER NOT NULL DEFAULT 0,
    `bark` INTEGER NOT NULL DEFAULT 0,
    `bite` INTEGER NOT NULL DEFAULT 0,
    `boop` INTEGER NOT NULL DEFAULT 0,
    `hug` INTEGER NOT NULL DEFAULT 0,
    `kiss` INTEGER NOT NULL DEFAULT 0,
    `nuzzle` INTEGER NOT NULL DEFAULT 0,
    `pet` INTEGER NOT NULL DEFAULT 0,
    `poke` INTEGER NOT NULL DEFAULT 0,
    `slap` INTEGER NOT NULL DEFAULT 0,
    `spank` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `Actions_discord_id_key`(`discord_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Blacklist` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `guild_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL DEFAULT 'N/A',
    `reason` VARCHAR(191) NOT NULL DEFAULT 'No reason given.',

    UNIQUE INDEX `Blacklist_guild_id_key`(`guild_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
