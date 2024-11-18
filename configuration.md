---
description: Everything you need to know about the bot's configuration file.
---

# Configuration

## Switch engine

## Custom system message

You can create your own system message template from the configuration file.&#x20;

For example, if you want to force embedding all messages and to replace all embed titles by author properties to add the bot's avatar on header, add the following code to your configuration file:

```typescript
export const config = new Config({
  // ...
  systemMessages: async (type, data, client) => {
    const app = await import("#app")

    if (typeof data === "string" || data instanceof Error)
      return {
        embeds: [
          new EmbedBuilder()
            .setColor(app.systemColors[type])
            .setAuthor({
              name: data instanceof Error ? data.message : "System message",
              iconURL: client.user?.displayAvatarURL(),
            })
            .setDescription(data instanceof Error ? data.stack ?? null : data),
        ],
      }

    return {
      embeds: [
        new EmbedBuilder()
          .setColor(app.systemColors[type])
          .setAuthor({
            name: data.header ?? "System message",
            iconURL: client.user?.displayAvatarURL(),
          })
          .setDescription(
            data.body instanceof Error
              ? data.body.stack ?? null
              : data.body ?? null,
          )
          .setFooter(data.footer ? { text: data.footer } : null),
      ],
    }
  },
})
```
