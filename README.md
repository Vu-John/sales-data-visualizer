ACME Inc - Sales Data Visualizer
================================

A Python Flask application that visualizes ACME Inc sale orders data from [this](https://docs.google.com/spreadsheets/d/1xQO4sCn5g7i7vQ4894Bxi_wzqkrREJOe5k7aeZ2iW8M/edit#gid=0) Google sheet.

## Prerequisite

* Create/Obtain an API key from [Google Cloud Platform](https://console.cloud.google.com/apis/credentials)

* In the project root directory create a `.env` file and add your Google API Key
```
DEVELOPER_KEY="<YOUR_GOOGLE_API_KEY>"
```

## Development Setup

* `pipenv install`

* `pipenv shell`

* `python app.py`

## Deploy

* `heroku create`

* `heroku config:set DEVELOPER_KEY=<YOUR_GOOGLE_API_KEY>`

* `git push heroku master`

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Built With

* Flask
* D3.js
