# Listener

## Create a listener

Like the commands, it is recommended to use the [CLI](https://www.npmjs.com/package/make-bot.ts) to correctly generate the body of the listener.

### CLI pattern

```bash
bot add listener
```

## Additional events

For the proper functioning of the framework, some additional events have been added. Here is a list.

```typescript
interface MoreClientEvents {
  /** Already existing event. I just added the typing */
  raw: [packet: GatewayDispatchPayload]

  /** Called after the end of all "ready" listeners */
  afterReady: [Client<true>]
}
```
