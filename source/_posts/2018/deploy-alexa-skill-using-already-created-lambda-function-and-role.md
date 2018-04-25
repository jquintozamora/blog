---
layout: post
title: Deploying Alexa Skill using an already created lambda function and role  
language: English
permalink: deploy-alexa-skill-using-already-created-lambda-function-and-role
id: 903
categories:
  - How-To
tags:
  - Voice App
  - Alexa SKill
  - AWS Lambda
date: 2018-04-23 08:00:24
featuredImage: 
  url: featured.png
  width: auto
  height: auto
---

## Introduction
When developing a **custom Alexa skill**, if your role is `developer` 💻 and also `devops` ⚙️ for your Alexa Skill, then you'll have full permissions. So, in order to *automatize the deployment of your custom Alexa Skill*, you'll probably end up using `ask-cli` client tool, specifically the command `ask deploy` which creates a new AWS Lambda function named `ask-<skillType>-<skillName>-<profile>` (with the appropriate type, name, and profile for `<skillType>`, `<skillName>`, profile). The AWS Lambda function is created with an IAM role named `ask-lambda-<skill name>-<profile>`, attached to the `basic execution policy`. 

However, if you are a `developer` 💻 and you rely on `devops` ⚙️ to create your **AWS resources**, you'll probably ask them to create new **lambda function and role** to start working with our custom Alexa Skill. And probably, the **name of the lambda role and function are different** than what `ask-cli` is **using and expecting by default**. 

This post is to explain in detail how to **automatically deploy** a custom Alexa Skill which uses an **already created lambda function and role with a different names than the default ones**.

<br>

## Create and Deploy Custom Alexa Skill
> Before continue, If not familiar with custom Alexa Skill, I recommend to quick read an article I wrote about [main concepts, requirements, project structure and code samples for custom Alexa Skills](/2018/04/23/building-voice-app-custom-alexa-skill-node-js/).

> I'm going to use [City Guide official code sample](https://github.com/alexa/skill-sample-nodejs-city-guide) as a **baseline or boilerplate** for this post. **In that code sample**, there is a complete guide about how to create and deploy a custom skill **but not in a automatic way**. We are going to show how to automatically deploy using `ask-cli`.

<br>

### Create new Skill using code sample
1. Double check you have installed [ASK CLI](https://github.com/alexa/skill-sample-nodejs-city-guide/blob/master/instructions/7-cli.md)
```
ask
```

2. Initialize credentials profile
We have to configure credentials to access Alexa Skills Kit Developer Console and AWS Console. 
```
ask init
```
* Select `Create a new profile` and enter a name
* Select `default` as a AWS Profile to deploy Lambda function, then you will be redirected to browser to log in in AWS and cache your credentials.
* Return to terminal and you'll get message like this:
```
Switch to 'Login with Amazon' page...
Tokens fetched and recorded in ask-cli config.
Vendor ID set as XXXXXXXXXXXXXXX
Profile [default] initialized successfully.
```

> **IMPORTANT** ❗️❗️ If you are using `Multi-Factor Authentication` and/or `Session Token` make sure you update the variables in ~/.aws/credentials at [default] profile section. Do in that way, because, `ask-cli` will [default] profile from this file to authenticate to AWS. See more info [here](https://developer.amazon.com/docs/smapi/set-up-credentials-for-an-amazon-web-services-account.html)


3. Create a new project using an existing template
We can use [`ask new`](https://developer.amazon.com/docs/smapi/ask-cli-command-reference.html#new-command) command to create a new project using an existing template from [the official templates](https://s3.amazonaws.com/ask-cli/templates.json).
```
ask new --template "City Guide" --skill-name "my-skill-name"
```

After creating the new skill, we get this message
```
'my-skill-name' skill package has been created based on the chosen template
```

> Note: ask new command is not going to upload anything to the server, that is just create the project folder locally. A new folder with the name `my-skill.name` will be created under your current path. 


4. Create .gitignore (optional)
If you are using `git` I suggest you to create .gitignore file in your root folder ignoring node_modules folder at root or sub-folders
`.gitignore`
```
node_modules
```

<br>

### Deploy the skill
> In my case, deployment is quite special case as I already have created AWS Lambda function. Normally if you do `ask deploy` it deploys everything, including skill, model and lambda. In our case I'm going to deploy skill and models using `ask deploy` and then lambda separately.


1. Deploy Skill + Model first time
Firstly, we have to publish skill + interaction model and after we will change the configuration to include the already created lambda function.

In order to remove the lambda function configuration for doing the first deployment we must configure `.ask/config` and `skill.json` files in that specific way: 

`.ask/config`:
* **skill_id** should be blank. A new skill_id will be created and added automatically in config file.
* **apis.custom** should be blank. So, we want lambda function be empty on first time deployment.
```
{
  "deploy_settings": {
    "default": {
      "skill_id": "",
      "was_cloned": false,
      "merge": {
        "manifest": {
          "apis": {
            "custom": {}
          }
        }
      }
    }
  }
}
```

`skill.json`:
* **apis.custom** should be blank. So, we want lambda function be empty on first time deployment.
```
{
  "manifest": {
    "publishingInformation": {
      "locales": {
        "en-GB": {
          ...
        }
      },
      ...
    },
    "apis": {
      "custom": {}
    },
    "manifestVersion": "1.0"
  }
}
```

After removing the lambda configuration, we can deploy the skill
```
ask deploy
```

Then, we'll receive this message from console:
```
-------------------- Create Skill Project --------------------
Profile for the deployment: [default]
Skill Id: amzn1.ask.skill.1328031f-7fe2-4b78-a090-XXXXXXXXXXXX
Skill deployment finished.
Model deployment finished.
[Info]: No lambda functions need to be deployed.
```

We can also check the skill_id property has been filled now in the `.ask/config` file:
```
"skill_id": "amzn1.ask.skill.1328031f-7fe2-4b78-a090-XXXXXXXXXXXX"
```

At this point we also can check our skill has been deployed in [Alexa Skills Kit Developer Console](https://developer.amazon.com/alexa/console/ask):

![new skill](./newSkill.png)


2. Update lambda function bits on deployment metadata
Now our skill has been created for the first time, then we can update the lambda function metadata in order to be deployed / updated later on when we use `ask deploy` again.

In order to be able to deploy our skill with a different lambda function configuration we have to do two things:

2.1. Update `skill_id` in our lambda function trigger (Alexa Skill Kit).
We can add and configure a trigger for a lambda function through [AWS Console](https://aws.amazon.com/console)

![aws console lambda trigger configuration](./alexaSkillsKitTrigger.png)
> Note: Remember to click `Add` and `Save` too.

2.2. Re-deploy the skill updating lambda function source files folder and endpoint ARN
Before re-deploy, we have to configure our lambda source files and also our lambda function name in AWS (ARN). We do that, by changing these two files in our project:

`skill.json`:
* **apis.custom** we have to add a new endpoint object with a sourceDir property set to "lambda/custom", which is the path or our source files.
```
"apis": {
  "custom": {
    "endpoint": {
      "sourceDir": "lambda/custom"
    }
  }
}
```

`.ask/config`:
* **apis.custom** we have to add a new endpoint object with a uri property set to the name of our function (ARN).
```
"apis": {
  "custom": {
    "endpoint": {
      "uri": "arn:aws:lambda:eu-west-1:XXXXXXXXXXXX:function:lambdaName"
    }
  }
}
```

Then we can re-deploy:
```
ask deploy
```

You'll get this result:
```
-------------------- Update Skill Project --------------------
Skill Id: amzn1.ask.skill.1328031f-7fe2-4b78-a090-XXXXXXXXXXXX
Skill deployment finished.
Model deployment finished.
Lambda deployment finished.
Your skill is now deployed and enabled in the development stage.
Try invoking the skill by saying “Alexa, open {your_skill_invocation_name}” or simulate an invocation via the `ask simulate` command.
```

🚀 🚀 We have everything deployed 🚀 🚀


<br>

### Check the skill deployment was successful
We can go to our [Alexa Skills Kit Developer Console](https://developer.amazon.com/alexa/console/ask) and click in our skill to see the detailed configuration. Then we can see everything is green in our "Skill Check List":

![skill check list](./skillChecklist.png)

<br>

### Test the skill
Also you can click on "Test" tab to test the skill.

![test alexa skill](./AlexaTest.png)


<br>

## More Resources

More information about AWS Lambda env variables:
* https://docs.aws.amazon.com/lambda/latest/dg/current-supported-versions.html
* https://docs.aws.amazon.com/cli/latest/userguide/cli-environment.html
* https://forums.developer.amazon.com/questions/119998/set-lambda-runtimehandler-from-ask-deploy.html

