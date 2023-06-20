import {
  EmbedFooterOptions,
  EmbedBuilder,
  EmbedField,
  EmbedAuthorOptions,
  ColorResolvable,
} from "discord.js";

interface ConstructEmbedOptions {
  title?: string;
  description?: string;
  author?: EmbedAuthorOptions;
  fields?: EmbedField[];
  image?: string;
  thumbnail?: string;
  URL?: string;
  footer?: EmbedFooterOptions;
  color?: ColorResolvable;
}

export function constructEmbed(
  options: ConstructEmbedOptions = {}
): EmbedBuilder {
  const {
    title,
    description,
    author,
    fields,
    image,
    thumbnail,
    URL,
    footer,
    color,
  } = options;

  return new EmbedBuilder()
    .setAuthor(author ?? null)
    .setTitle(title ?? null)
    .setDescription(description ?? null)
    .setFields(fields ?? [])
    .setImage(image ?? null)
    .setThumbnail(thumbnail ?? null)
    .setURL(URL ?? null)
    .setFooter(footer ?? null)
    .setColor(color ?? 0xf7d8de);
}
