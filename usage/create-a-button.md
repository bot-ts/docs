# Button

## Create a Button

To create a button in your project, it is recommended to use the provided CLI tool. This will ensure that your button is correctly generated and ready to implement.

### CLI Pattern

```bash
bot add button
```

### Example

For a "buy" button, you can obtain the following file at `src/buttons/buy.ts`, ready for implementation.

## Define Button Parameters

Once the button is created, you can define any parameters the button will receive. Here’s an example of a "buy" button that takes an `article` and a `quantity` as parameters:

```typescript
import { Button } from "#core/button"

export type BuyButtonParams = {
  article: string
  quantity: number
}

export default new Button<BuyButtonParams>({
  key: "buy",
  description: "The buy button",
  builder: (builder) => builder.setLabel("Buy"),
  async run(interaction, article, quantity) {
    await interaction.deferUpdate()
    await interaction.followUp({
      content: `You clicked the buy button for ${quantity}x ${article}!`,
      ephemeral: true,
    })
  },
})
```

---

## Using the Button

After creating the button handler, you can instantiate and use the button in your bot’s interactions. Here is an example of how to send a button within a message:

```typescript
import discord from "discord.js"
import buyButton from "#buttons/buy"

await channel.send({
  components: [
    new discord.ActionRowBuilder<discord.MessageActionRowComponentBuilder>().addComponents(
      buyButton.create({ article: "article 1", quantity: 3 }),
    ),
  ],
})
```

You can also use the button from an external function:

```typescript
import discord from "discord.js"
import { createButton } from "#code/button"
import buyButton from "#buttons/buy"

await channel.send({
  components: [
    new discord.ActionRowBuilder<discord.MessageActionRowComponentBuilder>().addComponents(
      createButton(buyButton, {
        article: "article 1",
        quantity: 3,
      }),
    ),
  ],
})
```
