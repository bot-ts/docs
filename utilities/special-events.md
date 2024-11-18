---
description: This section outlines the utilities for managing special events using a custom event emitter in Discord. It allows you to create and manage events efficiently without relying on the default client events, making it ideal for "quick & once" use cases.
---

# Special Events

## `messageEmitter`

An instance of `EventEmitter` specifically designed to handle message events.

---

## `onceMessage` Function

The `onceMessage` function allows you to register a callback for a specific event that will only be executed once. After it is triggered, it will be removed automatically.

### Parameters:

- **`emitter`**: The specific event emitter (from `EventEmitters`).
- **`cb`**: The callback function to execute when the event is emitted.

### Example:

```ts
onceMessage("messageCreate", (message) => {
  console.log(`Message received: ${message.content}`)
})
```

---

## More default Client events

The `MoreClientEvents` interface extends the default Discord client events by adding custom events, such as `raw` and `afterReady`.

### Example:

```ts
export interface MoreClientEvents {
  raw: [packet: apiTypes.GatewayDispatchPayload]
  afterReady: [discord.Client<true>] // Wait for all "ready" asyncronous listeners before triggering
}
```

---
