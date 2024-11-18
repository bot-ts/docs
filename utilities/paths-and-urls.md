---
description: >-
  This section contains utilities to manage file paths and URLs within your project, ensuring consistent path generation from the project root and handling Git URLs for files.
---

# Paths and URLs

---

## `rootPath`

Generates a relative path from the root of your project.

### Parameters:

- **`..._path`**: The segments of the path to join.

### Example:

```ts
const relativePath = rootPath("src", "index.ts") // Relative path from project root
```

---

## `fullPath`

Generates an absolute path starting from the current working directory of your project.

### Parameters:

- **`..._path`**: The segments of the path to join.

### Example:

```ts
const absolutePath = fullPath("src", "index.ts") // Absolute path from project root
```

---

## `packageJSON`

Loads and parses the project's `package.json` file as an object. This can be used to inspect dependencies and other metadata within your project.

### Example:

```ts
console.log(packageJSON.version) // Outputs the project version from package.json
```

---

## `getDatabaseDriverName`

Determines the database driver in use by inspecting the dependencies in `package.json`. It supports PostgreSQL (`pg`), MySQL (`mysql2`), and SQLite (`sqlite3`).

### Example:

```ts
const driverName = getDatabaseDriverName() // Outputs the name of the database driver
```

### Throws:

- If no supported database driver is found in the dependencies.

---

## `convertDistPathToSrc`

Converts a file path from the `dist` folder (typically used for compiled JavaScript) to the equivalent `src` folder (TypeScript source).

### Parameters:

- **`path`**: The file path to convert.

### Example:

```ts
const sourcePath = convertDistPathToSrc("dist/index.js") // Converts to "src/index.ts"
```

---

## `getFileGitURL`

Generates a GitHub URL for a specific file, using the current branch and remote. This utility is helpful for referencing files in your GitHub repository.

### Parameters:

- **`filepath`**: The path of the file to generate a GitHub URL for.

### Example:

```ts
const gitURL = await getFileGitURL("src/index.ts")
// Example output: "https://github.com/your-repo/blob/main/src/index.ts"
```

### Returns:

- A URL string pointing to the file in the repository, or `undefined` if it cannot generate the URL.

---
