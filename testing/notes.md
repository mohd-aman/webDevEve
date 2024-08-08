
## Agenda

* TDD and types of test
* Usecase of Jest
* usecase of  RTL
* implementings unit tests
* Deployment -> setup
* Deploying on netlify





# Testing
## Definition : 
    your code matches the required specification

- Testing is the process of evaluating and validating a React application's functionality to ensure it meets the desired quality and performance standards.


## Types of Testing 
### Way to you test
* Manual testing 
* Automated testing

### Areas of testing

- **Unit Testing:**
   - *Description:* Verifying the smallest units (components) of the app in isolation to ensure individual functionality.
- **Functional Testing/Integration Testing:**
   - *Description:* Assessing how multiple components interact to achieve specific functions within the application.
- **End-to-End Testing:**
   - *Description:* Evaluating the entire application workflow to ensure alignment with specified requirements.
- **Stress Testing:**
   - *Description:* Assessing how well the system performs under extreme conditions, identifying breaking points.
- **Performance Testing:**
   - *Description:* Measuring responsiveness and efficiency to ensure smooth user experience under normal conditions.
- **Security Testing:**
   - *Description:* Identifying vulnerabilities and weaknesses to ensure protection against security threats.

## React: unit testing  
## Tech:(create-react-app) 
* JEST 
    * test runner: it finds and executes all the tests
    * It also provides you feature of describe, test, and expect
    * snapshot testing
    *  https://jestjs.io/

* React testing library
        * emulates Rendering
        * find an element on that emulated UI
        * fire event
### What is required to test a react component???

- **Snapshot Test:**
   - **Explanation:** A snapshot test captures the current state of a React component's rendered output. It takes a snapshot of the component's markup and compares it to the stored snapshot. If there are unintended changes, the test fails, highlighting potential issues with the component's visual representation.
   - **Use Case:** Verifying that the rendered output of a component remains consistent over time, helping detect unexpected changes.
- **Initial State:**
   - **Explanation:** Testing the initial state of a React component involves ensuring that, upon rendering, the component initializes its state as expected. This is crucial for validating that the component starts in the correct state before any user interactions or data updates occur.
   - **Use Case:** Confirming that a form component begins with empty input fields or that a counter component starts with an initial count of zero.
- **Update to That Initial State:**
   - **Explanation:** This aspect of testing involves simulating user interactions or external events that trigger updates to the component's state. It ensures that the component responds correctly to changes and updates its state as intended.
   - **Use Case:** Testing that a button click updates the state of a counter component or that user input correctly modifies the state of a form component.

### When to write a unit test case (Recommendation)
* only those components which critical/complex

## TDD: Test-driven Development (red-green)
`Usecase`: requirements are stable
* First write all the test cases -> write the component
* refractor all your test cases -> optimize your component




# React Unit testing

## Usage

-> To test individual components in isolation.
-> You have to test the component's functions, logic, and rendering.
-> Tools to be used: Jest and RTL(React Testing Library)

## Jest 

It's a testing framework provided by Facebook. -> It's a test runner and provides the assertions, mocking, snapshot testing, and code coverage as well.

## Setting up Jest

1. Visit Jest documentation: [Jest Docs](https://jestjs.io/)

2. Install the required Babel dependencies for transpiling your code:

   ```
   npm install --save-dev @babel/core @babel/preset-env @babel/preset-react
   ```

3. Create a configuration file either as `.babelrc` or `babel.config.js` and specify the presets:

   ```json
   {
      "presets": ["@babel/preset-env", "@babel/preset-react"]
   }
   ```

4. Create a Jest configuration file `jest.config.js`:

   ```javascript
   export default {
       transform: {
           "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
       },
   };
   ```

5. Install Jest, Jest's DOM environment for running tests in a browser-like environment, and React Test Renderer:

   ```
   npm i -D jest jest-environment-jsdom react-test-renderer
   ```

6. Update your Jest configuration in `jest.config.js` to specify the test environment as 'jsdom':

   ```javascript
   export default {
       testEnvironment: 'jsdom',
       transform: {
           "^.+\\.(js|jsx)$": "babel-jest",
       },
   };
   ```

Setting up React Testing Library (RTL):

1. Explore the RTL documentation: [RTL Docs](https://testing-library.com/docs/)

2. Install the RTL package:

   ```
   npm install @testing-library/react
   ```

3. Update your test script in the `package.json` file to run Jest on your source files. Add or modify the "test" script like this:

   ```json
   "scripts": {
       "test": "jest src"
   }
   ```

4. Run your test cases using the following command:

   ```
   npm run test
   ```

This setup will allow you to write and run tests for your React components using Jest and React Testing Library, ensuring a user-centric testing approach.




##  How to Deploy an App to Netlify from a GitHub Repository

This is my favorite way of deploying applications on Netlify.

Because whenever you push any changes to the GitHub repository, it will automatically be deployed to Netlify. You can also see all deployed versions and easily roll back to any previously working version of code with just a single click.

If you already have a repository pushed to GitHub, then you just need to connect it.

Login to your Netlify account. In the dashboard, click on the `New site from Git` button.

![netlify_home](https://www.freecodecamp.org/news/content/images/2021/04/netlify_home.png)

Click on the `GitHub` button to connect your GitHub repository.

![git_provider](https://www.freecodecamp.org/news/content/images/2021/04/git_provider.png)

It will open a new tab. Make sure the popup is enabled in your browser.

![select_repository](https://www.freecodecamp.org/news/content/images/2021/04/select_repository.png)

Search for the GitHub repository in the `Search repos` search box. If your repository is not getting displayed then click on the `Configure the Netlify app on GitHub` button at the bottom of the page.

![configure_netlify](https://www.freecodecamp.org/news/content/images/2021/04/configure_netlify.png)

Once clicked, scroll down on the page and click on the `Select repositories` dropdown and search for your repository and click on the `Save` button.

![select_repo](https://www.freecodecamp.org/news/content/images/2021/04/select_repo.png)

You will be redirected to the previous page showing all the available repositories.

Search for the repository you want to deploy. For this article, I have selected the [react-book-management-app](https://github.com/myogeshchavan97/react-book-management-app) repository which we created in my [previous article](https://www.freecodecamp.org/news/react-crud-app-how-to-create-a-book-management-app-from-scratch/).

![find_repository-1](https://www.freecodecamp.org/news/content/images/2021/04/find_repository-1.png)

Once you select the repository, you will see the following screen:

![deploy_repository](https://www.freecodecamp.org/news/content/images/2021/04/deploy_repository.png)

For this application, we don't need to change anything.

Your `Build command` and `Publish directory` will be automatically populated. Make sure to enter these fields if you have a different command in `package.json` to build your app or those fields are not auto-populated.

Now, click on the `Deploy site` button. Once clicked, you will see the `Site deploy in progress` message.

![deploying](https://www.freecodecamp.org/news/content/images/2021/04/deploying.png)

You'll have to wait a little bit while it's deploying. Once deployment is completed, you will see the following screen:

![deployed](https://www.freecodecamp.org/news/content/images/2021/04/deployed.png)

Open the link in the new tab and you will see your application deployed live.

![deployed_app](https://www.freecodecamp.org/news/content/images/2021/04/deployed_app.gif)

Awesome! Now, if you make any changes in the source code and push that change to GitHub, Netlify will detect that change and re-deploy your application with your latest changes.

If you check the application, you will see that the application works just fine with the navigation and you're able to add/edit/delete a book.

![working_app](https://www.freecodecamp.org/news/content/images/2021/04/working_app.gif)

**But there is one issue.** If you directly access the `/add` route or refresh the `/add` route page, you will get a page not found error as shown below:

![page_not_found](https://www.freecodecamp.org/news/content/images/2021/04/page_not_found.gif)

You will get the same error if you try to refresh the edit page route.

This is because when we access any route on our local machine, React Router handles the routing. But when we deploy the application on any server, directly accessing the route will send the request to the server itself (Netlify in our case).

But as there is no `/add` route handler on the server-side, you will see a page not found error. But Netlify provides a way to fix this.

Create a new file with the name `_redirects` inside the `public` folder of our project and add the following contents inside it:

```js
/* /index.html 200
```

Here, we're telling Netlify to redirect all the routes to the `index.html` file.

The `index.html` file contains our entire React app code. It gets generated inside the `build` folder when the `yarn build` command is executed by Netlify while deploying the app.

And as routing is handled by our React app which is contained in the `index.html` file, our application will work without a page not found issue.

Now, push the changes to the GitHub repository so Netlify will deploy the app again with these changes.

And once deployed, if you check the deployed application, you will see that the application works fine and we don't get a page not found error.

![no_page_not_found](https://www.freecodecamp.org/news/content/images/2021/04/no_page_not_found.gif)

That's it! We're all done with deploying our application to Netlify.

## How to Easily Change a Site Name in Netlify

If you check the name of the deployed site you will see that it's not easy to remember, especially if you have lot of applications deployed. But Netlify provides a way to easily change that.

Click on the `Site settings` button displayed on the `Site overview` section.

![site_settings](https://www.freecodecamp.org/news/content/images/2021/04/site_settings.png)

Then click on the `Change site name` button and enter a new name. Click on the `Save` button, and now you can access your application with the changed name.

![changed_site_name](https://www.freecodecamp.org/news/content/images/2021/04/changed_site_name.gif)

> I usually like to give the same name as the repository name so it's easy to find a particular application if you have a lot of deployed applications on Netlify.