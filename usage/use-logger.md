---
description: Powerful logging utilities to enhance your server terminal output.
---

# Logger

## Use the default logger

You can use the logger provided in "app" to create simple logs in the server terminal while remaining in the system logger theme. For example in a command where one of the actions may be problematic, you can do this:

```typescript
import logger from "#core/logger"

// ...

try {
  // some problematic action
} catch (error) {
  logger.error(error as Error)
}
```

You can also uses the other methods of logging like `app.log()` for default informative logs, `app.warn()` for warning logs and `app.success()` for congratulations.

## Create a logger namespace

If you need a logger for a specific behavior or theme, you can create one using the class present in the [@ghom/logger](https://www.npmjs.com/package/@ghom/logger) lib. For example in a namespace supposed to represent a websocket exchange:

```typescript
import { Logger } from "#core/logger"

const logger = new Logger({ section: "websocket" })

export function wsInit() {
  // init websoclet connection...

  logger.log("Successfuly initialized")
}
```

## Update the default system logger configuration

You can update the default logger configuration by modifying the `logger` property in your `src/config.ts` file. Here is an example of a configuration that removes the logger styles:

```typescript
import { Config } from "#core/config"

export const config = new Config({
  // ...
  logger: {
    pattern: (text, _config, secondaryText) => `${text} - ${secondaryText}`,
  },
})

export default config.options
```
