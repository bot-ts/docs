# Listener

## Create a listener

Like the commands, it is recommended to use the [CLI](https://www.npmjs.com/package/make-bot.ts) to correctly generate the body of the listener.

### CLI pattern

By typing `bot add listener -h` you will get this following information.

```bash
bot add listener <event>

Positionals:
  event      # listener event name                                      [required]

Options:
  -n, --name # The name of listener file                           [default: null]
  --version  # Show version number                                       [boolean]
  --help     # Show help                                                 [boolean]
```

### Example

For a "ready" listener that displays Hello World in the console, type the following command.

```bash
bot add listener "ready" --name "helloWorld"
```

Then, the `src/listeners/helloWorld.ts` file will be ready to be implemented.

You can use the default naming pattern `{category or behavior}.{event name}` to organize your listeners. Example:

```bash
bot add listener "ready" --name "hellowWorld.ready"
```
