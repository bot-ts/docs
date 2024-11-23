# Adding a Custom Type

Bot.ts comes with many built-in type resolvers for common data types like strings, numbers, arrays, and Discord-specific types. However, you might want to add your own custom type resolver for specific use cases.

{% hint style="warning" %}
Custom type resolvers are not supported in slash commands.
{% endhint %}

## Understanding Type Resolvers

A type resolver is responsible for converting raw string input into a specific data type. For example, the built-in "number" resolver converts string inputs like "123" or "1_000" into actual JavaScript numbers.

## Creating a Custom Type Resolver

To add a custom type, you'll need to add a new `TypeResolver` to the `types` array in `src/types.ts`. Here's the basic structure:

```typescript
new argument.TypeResolver("yourTypeName", {
  resolver: async (value) => {
    // Your resolver logic here
    // If validation fails, throw a TypeResolverError
    // Return the resolved value
  },
})
```

## Example: Creating a Color Type Resolver

Here's an example of how to create a custom type resolver for hex colors:

```typescript
new argument.TypeResolver("color", {
  resolver: async (value) => {
    const hexColorRegex = /^#?([0-9A-Fa-f]{6})$/
    const match = String(value).match(hexColorRegex)

    if (!match) {
      throw new argument.TypeResolverError("Invalid hex color", {
        expected: ["#FF0000", "FF0000"],
        provided: value,
      })
    }

    return `#${match[1].toUpperCase()}`
  },
})
```

## Using Your Custom Type

Once you've added your type resolver, you can use it in your commands like any other type:

```typescript
import { Command } from "#core/command"

export default new Command({
  name: "setcolor",
  description: "Set a color using hex code",
  options: [
    {
      name: "color",
      type: "color",
      description: "The hex color code",
      required: true,
    },
  ],
  run: (message) => {
    message.reply(`Setting color to ${message.args.color}`)
  },
})
```

## Error Handling

When creating a custom type resolver, you should:

1. Validate the input thoroughly
2. Throw a `TypeResolverError` with a clear message when validation fails
3. Include examples of valid inputs in the `expected` array
4. Always include the `provided` value in the error

## Built-in Type Resolvers

bot.ts includes several built-in type resolvers that you can use as reference:

- Basic types: `string`, `number`, `boolean`, `regex`, `date`, `duration`, `json`
- Array types: `array`, `string[]`, `number[]`, `boolean[]`, `date[]`
- Discord types: `user`, `member`, `channel`, `role`, `emote`, `invite`
- Command types: `command`, `slashCommand`

You can find their implementations in `src/types.ts` to use as examples for your own custom types.
