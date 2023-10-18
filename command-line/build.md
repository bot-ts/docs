---
description: The esbuild-based TypeScript builder.
---

# Build

{% hint style="warning" %}
It uses esbuild so **it ignores TypeScript type checking**! You must use the [test script](test.md) for type checking before deployment.
{% endhint %}

## Usage

{% tabs %}
{% tab title="npm" %}
```bash
npm run build
```
{% endtab %}

{% tab title="Yarn" %}
```bash
yarn build
```
{% endtab %}

{% tab title="Gulp" %}
```bash
gulp build
```
{% endtab %}
{% endtabs %}
