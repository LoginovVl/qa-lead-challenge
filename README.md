# Signup E2E and API Tests

## 📦 Installation

```bash
npm install
```

## 🚀 Run E2E Tests

```bash
npm run test:e2e
```

## 🔌 Run API Tests

```bash
npm run test:api
```

## 🛠 Tools Used

- [Playwright](https://playwright.dev)
- [Cucumber.js](https://github.com/cucumber/cucumber-js)
- [TypeScript](https://www.typescriptlang.org/)

## Some final assumptions 
1. I added just a few e2e test scenarios just as POC, but even considering more wider API tests coverage, that should be a few more e2e tests to cover some validation cases considering the critical level of the feature
2. I left Api test folder empty just to show it required and usually should cover as much use cases, validation and security checks. In my approach it can be done also with Playwright.
3. I hope the project schema and QA strategy explanation will be enough to you in odred to asses my experiance and way to approach to the challenge.



# QA Strategy

## Introduction & Motivation
 The sign-up flow is a critical entry point for users and directly impacts user acquisition, conversion, and overall experience. Ensuring its continuous functionality, stability, and performance is essential for business success.
 This QA strategy focuses on creating a comprehensive regression and monitoring framework for the sign-up flow across all test levels—unit, integration/API, and end-to-end—while combining automated and manual testing where appropriate.
 
 Motivation:
 * __Reliability__: Prevent disruptions in the user registration process.
 * __Performance__: Ensure fast and responsive sign-up experience, minimizing delays that could reduce conversion.
 * __Error Visibility__: Detect and track failures, validation issues, and unexpected behaviors to quickly resolve potential problems.
 * __Test Coverage__: Maintain thorough automated and manual regression coverage, including edge cases and rare scenarios.

 By aligning testing activities with clear KPIs and monitoring metrics, this strategy ensures the sign-up flow remains functional, performant, and user-friendly throughout the development lifecycle.

## WHAT/WHERE/WHEN

| Test Level | What to Test | When and Where to Test |
| --- | --- | --- |
| Unit Testing | - Individual components (e.g., form validation, input handling) | - As part of CI/CD pipeline, on every code change.(local and CI) |
| Integration/API Testing | - API interactions, database integration, backend services | - As part of CI/CD pipeline, continuously throughout development. (local, CI and for full i API - test env) |
| End-to-End (E2E) Testing | - Full user journeys (e.g., sign-up flow, registration confirmation) | - Full regression testing before each release to ensure the entire flow works across systems. - Stable prod like staging env |
| Manual Exploratory Testing | - Test user flows (e.g., sign-up) with a human perspective. Try using the app in ways that automation might miss (e.g., edge cases, unexpected behaviors). | - Performed by testers during the testing phase or before final release. Helps to uncover issues automation might overlook.- Stable prod like staging env, also sometimes prod |

### Summary of Testing Strategy:
Unit & Integration/API Testing: Automated testing in CI/CD pipeline to catch defects early in the development cycle.
E2E Testing: Comprehensive regression testing before each release to verify end-to-end user journeys.
Manual Exploratory Testing: Adds a human touch to the testing process by focusing on unexpected or edge-case behaviors that automated tests may miss, ensuring the
sign-up flow meets user expectations.
This version includes manual exploratory testing as the last row, with an emphasis on its value in uncovering issues that automated tests may overlook. Let me know if further tweaks are needed!


## E2E Automation Framework Based on POM and BDD Approaches (See above)
The End-to-End (E2E) Automation Framework for testing the sign-up flow integrates two powerful approaches: Page Object Model (POM) and Behavior-Driven Development (BDD). Together, these approaches provide a structured, scalable, and maintainable framework for ensuring the functionality of the sign-up process across different user scenarios.
### Page Object Model (POM)
What is POM?
 The Page Object Model (POM) is a design pattern in which each web page or component is represented as a class. The class contains methods that define interactions users can perform with the page, such as clicking buttons, entering text, and validating page content. This approach abstracts the page-specific logic, making it easier to maintain and scale.
 
Benefits of POM:
* __Separation of Concerns__: POM allows test logic to focus on high-level actions, while the page objects manage the implementation details, resulting in cleaner and more maintainable test code.
* __Reusability__: Page objects can be reused across different tests, promoting efficiency and reducing redundancy in test scripts.
* __Maintainability__: Any changes in the UI (e.g., changes in the layout or component names) only require updates to the page object, not the entire suite of tests, simplifying maintenance.
* __Improved Code Structure__: Organizing test scripts by separating page-specific logic from test cases leads to cleaner, modular code that is easier to read and extend.
### Behavior-Driven Development (BDD)
What is BDD?
Behavior-Driven Development (BDD) is an approach where tests are written in natural language that non-technical stakeholders (e.g., business analysts) can understand. The behavior scenarios are written using Gherkin syntax (Given, When, Then) to describe how the system should behave in various situations from the user's perspective.

Benefits of BDD:
* __Clear Communication__: BDD enables collaboration between developers, testers, and business stakeholders by using a common language. It ensures everyone is aligned on the expected behavior of the application.
* __Readable Test Scenarios__: BDD tests are written in business-friendly language (e.g., "Given the user is on the sign-up page, When they enter valid details, Then they should be redirected to the confirmation page"), making them understandable by both technical and non-technical teams.
* __Early Validation__: Writing BDD scenarios before implementation helps validate requirements early, ensuring that tests align with user expectations and business goals from the start.
* __Traceability__: BDD scenarios map directly to user stories, providing traceability between business requirements and test cases, ensuring all business-critical features are validated.
* __Improved Test Coverage__: BDD’s focus on user stories and behavior ensures that both expected user journeys and edge cases are thoroughly tested, improving overall test coverage.
### Conclusion:
By combining POM and BDD approaches, the E2E Automation Framework ensures that:
Tests are well-organized, maintainable, and scalable through the use of POM.
Collaboration and clarity are enhanced, with BDD bridging the gap between technical and non-technical stakeholders.
Test coverage is comprehensive, addressing both common user flows and edge cases, while ensuring that the sign-up flow is always functional.
This integrated framework not only supports the thorough validation of the sign-up flow but also sets the foundation for a sustainable and scalable test suite that evolves with the application.


## How to Manage Flaky Tests
Flaky tests are tests that sometimes pass and sometimes fail without any changes to the code. Managing flaky tests is essential to maintain the reliability and stability of the test suite. Here are strategies to minimize and manage flaky tests:
1. Autonomy of Each Test
* __Why__: Tests should be independent of each other to ensure that one test does not interfere with another. If tests are tightly coupled, failures in one test could affect others, leading to false positives or negatives.
* __How__: Ensure that each test case has its own setup, test data and teardown process, making sure the environment is reset before each test.
Avoid shared state between tests to prevent cascading failures.
2. Solid Locator Selection
* __Why__: Flaky tests can arise from poorly selected locators that are prone to changes in the UI or that are sensitive to page load times. The right locators help ensure stable interaction with page elements.
* __How__: Use reliable selectors such as IDs (preferably with data-testid or testID attributes). These identifiers are less likely to change and can be controlled better by developers.
Avoid using fragile locators such as XPath or CSS selectors based on the hierarchy of elements, which can break when the UI layout changes.
If using CSS selectors or XPath, prefer more robust attributes like class names or unique tags over relative positioning.
3. Stabilize Dynamic Content
* __Why__: Dynamic content or elements (e.g., pop-ups, AJAX-loaded elements) can be sources of flakiness, as their appearance and timing are often unpredictable.
* __How__: Wait for specific loading indicators or elements that are visible only after the dynamic content has fully loaded.
Use waiting conditions like visibilityOf, presenceOf, or elementToBeClickable to ensure elements are interactable before performing actions.
4. Mocking and Stubbing External Calls
* __Why__: External calls (e.g., API requests, third-party services) can introduce instability into tests if they fail or experience delays. These dependencies can make tests unreliable.
* __How__: Use mocking and stubbing techniques to simulate external services or API responses during tests, ensuring consistency and reliability in your tests.
Tools like WireMock, Nock, or Playwright’s mocking capabilities can help you simulate the behavior of external services without actually calling them.
5. Regular Monitoring and Maintenance
* __Why__: Flaky tests can accumulate over time, especially as the application and test suite evolve. Regular monitoring and maintenance can help identify and address flaky tests before they cause major issues.
* __How_: Regularly review test results and flag flaky tests that fail intermittently.
Use test retries to help identify whether a test is flaky, but focus on identifying the root cause rather than just re-running tests.
Implement logs and screenshots for failed tests to gather more context and troubleshoot issues effectively.


### Which KPIs to Measure and How
Monitoring the health and performance of the sign-up flow is crucial for ensuring that the user experience remains smooth and that any issues are detected and addressed promptly. Below are key performance and health metrics to track the sign-up flow, along with the approaches to gather these insights.
1. Performance Metrics
* __Why__: Monitoring the performance of the sign-up flow ensures that users can register quickly without delays, which directly impacts conversion rates and user satisfaction.
* __How__: Log Coverage: Ensure that every step in the sign-up flow is properly logged. Logs should provide insights into the execution time, errors, and any delays encountered during the flow.
  
* __Metrics to collect__:
Time taken for each step (form submission, data validation, account creation, confirmation email sending, etc.).
API response times (backend processing and validation).
Error rates during the registration process (e.g., failed submissions, validation errors).

2. User behaviour tracking
* __Why__: Health metrics provide visibility into any operational issues or failures in the sign-up flow, helping to ensure that users can reliably register for the service.
* __How__: Registration Tracking: Use tracking data to monitor the flow of sign-ups and identify any unusual deviations or patterns.
* __Metrics to collect__:
Conversion rate from landing page to sign-up completion (e.g., percentage of users who start the sign-up and complete it).
Time taken for users to complete the registration.
User dropout rates during specific stages (e.g., users abandoning the process after entering details but before receiving the confirmation email).

3. Test Coverage Metrics
* __Why__: Ensuring comprehensive test coverage for the sign-up flow reduces the risk of undetected defects and enhances the overall quality of the feature.
* __How__: Coverage Analysis: Analyze test coverage for both functional and non-functional aspects of the sign-up flow.
* __Metrics to collect__:
Percentage of unit tests, integration tests, and E2E tests that cover the sign-up flow.
Percentage of test cases that cover edge cases, such as invalid inputs, slow network conditions, or incorrect data formats.
Test execution pass rate and failure rate for different stages of the flow (unit, integration, E2E).





