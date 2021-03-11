# Fbi witness reports API

## Table of contents:

- [Requirements](#requirements)
- [Setup](#setup)
- [API docs](#api-endpoint)

### Requirements

* NodeJS >= v12.21.0

### Setup

1. Copy content of the `.env.example` to  the `.env` and set configuration.
2. Run `npm install`.
3. Run `npm start` or `npm run start:watch`.
4. Make a request to the `http://localhost:API_PORT` (where API_PORT is defined in `.env` - if not set, 4000 will be used by default).

### Api-endpoint

This API has only one endpoint `POST /report`.
#### Parameters

| Name | Location | Type  | Required | Description |
|:-----|:------|:------|:---------|:------------|
title | body | string | true | Title of a case for which witness has a report.
phone | body | string | true | Witness's phone number so he could be contacted for additional information.
