# serverless-azure-host-json

This plugin copies `host.json` for [serverless-azure-functions](https://github.com/serverless/serverless-azure-functions)

## How to Install

```bash
$ npm install serverless-azure-host-json
```

## How to Customize

```yaml
service: my-service

provider:
  name: azure
  stage: ${opt:stage, 'dev'}
  location: japaneast

plugins:
  - serverless-azure-functions
  - serverless-azure-host-json

custom:
  host-json: host-${self:provider.stage}.json # default: host.json
```
