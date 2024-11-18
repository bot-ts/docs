# Production

{% hint style="warning" %}
The documentation is currently being produced.
{% endhint %}

## Deployment with pm2

To deploy your bot, clone the repository onto your server. If the server is running Linux, execute `npm install`. For other operating systems, execute `npm install --force`. To start the bot using the entry point specified in `package.json` (dist/index.js), use the following PM2 command:

```bash
pm2 start ./dist/index.js --name my-new-bot
```

## Dependency Optimization

To optimize dependencies for server deployment, build a lighter version of your bot using the command `npm run final` or `yarn final`. After cloning the repository and running `npm install`, this command will build the bot and then remove all development dependencies from the node_modules directory, leaving only the essential dependencies required for production.
