---
description: Powerful caching utilities to reduce database and API requests.
---

# Data Caching

In order to reduce the number of database or external API requests, this framework provides two built-in caching utilities: a simple `Cache` class for temporary values and an advanced `ResponseCache` class for asynchronous queries. Both are located in `src/app/util.ts` and is imported by default in the `app` namespace.

## Simple Cache

The `Cache` class allows you to temporarily store and retrieve values using a key. It's useful for short-term storage and can ensure that default values are set if a key doesn't exist.

### Example Usage

```ts
import { cache } from "#core/util"

// Set a value in the cache
cache.set("key1", "some value")

// Get a value from the cache
const value = cache.get<string>("key1")

// Ensure a default value if the key is missing
const defaultValue = cache.ensure<string>("key2", "default")
```

### Methods

- **`get(key: string)`**: Retrieves the cached value for the given key. Returns `undefined` if the key doesn't exist.
- **`set(key: string, value: any)`**: Stores a value with the given key.
- **`delete(key: string)`**: Removes the value associated with the given key.
- **`ensure(key: string, defaultValue: T)`**: Retrieves the value for the key or sets it to `defaultValue` if the key is not found.

### Good practices

I recommend [creating a namespace](/usage/create-a-namespace.md) to define pairs of IDs and types to use when calling the cache to ensure consistency and clarity in the use of the simple cache.

```typescript
// src/namespaces/cache.ts

import { cache } from "#core/util"

export interface CacheKeys {
  lastChannelMessage: Record<string, string>
  lastUserMessage: Record<string, string>
  // etc.
}

export function get<K extends keyof CacheKeys>(key: K) {
  return cache.get<CacheKeys[K]>(key)
}

export function set<K extends keyof CacheKeys>(key: K, value: CacheKeys[K]) {
  cache.set(key, value)
}
```

{% hint style="info" %}
This good practice behavior will be built into the framework in the future.
{% endhint %}

---

## ResponseCache from `@ghom/orm`

The `ResponseCache` class is designed for caching results of asynchronous queries. It can store the response of a function for a specified timeout period, ensuring that repeated requests within this period return the cached result rather than triggering a new query.

> Documentation: [@ghom/orm #caching](https://www.npmjs.com/package/@ghom/orm?activeTab=readme#caching)

### Examples Usage

#### 1. Create a new ResponseCache for a slow API request.

If you have a slow API request that you want to cache for a specific time, you can create a new ResponseCache.

```typescript
import { ResponseCache } from "@ghom/orm"

// Cache for storing the result of a slow calculation API, refreshed every 10 minutes if consulted.
export const calcCache = new app.ResponseCache(async (q: string) => {
  return await fetch("https://api.example.com/calc?q=" + q)
    .then((res) => res.json())
    .then((json) => json.result)
}, 600_000)

const exp = "2+2"

// Fetches the result from the API if not cached
const result = await calcCache.get(exp, exp)

// Directly fetches the cached result
const cached = await calcCache.get(exp, exp)

// Forces the cache to update and returns the new result
const refresh = await calcCache.fetch(exp, exp)

// Invalidates the cache for the given identifier
calcCache.invalidate(exp)
```

#### 2. Use the built-in ResponseCache for a slow SQL query.

Example in a `src/namespaces/players.ts` namespace with a `src/tables/players.ts` table.

```typescript
// src/namespaces/players.ts

import playerTable from "#tables/players"

/**
 * Get the list of ready players in a guild (using the cache to optimize queries).
 */
export async function getReadyPlayers(guildId: string) {
  return await playerTable.cache.get(`ready:${guildId}`, async (query) => {
    return query.where("guildId", guildId).andWhere("ready", true)
  })
}

/**
 * Update the ready status of a player in a guild (and refresh the table's cache).
 */
export async function setPlayerReady(
  guildId: string,
  playerId: string,
  ready: boolean,
) {
  await playerTable.cache.set((query) =>
    query.where("guildId", guildId).andWhere("id", playerId).update({ ready }),
  )
}
```

{% hint style="info" %}
You can setup the built-in cache expiration time in the `src/app/config.ts` file and independently for each table in the table's `caching` option.
{% endhint %}

### Methods

- **`get(id: string, ...params: Params)`**: Retrieves the cached value for the provided parameters if it exists and hasn't expired. Otherwise, it performs the request and stores the result.
- **`fetch(id: string, ...params: Params)`**: Always performs the request and updates the cached value, regardless of whether the value is already cached.
- **`invalidate(id: string)`**: Removes the cached value for the provided identifier.

---

## Use Cases

- **Simple Cache**: Ideal for quick lookups or storing frequently accessed data temporarily, such as configuration values or session-specific information.

- **ResponseCache**: Best suited for reducing API calls or database queries where the response does not change often and can be reused within a specific time window.
