# Typesense Lando Plugin

This plugin let's you use Typesense as a service in your Lando setup.

## What is Lando?

From Lando's documentation:

> [Lando](https://lando.dev/) is a free, open source, cross-platform, local development environment and DevOps tool built on Docker container technology and developed by Tandem. Designed to work with most major languages, frameworks and services, Lando provides an easy way for developers of all skill levels to specify simple or complex requirements for their projects, and then quickly get to work on them.

## Usage

Clone this repository into `~/.lando/plugins`:

```shell
git clone https://github.com/typesense/typesense-lando-plugin ~/.lando/plugins/typesense
```

or use Lando's `plugin-add`:

```shell
lando plugin-add https://github.com/typesense/typesense-lando-plugin
```

Then in your `.lando.yml` , add the following contents:

```yaml
name: my-typesense-app

services:
  typesense:
    type: typesense:27.1
    portforward: 8108
    apiKey: abc

```

Now when you run `lando start`, Typesense will be available on localhost, port 8108.

You can verify that Typesense is running by running:

```shell
curl http://localhost:8108/health
```

For more info you should check out the [docs](https://docs.lando.dev/elasticsearch):

* [Getting Started](https://docs.lando.dev/elasticsearch/)
* [Configuration](https://docs.lando.dev/elasticsearch/config.html)
* [Examples](https://github.com/lando/elasticsearch/tree/main/examples)
* [Development](https://docs.lando.dev/elasticsearch/development.html)