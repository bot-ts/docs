# CRON

## Create a CRON Job

To create a scheduled task in your bot, also called a CRON job, use the CLI to set up a basic structure for the job. This simplifies scheduling and running periodic tasks within your bot environment.

### CLI Pattern

You can see the CLI usage by typing `bot add cron -h`, which will return the following information:

```bash
bot add cron <name>

Positionals:
  name  cron name                                                    [required]

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]
```

### Example

To create a job named "daily-report", type the following command:

```bash
bot add cron "dailyReport"
```

This command will generate a file in `src/cron/dailyReport.ts`, which you can then configure with your desired schedule and functionality.

---

## Scheduling the Task

Once the CRON file is created, define the `schedule` parameter to set the execution frequency of the job. This can be configured in three ways:

### 1. Interval Key

These keys represent common intervals and simplify the scheduling process. Choose from:

- **minutely**: Executes every minute
- **hourly**: Executes every hour
- **daily**: Executes once every day
- **weekly**: Executes once every week
- **monthly**: Executes once every month
- **yearly**: Executes once every year

#### Example:

```typescript
import * as app from "#app"

export default new app.Cron({
  name: "dailyReport",
  description: "Generates a daily report",
  schedule: "daily", // runs every day
  async run() {
    // todo: code here
  },
})
```

---

### 2. Simple Interval

Define a custom interval for any unit of time with the following properties:

- **type**: Set to "minute", "hour", "day", "week", "month", or "year".
- **duration**: Specifies the interval length in units of the `type`.

#### Example:

```typescript
import * as app from "#app"

export default new app.Cron({
  name: "reminder-every-3-days",
  description: "Sends a reminder every three days",
  schedule: { type: "day", duration: 3 }, // runs every 3 days
  async run() {
    // todo: code here
  },
})
```

---

### 3. Advanced Interval

For more precise control over the timing, use the following properties:

- **minute**: (0-59 or "*")
- **hour**: (0-23 or "*")
- **dayOfMonth**: (1-31 or "*")
- **month**: (1-12 or CronMonth enum or "*")
- **dayOfWeek**: (0-6 or CronDayOfWeek enum or "*")

#### Example:

```typescript
import * as app from "#app"

export default new app.Cron({
  name: "weekend-check",
  description: "Runs every Saturday at 10:00 AM",
  schedule: {
    minute: 0,
    hour: 10,
    dayOfWeek: app.CronDayOfWeek.Saturday,
  },
  async run() {
    // todo: code here
  },
})
```

---

## Running on Startup

If you want your CRON job to run immediately when the bot starts, set the `runOnStart` property to `true`.

#### Example:

```typescript
import * as app from "#app"

export default new app.Cron({
  name: "startup-check",
  description: "Runs on startup and then hourly",
  schedule: "hourly",
  runOnStart: true, // runs on startup
  async run() {
    // todo: code here
  },
})
```

---

## CRON Class Overview

The CRON class is designed to facilitate the scheduling and management of tasks. Below is an overview of its key components:

```typescript
export class Cron {
  task?: cron.ScheduledTask
  native?: boolean
  filepath?: string
  ranCount = 0

  constructor(public options: CronOptions) {}

  stop() {
    if (this.task) this.task.stop()
  }

  start() {
    if (this.task) this.task.start()
    else
      this.task = cron.schedule(
        cronConfigToPattern(this.options.schedule),
        () => {
          this.options.run.bind(this)()
          this.ranCount++
        },
        {
          name: this.options.name,
          timezone: env.BOT_TIMEZONE,
          runOnInit: this.options.runOnStart,
        },
      )
  }
}
```

### Properties
- **`task`**: Holds the scheduled task instance.
- **`native`**: Indicates whether the CRON job is a native task.
- **`filepath`**: Optional, stores the path to the CRON file.
- **`ranCount`**: Counts how many times the task has run.

### Methods
- **`start()`**: Starts the scheduled task based on the defined `schedule`.
- **`stop()`**: Stops the scheduled task.

---

With these options, you can create and manage periodic tasks for your bot, tailoring them to your needs using the various schedule options.