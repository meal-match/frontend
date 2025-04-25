# Welcome to Meal Match Frontend

This is a [JavaScript](https://en.wikipedia.org/wiki/JavaScript) application built with [React Native](https://reactnative.dev/) and [Expo](https://expo.dev) and created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get Started

1. Clone the repository

    ```bash
    mkdir MealMatch
    cd MealMatch
    git clone https://github.com/meal-match/frontend
    ```

1. Install dependencies

    ```bash
    cd frontend
    npm install
    ```

1. Install the following required extensions in Visual Studio Code

    - SonarLint
    - ESLint
    - Prettier
    - Prettier ESLint
    - Biome
    - SonarQube

1. Optionally install the following additional extensions

    - GitHub Copilot ([instructions for free student access](https://docs.github.com/en/copilot/managing-copilot/managing-copilot-as-an-individual-subscriber/managing-your-copilot-subscription/getting-free-access-to-copilot-as-a-student-teacher-or-maintainer)) **OR** Codeium
    - GitLens

1. Create a `.env` file with the following variables:

    - `EXPO_PUBLIC_API_URL` - all API requests to the backend will route through this URL.
    - `EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY` - key to interact with [Stripe](https://docs.stripe.com/sdks/react-native).
    - `EXPO_PUBLIC_WEBSITE_URL` - URL to the [project website](https://github.com/meal-match/website).
    - `EXPO_PUBLIC_PRIVACY_POLICY_URL` - URL to the project's Privacy Policy.

1. Start the app

    ```bash
     npm run start
    ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the `app` directory.

## Development

### Branching

Before making changes, please create a new branch, since you will not be able to push directly to the `main` branch. Your new branch's name should be [kebab-case](https://www.theserverside.com/definition/Kebab-case).

```bash
 git pull
 git checkout -b your-new-branch
```

If you do happen to make changes on the `main` branch, you can easily move those changes to a new branch.

```bash
 git stash
 git checkout -b your-new-branch
 git stash pop
```

Once you are ready to merge your changes, simply commit any remaining changes, publish your branch, create a Pull Request, and notify the team to review your code. Two people will need to approve your changes before they can be merged.

### Pre-Commit Checks

When commiting your changes, please note that we use [Husky](https://github.com/typicode/husky) and [Lint-Staged](https://www.npmjs.com/package/lint-staged) to perform Prettier formatting and ESLint code checks. If you have outstanding ESLint errors, this will prevent you from comitting. If you are using the VSCode Git GUI instead of the command line, you can find these errors in the "Ouput" tab at the bottom. The idea is that you resolve or (if necessary) [programmatically ignore](https://stackoverflow.com/questions/27732209/turning-off-eslint-rule-for-a-specific-line) ESLint errors before pushing to the code repo.

### Libraries

Review the documentation of the following key libraries:

- [Expo Router](https://docs.expo.dev/router/introduction/) for navigation
- [React Native Paper](https://callstack.github.io/react-native-paper/) for components and theming
- [React Redux](https://react-redux.js.org/) for state management
- [Expo Vector Icons](https://icons.expo.fyi/Index) and [Ionicons](https://ionic.io/ionicons) for icons

## Building

Building is handled automatically via our [GitHub Actions](https://docs.github.com/en/actions) pipelines defined [here](/.github/workflows/). All pull requests and pushes to the `main` branch will trigger an Expo `development` build. If this build fails, the pull request or push is probably faulty and needs to be adjusted accordingly.

When ready to push a build to the Apple app store, make a pull request to put the `main` branch into the `release` branch. After this pull request is merged, it will automatically trigger a `production` build and upload it to the Apple Developer portal.

<details>
  <summary>Manual Building & Submitting</summary>

1. Run `eas login` and authenticate with Expo.

2. Run `eas build --platform ios --profile [production|development]` and authenticate with Apple Developer.

3. In order to submit a `production` build, you must first fill in the `submit.production` field of the [eas.json](/eas.json) file with the following:

```json
"ios": {
    "appleId": "yourappledeveloperaddress@email.com",
    "ascAppId": "yourappid",
    "appleTeamId": "yourteamid"
}
```

4. Run `eas submit -p ios --latest` to submit the build to the Apple Developer portal.
 </details>

## Learn More

To learn more about developing this project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics [here](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.
