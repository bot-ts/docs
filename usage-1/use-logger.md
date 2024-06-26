# Logger

## Use the default logger

You can use the logger provided in "app" to create simple logs in the server terminal while remaining in the system logger theme. For example in a command where one of the actions may be problematic, you can do this:

```typescript
import * as app from "#app"

// ...

try {
    // some problematic action
} catch(error) {
    app.error(error as Error)
}
```

You can also uses the other methods of logging like `app.log()` for default informative logs, `app.warn()` for warning logs and `app.success()` for congratulations.

## Use a categorized logger

If you need a logger for a specific behavior or theme, you can create one using the class present in the [@ghom/logger](https://www.npmjs.com/package/@ghom/logger) lib. For example in a namespace supposed to represent a websocket exchange:

```typescript
import * as app from "#app"

const logger = new app.Logger({ section: "websocket" })

export function wsInit() {
    // init websoclet connection...
    
    logger.log("Successfuly initialized")
}
```
