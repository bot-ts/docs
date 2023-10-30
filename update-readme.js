const axios = require("axios");
const fs = require("fs");

axios
  .get(
    "https://raw.githubusercontent.com/bot-ts/.github/main/profile/readme.md",
  )
  .then((response) => {
    fs.writeFile(
      "readme.md",
      `---
description: Welcome to the bot.ts official documentation.
---

# Introduction

![banner](https://media.discordapp.net/attachments/609313381421154304/1168550107239690240/bot.ts_banner.png)

${response.data.replace(/<div class="banner">.+?<\/div>/s, "")}`,
      (err) => {
        if (err) {
          console.error("Error writing readme.md:", err);
        } else {
          console.log("readme.md updated successfully.");
        }
      },
    );
  })
  .catch((error) => {
    console.error("Error downloading readme.md:", error);
  });
