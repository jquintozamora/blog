---
layout: post
title: Wrapping up 2018
language: English
permalink: wrapping-up-2018
id: 908
categories:
  - Wrapping up
tags:
  - NodeJS
  - BFF
  - GraphQL
  - Alexa
  - React 
  - Redux
date: 2019-02-24 18:00:24
featuredImage: 
  url: featured.png
  width: 200
  height: auto
---

I started 2018 working for **Arcadia Group** in London as a **React Developer**, there I met lot of smart colleagues and friends working hard on the `isomorphic React` Application within the `Catalogue Team`. We were working following strictly scrum methodology (Planning, Refinement, Standups, 3 Amigos, Retrospective). In terms of tech stack, I learned a lot, while I created new `React reusable components`, `redux actions` and `reducers`. Also, I spent lof of time creating `Unit Test` with `Jest` and `Enzyme` (`redux-mock-store`, `snapshots`, `jest.mock`, `jest.fn`, `jest.spyOn`, and so on). 
Eventually, after 8 months, I left Arcadia Group to begin another kind of professional trip, becoming **contractor in London**!

Then I closed my eyes and make myself comfortable with different kind of interviews and recruiter agents. It was harder than I expected but eventually I got my first contract as a Senior JavaScript Full Stack Software Engineer at **Eurostar**. I appreciate the opportunity I was given here starting my new role as in the **Innovation Team**. The methodology was quite different as per the nature of the team we don't follow strict Agile Scrum, instead, we do follow Kanban approach ( weekly planning, standups, demo fridays, jira board, and so on). In terms of tech stack, I started solving some bugs for some of the **microservices** using `JavaScript` and `NodeJS` (`AWS`, `SQS`, `SNS`, `Queue Consumer`) and I learnt new things like AWS ( I used Azure until then ), `CircleCI`, `Terraform`, `Microservices Architecture`. 

After few months I then joined to a new challenge to build the `Alexa Eurostar Skill`. That started as a POC being a conversational ad-hoc script which I prepared in a week for a show and tell presentation. Initially, I was quite confused about the scope for that POC but after the good result of the POC, `Eurostar` decided to build a Team around that skill and then we end up being a team of 2 developers, 1 voice ux, 1 product owner and 1 scrum manager, I really liked the new shape for that, and even if I was quite sceptical at the begining, eventually, I started believing in voice systems!! Crazy and exciting days, isn't it? 🚀 

We started to take that project really seriously and start doing lots of research in order to become one of the first doing things right with `Alexa Skill Development`. I event took the time to write down several posts with our investigations and results. 
From our Alexa Skill project we started small different sub-projects following the proper microservices infrastructure we have at Eurostar. I can mention some of them:
- `Alexa Skill`: That is a project intended to design, develop, continuously integrate and deploy our skill in Lambda function and Alexa Development Console (ASK). Among others we used:
    - ASK CLI
    - AWS SDK
    - AWS CLI
    - NodeJS
    - Jest
    - Intent Debugger ( custom )
    - Github / Alexa Dev Console / AWS Lambda integration and synch scripts
    - date-fns
    - axios
    - Apollo Client
    - Fallback Intent
    - Yes / No Custom Slot
    - Custom Slots for Stations
    - SearchQuery Slot Type
- `Voice BFF`: We built a backend for frontend layer in order to communicate with our Internal and External APIs. Among others we used that stack:
    - NodeJS
    - Express
    - GraphQL
    - Apollo Server 2
    - Babel
    - Docker ( for Integration Tests )
    - mockttp ( for creating stubs for external APIs )
    - Jest
- `Voice NER`: We build a project for improving the Name Entity Recognition currently built-in within Alexa, we had different issues with the users being able to make Alexa recognizing certain expressions like 'in two weeks time', 'next month for two days', and so on. And we decided to create a NER to actually parse the text given by Alexa and extract from there the right dates we needed. We explored and used a combination of different date parses and NERs on the internet:
    - Stratford University NER 
    - Microsoft NER Library ( npm )
    - WatsonJS Date Parser ( npm )
    - Our custom parser


You can imagine such a six months we spent investigating, learning and developing all that stuff and finally releasing the [`Alexa Eurostar Skill`] (https://www.amazon.co.uk/Eurostar/dp/B07K8RVXF7). Which is not only Certified and Publish by Amazon in the Skill Market Store, but also being tested by real users in a bunch of user testing sessions our Voice UX did which such a passion and energy.
It has been a success story in and outside `Eurostar` and we are going to speak in the next Alexa Developer Meetup in London ( Amazon UK Offices ) and tell the world how we did and our experiences at different levels ( dev, ux and lessons learn ). I also achieved the `AWS Certified Alexa Skill Builder` title after 3 long hours of beta exam.

Now, 2019 is going to be a year of fresh project and new challenges. I will be starting in the `BPA Team` at `Eurostar` working on the Booking and Checkout area in the `eurostar.com` website. Exiting times! I'm really looking forward starting that new project in January and doing lots of things in `React`, `Redux` and `NodeJS`.

Also, after my project developing `Amazon Alexa Skill`, I do believe 2019 is going to be a great year for voice systems and I will start some side projects creating my own Alexa Skill on my free time!
