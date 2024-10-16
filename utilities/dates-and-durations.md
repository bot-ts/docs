---
description: This section covers utilities for handling dates and durations using the `dayjs` library and the `tims` package. These tools allow you to manage time zones, format dates, and perform various date-related calculations easily.
---

# Dates and Durations

This section covers utilities for handling dates and durations using the `dayjs` library and the `tims` package. These tools allow you to manage time zones, format dates, and perform various date-related calculations easily.

---

## Locale Configuration

The locale for `dayjs` is determined by the environment variable `BOT_LOCALE`. When set, the corresponding locale file is imported, and `dayjs` is configured to use it. If the specified locale is incorrect, a warning is logged.

---

## Time Zone Support

`dayjs` is extended with time zone functionality using the `timezone` plugin. You can set a default time zone using the `BOT_TIMEZONE` environment variable.

---

## Plugins

The following plugins are extended in `dayjs` to enhance its capabilities:

- **UTC**: Handle UTC time formatting and manipulation.
- **Relative Time**: Display relative time (e.g., "2 hours ago").
- **Timezone**: Manage different time zones effectively.
- **To Object**: Convert date objects into simpler formats.

---

## Usage of `dayjs`

You can now utilize `dayjs` for various date manipulations and formatting:

### Example:
```ts
const now = dayjs(); // Current date and time
const formatted = now.format("YYYY-MM-DD HH:mm:ss"); // Format date
const utcDate = dayjs.utc(1); // Create a UTC date
```

---

## `tims` Package

In addition to `dayjs`, all exports from the `tims` package are available. This package provides additional utilities for displaying and calculating durations.

### Example:
```ts
import { since } from "tims";

const durationText = since(new Date(2022, 1, 1)); // "2 months ago"
```

---

## uptime

The uptime in milliseconds is provided from the utilities.

```ts
export const startedAt = Date.now()

export function uptime(): number {
  return Date.now() - startedAt
}
```

### Example:
```ts
import * as app from "#app"

function sendTheUptime(channel: app.SendableChannels) {
  return app.duration(app.uptime())
}
```

---