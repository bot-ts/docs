---
description: Everything he needs to know about the database
---

# Database

## Set up the database

To configure the database for your application, it is recommended to use the [CLI](https://www.npmjs.com/package/make-bot.ts) command to set the desired database type. You can do cela by executing the following command:

### CLI pattern

```bash
bot config database
```

## Create a table

To create a new table, you can use the following command, which will generate a new file in the `src/tables/{name}` directory:

### CLI pattern

```bash
bot add table
```

### Example of table configuration

Here’s an example of how to configure a table. Welcome to the `src/tables/users.ts` file:

```typescript
import { Table } from "#database"

interface User {
  id: number
  name?: string
  email: string
}

export default new Table<User>({
  name: "users",
  description: "Table of users",
  setup: (table) => {
    table.increments("id").primary()
    table.string("name")
    table.string("email").notNullable()
  },
})
```

## About Knex and ORM usage

This framework's ORM uses Knex.js as its query builder to facilitate database interactions. You can import your table configurations easily in your command files and use very simple queries as method chains.

Access to the Knex documentation here: [https://knexjs.org/guide/](https://knexjs.org/guide/)

### Example of using a table in a command

To use your newly created table in a command, you can launch a typed Knex query with the `<Table>.query` property.

```typescript
import { SlashCommand } from "#core/slash"
import usersTable from "#tables/users"

export default new SlashCommand({
  name: "test",
  description: "A test command to query the users table",
  async run(interaction) {
    // equivalent of sql`SELECT * FROM users WHERE name = "John" LIMIT 1`[0]
    const user = await usersTable.query.where("name", "John").first()

    return interaction.reply({ content: JSON.stringify(user) })
  },
})
```

## Migrations

Migrations are automatically managed by the ORM. You can create migrations by adding keys to the `TableOption.migrations` object.&#x20;

The type of this object is `Record<Version as number, Migration as (tableBuilder) => void>`.

Migrations are automatically run at each bot launch and in ascending order based on their versions.

### Example of defining migrations

Here’s an example of how to define migrations for a table:

```typescript
export default new Table<User>({
  name: "users",
  setup: (table) => {
    table.increments("id").primary()
    table.string("name")
    table.string("email").notNullable()
  },
  migrations: {
    1: (table) => {
      table.string("profile_picture").nullable()
    },
    2: (tableBuilder) => {
      table.dropColumn("profile_picture")
    },
  },
})
```

## Table loading priorities

You can specify the loading order of tables and their migrations using the `priority: number` property. This property influences the order in which the tables are loaded and their migrations are executed.

### Example of setting priority

```typescript
export default new Table<User>({
  name: "users",
  priority: 1, // Higher priority means it will load before others
  setup: (table) => {
    table.increments("id").primary()
    table.string("name")
    table.string("email").notNullable()
  },
})
```
