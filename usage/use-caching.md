---
description: Powerful caching utilities to reduce database and API requests.
---

# Data Caching

In order to reduce the number of database or external API requests, this framework provides two built-in caching utilities: a simple `Cache` class for temporary values and an advanced `ResponseCache` class for asynchronous queries. Both are located in `src/app/util.ts` and is imported by default in the `app` namespace.

## Simple Cache

The `Cache` class allows you to temporarily store and retrieve values using a key. It's useful for short-term storage and can ensure that default values are set if a key doesn't exist.

### Example Usage

```ts
// Set a value in the cache
app.cache.set("key1", "some value")

// Get a value from the cache
const value = app.cache.get<string>("key1")

// Ensure a default value if the key is missing
const defaultValue = app.cache.ensure<string>("key2", "default")
```

### Methods

- **`get(key: string)`**: Retrieves the cached value for the given key. Returns `undefined` if the key doesn't exist.
- **`set(key: string, value: any)`**: Stores a value with the given key.
- **`delete(key: string)`**: Removes the value associated with the given key.
- **`ensure(key: string, defaultValue: T)`**: Retrieves the value for the key or sets it to `defaultValue` if the key is not found.

---

## ResponseCache

The `ResponseCache` class is designed for caching results of asynchronous queries. It can store the response of a function for a specified timeout period, ensuring that repeated requests within this period return the cached result rather than triggering a new query.

### Example Usage

Create a new ResponseCache for a slow SQL query in a `src/namespaces/players.ts` namespace with a `src/tables/players.ts` table.

```ts
// src/namespaces/players.ts

import playerTable from "#tables/players.ts"

/**
 * Cache for storing ready players in a guild, refreshed every 10 minutes if consulted.
 */
export const guildReadyPlayers = new app.ResponseCache(async (guildId: string) => {
  // Select all players that are ready in the guild
  return await playerTable.query.where("guildId", guildId).andWhere("ready", true)
}, 600_000)

/**
 * Get the list of ready players in a guild (using the cache to optimize queries).
 */
export async function getReadyPlayers(guildId: string) {
  return await guildReadyPlayers.get(guildId)
}

/**
 * Update the ready status of a player in a guild and refresh the guild's cache.
 */
export async function setPlayerReady(guildId: string, playerId: string, ready: boolean) {
  await playerTable.query.where("guildId", guildId).andWhere("id", playerId).update({ ready })
  
  // Force the cache to update.
  // Each change in the players table should be succeeded by a <ReponseCache>.fetch() call 
  //  to preserve the integrity of the cache data.
  await guildReadyPlayers.fetch(guildId)
}
```

### Methods

- **`get(...params: Params)`**: Retrieves the cached value for the provided parameters if it exists and hasn't expired. Otherwise, it performs the request and stores the result.
- **`fetch(...params: Params)`**: Always performs the request and updates the cached value, regardless of whether the value is already cached.

---

## Use Cases

- **Simple Cache**: Ideal for quick lookups or storing frequently accessed data temporarily, such as configuration values or session-specific information.

- **ResponseCache**: Best suited for reducing API calls or database queries where the response does not change often and can be reused within a specific time window.

---

For further details, refer to the source code in `src/app/util.ts`.