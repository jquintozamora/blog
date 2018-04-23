---
layout: post
title: Building my first Voice App for Amazon Echo (Alexa) Skill with NodeJS 
language: English
permalink: creating-new-alexa-skill-using-already-created-lambda-function-with-custom-role
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

First time I heard about [Alexa / Echo](https://www.amazon.co.uk/Echo) 👀 I loved the idea of having a bot assistant at Home capable of playing music on demand, setting up alarms, giving the flash briefings, an so on.    
Currently I'm working as a Software Engineer at [Eurostar](https://www.eurostar.com) as a contractor, and my first project is to build a Voice App using Amazon Alexa and Google Home 💻. 
That's quite interesting challenge given the fact I'll be using AWS Lambda function and NodeJS as part of the technology stack.

This post i intended to gather all my notes meanwhile I was learning and developing my first Voice App using [Alexa Skills Kit](https://developer.amazon.com/alexa-skills-kit). I thought it will be important to share this notes as I felt quite lost at the beginning.

> Note: I'll be using `JavaScript` and `NodeJS` as a development language and engine for my first Alexa Custom Skill. 



## Requirements
Once we are more familiar with the main concepts. Before starting to develop a custom skill, there are some requirements: 
* Register for an [Amazon Developer Account](https://developer.amazon.com?&sc_category=Owned&sc_channel=RD&sc_campaign=Evangelism2018&sc_publisher=github&sc_content=Content&sc_detail=city-guide-nodejs-V2_CLI-1&sc_funnel=Convert&sc_country=WW&sc_medium=Owned_RD_Evangelism2018_github_Content_city-guide-nodejs-V2_CLI-1_Convert_WW_beginnersdevs&sc_segment=beginnersdevs)
* Register for an [AWS Account](https://aws.amazon.com/)
  > Note you can request for [promotional credits on AWS for Alexa](https://developer.amazon.com/alexa-skills-kit/alexa-aws-credits)
* As we will be using NodeJS:
  * NodeJS (> v8)
  * Install and Setup [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/installing.html)
  * Install and Setup [ASK CLI](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html?&sc_category=Owned&sc_channel=RD&sc_campaign=Evangelism2018&sc_publisher=github&sc_content=Content&sc_detail=city-guide-nodejs-V2_CLI-1&sc_funnel=Convert&sc_country=WW&sc_medium=Owned_RD_Evangelism2018_github_Content_city-guide-nodejs-V2_CLI-1_Convert_WW_beginnersdevs&sc_segment=beginnersdevs)


## Project Structure
The project structure for Alexa Custom Skill is:

```js
skill.json   // skill manifest to define metadata

.ask
  |- config  // config file for ask cli

lambda
  |- custom
        |- node_modules // must be uploaded to AWS Lambda function 
        |- index.js     // lambda function to define intent handlers
        |- package.json // npm dependencies

models            // Define Interaction Model for each language. 
  |- en-US.json     
  |- en-GB.json
```
> [Skill Manifest Schema](https://developer.amazon.com/docs/smapi/skill-manifest.html)
>
> [Interaction Model Schema](https://developer.amazon.com/docs/smapi/interaction-model-schema.html)



## Create first project

I'm going to use V2 for Alexa SDK for NodeJS and I'm going to base my first experiment on that project:
https://github.com/alexa/skill-sample-nodejs-city-guide as that project is quite similar to the behavior I want to achieve.

Starting with the guide:
https://github.com/alexa/skill-sample-nodejs-city-guide/blob/master/instructions/1-voice-user-interface.md

> Note: If you register for a Amazon Developer account and register new Alexa Skill, they you can get free credits on AWS, so you will need AWS Lambda functions to start creating your handler.

In order to start building your first Custom Alexa Skill, I highly recommends to start using one of the already existing projects and start from there.

This will me my personal check list when I started building it!!

### Pre-requisites


### Starting the project

1.  Create the skill

* Go to https://developer.amazon.com/alexa/console/ask
* Click `Create Skill`
* Select default language and enter a meaningful name
* English UK + booking-helper
* Select `Custom` as a model and click on `Create Skill`
* Get your SKill Id --> Click on Endpoint -> Select AWS Lambda URN -> Copy to clipboard your skill id

2.  Create folder in for your custom skill

```
mkdir alexa-skill
cd alexa-skill
```

3.  Double check you have installed [ASK CLI](https://github.com/alexa/skill-sample-nodejs-city-guide/blob/master/instructions/7-cli.md)

```
ask
```

4.  Initialize your repo with ASK CLI (cache credentials)

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
Profile [awsJose] initialized successfully.
```

5.  Create a new project using command line
    We can use [`ask new`](https://developer.amazon.com/docs/smapi/ask-cli-command-reference.html#new-command) command to create a new project

```
ask new --template "City Guide" --skill-name "booking-helper"
```

> list of templates: https://s3.amazonaws.com/ask-cli/templates.json

After creating the new skill, we get this message

```
'booking-helper' skill package has been created based on the chosen template
```

> Note: ask new command is not going to upload anything to the server, that is just create the project folder locally.
> Note: that a new folder will be created under your current path. Afterwards I'll move all the contents into my current folder as I already had a git repo created.

6.  Remove unnecessary files.

```
rm -rf instructions
rm -rf tutorials
```

7.  Create .gitignore ignoring node_modules folder at root or sub-folders

```
node_modules
```

8.  Deploy your new project
    In my case, deployment is quite special case as I already have created AWS Lambda function.
    Normally if you do `ask deploy` it deploys everything, including skill, model and lambda. In our case I'm going to deploy skill and models using `ask deploy` and then lambda separately.

```
ask deploy --target skill
ask deploy --target model
```

Results

```
[Warn]: Changed the property name from 'skillManifest' to 'manifest' in skill.json in order to fit the v1 Alexa Skill Management APIs accepted format.
[Warn]: Changed the property name from 'skillManifest' to 'manifest' in .ask/config in order to fit the v1 Alexa Skill Management APIs accepted format.
-------------------- Create Skill Project --------------------
Profile for the deployment: [default]
Skill Id: amzn1.ask.skill.d61c97ea-147a-4c96-a63c-XXXXXXXXXXXX
Skill deployment finished.
Model deployment finished.
```

Now, I have to deploy the lambda function and associate this lambda function to the skill and vice-versa.

```
ask lambda upload -f arn:aws:lambda:eu-west-1:XXXXXXXXXXXX:function:<name> -s lambda/custom
```

> Note: if you are using MFA make sure you are using the right credentials under ~/.aws/credentials with the default profile. So, `ask-cli` is using the [default] profile from this file to authenticate to AWS. See more info here: https://developer.amazon.com/docs/smapi/set-up-credentials-for-an-amazon-web-services-account.html

After, that we need to configure the trigger for `Alexa Skill Kit`, read more here: https://developer.amazon.com/docs/custom-skills/host-a-custom-skill-as-an-aws-lambda-function.html#use-aws-cli

More info about lambda env variables

* https://docs.aws.amazon.com/lambda/latest/dg/current-supported-versions.html
* https://docs.aws.amazon.com/cli/latest/userguide/cli-environment.html
* https://forums.developer.amazon.com/questions/119998/set-lambda-runtimehandler-from-ask-deploy.html

Finally we can do set up for special case in which we have lambda function already created. we have to configure

1.  `.ask/config` file with uri for our already created function name (ARN)

```
{
  "deploy_settings": {
    "default": {
      "skill_id": "amzn1.ask.skill.d61c97ea-147a-4c96-a63c-XXXXXXXXXXXX",
      "was_cloned": false,
      "merge": {
        "manifest": {
          "apis": {
            "custom": {
              "endpoint": {
                "uri": "arn:aws:lambda:eu-west-1:XXXXXXXXXXXX:function:lambdaName"
              }
            }
          }
        }
      }
    }
  }
}
```

2.  Set up the credentials under `~/.aws/credentials` for the [default] profile.

3.  Then if we do `ask deploy` we get that result

```
ask deploy
-------------------- Update Skill Project --------------------
Skill Id: amzn1.ask.skill.d61c97ea-147a-4c96-a63c-XXXXXXXXXXXX
Skill deployment finished.
Model deployment finished.
Lambda deployment finished.
Your skill is now deployed and enabled in the development stage.
Try invoking the skill by saying “Alexa, open {your_skill_invocation_name}” or simulate an invocation via the `ask simulate` command.
```

SCENARIO ALREADY CREATED GITHUB PROJECT AND WANT TO CREATE NEW SKILL

1.  Check the right format in skill.json and config files
    config:

* skill_id should be blank as a new id will be created and added automatically in config file.
* we have to remove endpoint under apis -> custom in order to create the skill for the first time.

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

skill.json:

* we have to remove endpoint under apis -> custom in order to create the skill for the first time.

```
{
  "manifest": {
    "publishingInformation": {
      "locales": {
        "en-GB": {
          "summary":
            "Ask an expert for a recommendation on what to do in your city.",
          "examplePhrases": [
            "Alexa open city guide",
            "Alexa tell city guide i'm hungry",
            "Alexa ask city guide to give me an activity"
          ],
          "name": "booking-helper",
          "description":
            "Ask an expert for a recommendation on what to do in your city. You can even ask for tips within a specific distance."
        }
      },
      "isAvailableWorldwide": true,
      "testingInstructions": "Sample Testing Instructions.",
      "category": "NAVIGATION_AND_TRIP_PLANNER",
      "distributionCountries": [],
      "distributionMode": "PRIVATE"
    },
    "apis": {
      "custom": {}
    },
    "manifestVersion": "1.0"
  }
}
```

2.  Create the new skill

```
ask deploy
```

Then you'll receive:

```
-------------------- Create Skill Project --------------------
Profile for the deployment: [default]
Skill Id: amzn1.ask.skill.1328031f-7fe2-4b78-a090-XXXXXXXXXXXX
Skill deployment finished.
Model deployment finished.
[Info]: No lambda functions need to be deployed.
```

And the skill_id property should be filled now in .ask/config:

```
"skill_id": "amzn1.ask.skill.1328031f-7fe2-4b78-a090-XXXXXXXXXXXX"
```

And you can see you new skill create in https://developer.amazon.com/alexa/console/ask
![](./building-my-first-voice-app-with-custom-alexa-skill/newSkill.png)

Now our skill has been created for the first time, then we can update the lambda function part.

We have to do it by doing two things:

1.  Update skill_id in our lambda function (Alexa Skill Kit trigger).
  As we have already created our lambda function, then we have to configure new trigger (Alexa Skill Kit) and configure the proper Skill id on it.
  We can do it through the AWS Console
  ![](./building-my-first-voice-app-with-custom-alexa-skill/alexaSkillsKitTrigger.png)
  Remember to click `Add` and `Save`.

2. Re-deploy the skill updating lambda function source files folder and endpoint ARN
  Before re-deploy, we have to configure:

skill.json:
```
"apis": {
  "custom": {
    "endpoint": {
      "sourceDir": "lambda/custom"
    }
  }
}
```

config:
```
"apis": {
  "custom": {
    "endpoint": {
      "uri": "arn:aws:lambda:eu-west-1:XXXXXXXXXXXX:function:lambdaName"
    }
  }
}
```

Double check you have configured ~/.aws/credentials with [default] profile and properly set up AWS Key, Secret and Session if needed.

And then:
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

And then you can go to your alexa skill console app: https://developer.amazon.com/alexa/console/ask
Click on your skill
![](./building-my-first-voice-app-with-custom-alexa-skill/skillChecklist.png)

And you can test your custom skill!!
![](./building-my-first-voice-app-with-custom-alexa-skill/AlexaTest.png)

Happy deploy!!


Now if you want to update your skill / model / lambda function code, the only thing you have to do is:
```
ask deploy
```

