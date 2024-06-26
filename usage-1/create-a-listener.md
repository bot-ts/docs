# Listener

## Create a listener

Like the commands, it is recommended to use the [CLI](https://www.npmjs.com/package/make-bot.ts) to correctly generate the body of the listener.

### CLI pattern

By typing `bot add listener -h` you will get this following information.

```bash
bot add listener <event> <category>

Positionals:
  event      # listener event name                                      [required]
  category   # listener category name                                   [required]

Options:
  --version  # Show version number                                       [boolean]
  --help     # Show help                                                 [boolean]
```

### Example

For a "ready" listener that initializes any metrics, type the following command.

```bash
bot add listener "ready" "metrics"
```

Then, the `src/listeners/metrics.ready.ts` file will be ready to be implemented.

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
