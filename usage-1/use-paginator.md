# Paginator

## Static Paginator

The `StaticPaginator` class is ideal for scenarios where the content of all pages is known beforehand and can be preloaded. This paginator manages a fixed set of pages that are provided during instantiation. It is best suited for situations where the content is static or relatively small in size, allowing all pages to be stored in memory. This approach ensures quick navigation between pages without the need for additional data fetching.

### Key features

* **Preloaded Content**: Stores all pages in memory, allowing for quick access and navigation.
* **Simple Implementation**: Easy to use when the total number of pages and their content are known in advance.

### Exemple

```typescript
import * as app from "#app"

const pages = [
  { content: 'Page 1' },
  { content: 'Page 2' },
  { content: 'Page 3' },
] as const

const staticPaginator = new StaticPaginator({
  channel: channel, // Your discord.js channel object
  pages: pages, // Preloaded pages
  useReactions: true,
})
```

## Dynamic Paginator

The `DynamicPaginator` class is designed for scenarios where the content of the pages is generated or fetched dynamically, typically from a data source such as a database or an API. This paginator fetches pages on-the-fly based on the current page index, allowing it to handle a potentially large or infinite number of pages without loading all content upfront. It is particularly useful for paginating over data that might change frequently or is too large to be stored entirely in memory.

### Key features

* **Dynamic Content Loading**: Fetches pages as needed, rather than storing all pages in memory.
* **Asynchronous Operations**: Supports async functions to retrieve page content and count, making it suitable for dynamic data sources.

### Example

```typescript
import * as app from "#app"

const dynamicPaginator = new app.DynamicPaginator({
  channel: channel, // Your discord.js channel object
  async fetchPage(index) {
    // Fetch or generate the content for the page at the given index
    return { content: `Page ${index + 1}` }
  },
  async fetchPageCount() {
    // Return the total number of pages available
    return 10;
  },
  useReactions: true,
})
```
