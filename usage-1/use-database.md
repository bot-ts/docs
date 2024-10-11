# Database

## Set up the database

To configure the database for your application, it is recommended to use the [CLI](https://www.npmjs.com/package/make-bot.ts) command to set the desired database type. You can do cela by executing the following command:

### CLI pattern

Typing `bot set database -h` will provide you with the following information:

```bash
bot set database <database>

setup database

Arguments positionnels :
  database  used database
             [chaîne de caractères] [requis] [choix : "sqlite3", "mysql2", "pg"]

Options :
      --help            Affiche l'aide                                 [booléen]
  -h, --host            database host                     [défaut : "localhost"]
      --port            database port                     [chaîne de caractères]
  -u, --user            database user                     [chaîne de caractères]
      --password, --pw  database password                 [chaîne de caractères]
      --dbname, --db    database name                     [chaîne de caractères]
```

### Example

To set up PostgreSQL as your database and update the connexion configuration for localhost:5432 with the user `postgres` and `mypassword` as password, type the following command:

```bash
bot set database pg --password "mypassword"
```

This command updates the `src/app/database.ts` file, installs the necessary dependencies and update the `.env` connexion configuration.

## Create a table

To create a new table, you can use the following command, which will generate a new file in the `src/tables/` directory:

### CLI pattern

Typing `bot add table -h` will show you the following information:

```bash
bot add table <name>

create a database table

Arguments positionnels :
  name  table name                               [chaîne de caractères] [requis]

Options :
  --help     Affiche l'aide                                            [booléen]
```

### Example

To create a table named `users`, you would type:

```bash
bot add table "users"
```

After running this command, you will need to manually configure the columns and typing by creating a TypeScript interface and passing it as a generic type.

### Example of table configuration

Here’s an example of how to configure a table:

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
  }
});
```

## ORM with Knex

This framework's ORM uses Knex.js as its query builder to facilitate database interactions. You can import your table configurations easily in your command files and use very simple queries as method chains.

### Example of using a table in a command

To use your newly created table in a command, you can do the following:

```typescript
import * as app from "#app";
import usersTable from "#tables/users.ts";

export default new app.SlashCommand({
  name: "test",
  description: "A test command to query the users table",
  async run(interaction) {
    // equivalent of sql`SELECT * FROM users WHERE name = "John" LIMIT 1`[0]
    const user = await usersTable.query.where("name", "John").first();
    
    return interaction.reply({ content: JSON.stringify(user) })
  },
});
```

## Migrations

Migrations are automatically managed by the ORM. You can create migrations by adding keys to the `TableOption.migrations` object. The type of this object is `Record<Version as number, Migration as (tableBuilder) => void>`.

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
      table.string("profile_picture").nullable();
    },
    2: (tableBuilder) => {
      table.dropColumn("profile_picture");
    },
  },
});
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
});
```

## About database configuration

{% content-ref url="broken-reference" %}
[Broken link](broken-reference)
{% endcontent-ref %}

{% content-ref url="broken-reference" %}
[Broken link](broken-reference)
{% endcontent-ref %}
