---
layout: post
title: Configuring permissions to request email access for use in your Alexa Skill 
language: English
permalink: configuring-permissions-to-request-email-access-for-use-in-your-skill-alexa
id: 906
categories:
  - How-To
tags:
  - Voice App
  - Alexa Skill
  - Environment
  - Development Pipeline
date: 2018-08-06 08:00:24
featuredImage: 
  url: featured.png
  width: auto
  height: auto
---

## Introduction
When we are **designing and implementing** a new **Alexa Custom Skill**, one of the first questions we ask ourselves is whether we have access to **user's email** or not. Recently (July 2018), **Amazon Alexa's Team** released a new feature to allow Alexa Skill's Developers to **request users to access resources** like `email`, `phone` and `customer name`. Until that time, we only were able to request permissions for `Device Address` and `Lists`.

There is a blob post from `Alexa's Team` [explaining how to request customer contact information](https://developer.amazon.com/docs/custom-skills/request-customer-contact-information-for-use-in-your-skill.html).


<br>

## Account Linking vs Permissions on gathering user's email
Until now, there were **some scenarios like sending detailed information to customers over email** that **required `Account Linking`** either with `Amazon` or `Custom Authentication Provider`. But with this **new feature** if we only do Account Linking to gather the user email, then we **don't need it anymore** and we can use this **simpler approach to get permissions from the user and get their email**.

<br>

## Skill configuration to request customer permissions.
Using **Amazon Developer Console** we can manage our skill. Navigate to the `Build -> Permissions` page in the console and select `Customer Email Address`:

![skill permissions](./amazon-alexa-skill-permissions.png)

> **Note:** If you are using `ask-cli` to configure and update your skill then you should add permissions in your `skill.json`:
> ![skill permissions ask cli](./alexa-permissions-ask-cli.png)

<br>

## Get user's email in our code

In order to get the email to be used in our code, we have to do query Amazon's API asking for it and we have to use the field `apiAccessToken` provided under `context -> System` in our `handlerInput` object.

<br>

## apiAccessToken

Before going forward and showing the code, I'd like to share the different scenarios we can have and the different outputs for the property `apiAccessToken`.

1.  User denies `Email Address` permission
  ![skill permissions denied email](./email-permission-denied.png)
  ```json
  "context": {
    "System": {
      "application": {
        "applicationId": "amzn1.ask.skill.<skill-id>"
      },
      "user": {
        "userId": "amzn1.ask.account.<user-id>"
      },
      "device": {
        "deviceId": "amzn1.ask.device.<device-id>",
        "supportedInterfaces": {}
      },
      "apiEndpoint": "https://api.amazonalexa.com",
      "apiAccessToken": "eyJ0e....<rest-of-jwt-token>"
    }
  }
  ```
  Note that even if we have no permissions added to our skill, we still get `apiAccessToken` property. If we inspect `apiAccessToken` JWT token using [https://jwt.io](https://jwt.io), we can see the below `payload data` where `privateClaims.consentToken` is `null`:
  ```json
  {
    "aud": "https://api.amazonalexa.com",
    "iss": "AlexaSkillKit",
    "sub": "amzn1.ask.skill.<skill-id>",
    "exp": 1633532432,
    "iat": 1633528832,
    "nbf": 1633528832,
    "privateClaims": {
      "consentToken": null,
      "deviceId": "amzn1.ask.device.<device-id>",
      "userId": "amzn1.ask.account.<user-id>"
    }
  }
  ```

2.  User grants `Full Name` permission but denies `Email Address` permission.
  ![skill permissions denied email granted name](./email-permission-denied-name-permission-granted.png)
  ```json
  "context": {
    "System": {
      "application": {
        "applicationId": "amzn1.ask.skill.<skill-id>"
      },
      "user": {
        "userId": "amzn1.ask.account.<user-id>",
        "permissions": {
            "consentToken": "eyJ0e...<rest-of-jwt-token>...lFkHDw"
          }
      },
      "device": {
        "deviceId": "amzn1.ask.device.<device-id>",
        "supportedInterfaces": {}
      },
      "apiEndpoint": "https://api.amazonalexa.com",
      "apiAccessToken": "eyJ0e...<rest-of-jwt-token>...rTyOD"
    }
  }
  ```
  > Note, apart from having a different `apiAccessToken`, now we also have a new `permissions` property under `user`.
  Now, if we inspect `apiAccessToken` using [https://jwt.io](https://jwt.io), we can see how `consentToken` is not `null` because it has permissions for `Name` included on it. But still if we try to authenticate to Amazon's API to query for `email` with that token, it will fail with 403 Forbidden:
  ```json
  {
    "aud": "https://api.amazonalexa.com",
    "iss": "AlexaSkillKit",
    "sub": "amzn1.ask.skill.<skill-id>",
    "exp": 1633532432,
    "iat": 1633528832,
    "nbf": 1633528832,
    "privateClaims": {
      "consentToken": "Atza|...<rest-of-amazon-token-authorizing-full-name>...",
      "deviceId": "amzn1.ask.device.<device-id>",
      "userId": "amzn1.ask.account.<user-id>"
    }
  }
  ```

3.  User grants `Email Address` permission

  ```json
  "context": {
    "System": {
      "application": {
        "applicationId": "amzn1.ask.skill.<skill-id>"
      },
      "user": {
        "userId": "amzn1.ask.account.<user-id>",
        "permissions": {
            "consentToken": "eyJ0e...<rest-of-jwt-token>...lFkHDw"
          }
      },
      "device": {
        "deviceId": "amzn1.ask.device.<device-id>",
        "supportedInterfaces": {}
      },
      "apiEndpoint": "https://api.amazonalexa.com",
      "apiAccessToken": "eyJ0e...<rest-of-jwt-token>...rTyOD"
    }
  }
  ```

  It is almost look a like of scenario's 2 token, the difference is `consentToken` is different and now it does allow querying for email.

  ```json
  {
    "aud": "https://api.amazonalexa.com",
    "iss": "AlexaSkillKit",
    "sub": "amzn1.ask.skill.<skill-id>",
    "exp": 1633532432,
    "iat": 1633528832,
    "nbf": 1633528832,
    "privateClaims": {
      "consentToken": "Atza|...<rest-of-amazon-token-authorizing-email>...",
      "deviceId": "amzn1.ask.device.<device-id>",
      "userId": "amzn1.ask.account.<user-id>"
    }
  }
  ```

4.  User grants `Email Address` permission + User authenticate through `Account Linking` as well
  We can have **both working together**, **Account Linking + Permissions** for email.
  The main difference in terms of the `handlerInput` schema is, we will `user.accessToken` property which we can use to authenticate and authorize against our **custom Authentication Server**:

  ```json
  "context": {
    "System": {
      "application": {
        "applicationId": "amzn1.ask.skill.<skill-id>"
      },
      "user": {
        "userId": "amzn1.ask.account.<user-id>",
        "accessToken": "eyJ0...<jwt-account-linking-access-token>...",
        "permissions": {
            "consentToken": "eyJ0e...<rest-of-jwt-token>...lFkHDw"
          }
      },
      "device": {
        "deviceId": "amzn1.ask.device.<device-id>",
        "supportedInterfaces": {}
      },
      "apiEndpoint": "https://api.amazonalexa.com",
      "apiAccessToken": "eyJ0e...<rest-of-jwt-token>...rTyOD"
    }
  }
  ```

  > Note that giving permissions and doing account linking are **two separate processes for Alexa Skill**. So, they can be used together or by its own.

<br>

## Calling Amazon's API to get user's email
Finally, after understanding what `apiAccessToken` does for the different scenarios, let's put our hands on and actually do the code that will access to Amazon's API from our intent:

```js
const axios = require("axios");

module.exports = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return (
      request.type === "IntentRequest" &&
      request.intent.name === "MyIntent"
    );
  },
  async handle(handlerInput) {
    const {
      apiAccessToken,
      apiEndpoint,
      user
    } = handlerInput.requestEnvelope.context.System;

    console.log("apiAccessToken: ", apiAccessToken);
    console.log("apiEndpoint: ", apiEndpoint);
    console.log("userId: ", user.userId);

    const getEmailUrl = apiEndpoint.concat(
      `/v2/accounts/~current/settings/Profile.email`
    );
    console.log("getEmailUrl", getEmailUrl);

    let result = "";
    try {
      result = await axios.get(getEmailUrl, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + apiAccessToken
        }
      });
    } catch (error) {
      console.log(error);
    }

    const email = result && result.data;

    return handlerInput.responseBuilder
      .speak("Your email is: " + email)
      .getResponse();
  }
}
```


## Recap
- We can use either **Amazon Development Console** or **ASK CLI** to request access for `Email` permissions to our users.
- **Account Linking** and **Permissions** are independent features and they can be used **together or separately**.
- Depending on the **configuration and the user input** we will have different outputs on `apiAccessToken`.
- Accessing to user's `email` will require to call Amazon's API with `apiAccessToken` as a Authentication **Bearer** header.

<br>
