---
description: >-
  This section provides a set of useful functions to manage and format text data, including truncating long strings, ensuring text fits specific sizes, and managing system messages with emojis and colors. 
---

# Texts Utilities

This section provides a set of useful functions to manage and format text data, including truncating long strings, ensuring text fits specific sizes, and managing system messages with emojis and colors.

---

## `limitDataToShow`

Limits the length of data to fit within a specific character count. Handles arrays, strings, or any other data by truncating or transforming it as needed.

### Parameters:
- **`data`**: The data to limit (array, string, or any type).
- **`maxLength`**: The maximum length allowed (number or key from `MaxLength` enum).
- **`transformation`**: A function to transform the data into a string.

### Example:
```ts
const result = await limitDataToShow(["item1", "item2", "item3"], 50, JSON.stringify);
```

---

## `forceTextSize`

Ensures a string or number has a fixed length by either truncating it or padding it with spaces.

### Parameters:
- **`text`**: The text or number to modify.
- **`size`**: The desired length of the result.
- **`before`**: (Optional) If `true`, pads the text on the left; otherwise, pads on the right.

### Example:
```ts
const paddedText = forceTextSize("hello", 10); // "hello     "
```

---

## `getSystemEmoji`

Retrieves a system emoji based on its type (success, error, loading, or warning). It uses a default set of emojis but can be configured to use custom ones.

### Parameters:
- **`name`**: The name of the emoji type (e.g., `"success"`, `"error"`).

### Example:
```ts
const emoji = getSystemEmoji("success"); // ✅
```

---

## `getSystemMessage`

Generates a system message formatted with optional emojis, embeds, and code blocks. This utility is designed to create consistent system notifications.

### Parameters:
- **`type`**: The type of message (e.g., `"default"`, `"success"`, `"error"`).
- **`message`**: The message content, error or `SystemMessageOptions` to display.
- **`options`**: (Optional) Additional options for displaying the message (e.g., code formatting, stack traces).

### Example:
```ts
const message = await getSystemMessage("error", new Error("Something went wrong"));
```

---

## `System Colors and Emojis`

The framework provides preconfigured colors and emojis for system messages:

- **System Colors**: `default`, `success`, `error`, `loading`, `warning`.
- **System Emojis**: ✅ (success), ❌ (error), ⏳ (loading), ⚠️ (warning).

These are customizable via configuration.