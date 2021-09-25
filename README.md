# snowballgr-ui

snowballgr-ui is...

## Quick Start

You will need [docker-compose](https://docs.docker.com/compose/).

Clone this repo:

```bash
git clone git@gitlab.dhe.duke.edu:Crucible/devops/snowballgr-ui.git
cd snowballgr-ui
```

Set up the environment variables:

```bash
cp .env.example .env
```

Run with docker-compose:

```bash
docker-compose build
docker-compose up
```

Now you have a running React app at http://localhost:3000.

## Development

As you edit code the server will automatically reload to pick up your changes. Sometimes you might need to shut down the server and rebuild the Docker images, for example if you add a new dependency. You can do this with `docker-compose stop` followed by `docker-compose build` and then restart the server with `docker-compose up`.

Interaction with the project to install dependencies, run tests, etc. is achieved through executing commands in the `app` container created by docker-compose. You can open a shell in the container via `docker-compose run --rm app bash` or you can run one-off commands using docker-compose like `docker-compose run --rm app yarn test`.

### Useful commands

All of these are run within the `app` container as described above.

#### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

#### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Deployment

This project is deployed to the app platform so if you start by forking it you should be well on your way, but below is a step-by-step guide. These steps assume you have general familiarity with the [app platform](https://gitlab.dhe.duke.edu/Crucible/devops/app-platform/-/tree/main).

- Replace all instances of `crucible` and `crucible-ui` with the appropriate values for your project.
- [Create a Kubernetes namespace](https://gitlab.oit.duke.edu/crucible/infra/kubernetes-build/-/tree/master/apps#adding-a-namespace) for your project if you haven't already done so.
- Follow the process to [procure a vanity url](https://gitlab.dhe.duke.edu/Crucible/devops/app-platform/-/blob/main/developers.md#vanity-urls), if needed.

### Environment Configuration

One particular note is that the Docker image is set up so the app can be configured like any 12-factor app: through environment variables. Any environment variable prefixed with REACT*APP will be available in the app under window.\_env*. The same rules apply to the .env file when developing locally. Be aware that these variables are still exposed in the browser since this is a frontend app.
