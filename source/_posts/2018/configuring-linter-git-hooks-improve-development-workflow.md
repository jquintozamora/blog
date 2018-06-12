---
layout: post
title: "Configuring linter, git hooks and auto-format to improve our development workflow"
language: English
permalink: configuring-linter-git-hooks-improve-development-workflow
id: 907
categories:
  - Code-Reminder
  - Workflow Performance
tags:
  - Alexa Skill
  - Environment
  - Git
  - Linter
date: 2018-06-14 08:00:24
featuredImage: 
  url: featured.png
  width: auto
  height: auto
---

## Introduction
This post is about configuring a **linter**, **git hooks** and **auto-format on VS Code** in order to improve our development workflow. This configuration can be used for any project, but in that particular case I'll add **specific linting rules** that applly to our **Alexa Skill's code**. In order to cover all the linting options and functionality we want to configure the linter on different points of our **workflow**:

- Create `npm run lint` to be run linter on demand.
- Create git hook `precommit` to run our linter using [husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged)
- Create git hook `prepush` to run our test framework using [husky](https://github.com/typicode/husky)

<br />

## Linter
There are **different methods** and options to consider when we want to add linting to our projects:

- [Prettier](https://github.com/prettier/prettier): that is a good option for **automatically format our code** (but at the same time is **quite risky** as it will decide for you eventually)
- [Eslint](https://eslint.org/): that is really **configurable** by using rule sets, and it also **integrates really well with VS Code auto-format** via [eslint extension for VS Code](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

> I'm going to use **eslint** for that project

<br />

## Add linter, git hooks and rules to our project

Alexa Skill could be written using NodeJS and the Standard JavaScript linting rules. I'll show how to configure our project to add all the requirements mentioned above.

### package.json

```json
{
  "name": "alexa_skill",
  "version": "1.0.0",
  "description": "Alexa Skill",
  "main": "index.js",
  "scripts": {
    "deploy": "ask deploy",
    "test": "jest",
    "lint": "eslint .",
    "precommit": "lint-staged",
    "prepush": "npm run test"
  },
  "author": "Jose Quinto - https://blog.josequinto.com",
  "devDependencies": {
    "ask-cli": "1.2.0",
    "eslint": "4.19.1",
    "eslint-config-standard": "11.0.0",
    "eslint-plugin-import": "2.12.0",
    "eslint-plugin-node": "6.0.1",
    "eslint-plugin-promise": "3.8.0",
    "eslint-plugin-standard": "3.1.0",
    "husky": "0.14.3",
    "jest": "23.1.0",
    "lint-staged": "7.1.3"
  },
  "lint-staged": {
    "*.js": ["npm run lint", "git add"]
  }
}
```

- Add **devDependencies**: `eslint`, `husky`, `lint-staged`, `eslint-config-standard` and `eslint-plugins`

  > Run this command:
  >
  > `npm i -D eslint husky lint-staged eslint-config-standard eslint-plugin-import eslint-plugin-node eslint-plugin-promise eslint-plugin-standard`

- Add **scripts**: `test`, `lint`, `precommit` and `prepush`
  ```json
  "test": "jest",
  "lint": "eslint .",
  "precommit": "lint-staged",
  "prepush": "npm run test"
  ```
- Add **lint-staged** section. Apply to all `*.js` files that have been committed and run firstly `npm run lint` and then `git add`. Then before doing the git commit the linter is going to run. If the linter fails, then `git commit` will not be done.

<br />

### .eslintrc

As part of **eslint configuration** we should add `.eslintrc` file. For the specific scenario of Alexa Skill, that is the set of rules that better works for our team:

```json
{
  "root": true,
  "extends": "standard",
  "parserOptions": {
    "sourceType": "module"
  },
  "rules": {
    "indent": [2, 2, { "SwitchCase": 1 }],
    "linebreak-style": [2, "unix"],
    "semi": [2, "always"],
    "no-console": [2, { "allow": ["warn", "error"] }],
    "space-before-function-paren": 0,
    "arrow-body-style": 0,
    "class-methods-use-this": 0,
    "comma-dangle": [2, "never"],
    "consistent-return": 0,
    "func-names": 2,
    "global-require": 0,
    "max-len": 0,
    "no-confusing-arrow": 0,
    "no-mixed-operators": 0,
    "no-nested-ternary": 0,
    "no-param-reassign": 0,
    "no-plusplus": 0,
    "no-shadow": 0,
    "no-underscore-dangle": 0,
    "quotes": [
      2,
      "double",
      { "avoidEscape": true, "allowTemplateLiterals": true }
    ]
  },
  "env": {
    "node": true,
    "es6": true,
    "jest": true
  }
}
```

<br />

### .eslintignore

In order to make sure we are not linting external files and libraries we should ignore `node_modules` folder using `.eslintignore` file:

```
!.*

# node_modules ignored by default
**/node_modules/*
```

<br />

### VS Extensions

If we are using VS Code, we also can suggest or recommend some extensions which will help providing "live lintint" on the files opened by VS Code.
We can add under `.vscode` folder, a file called `extensions.json` with that object on it:

```json
{
  "recommendations": ["dbaeumer.vscode-eslint"]
}
```

Then, when a new developer opens that project, will be suggested to install `eslint` extension.

> **Note**: Eslint **VS Code extension** will also use our `.eslintrc` rules when we use **auto-formating** on our files, applying as many rules as it can.
>
> **VS Code Auto-Formatting** shortcuts:
>
> - `MacOS`: ⇧ + ⌥ + F
> - `Windows`: Shift + Alt + F
> - `Linux`: Control + Shift + I

<br />

## Conclusion
This configuration is **not only for Alexa Skill project**, we use it in some of our **JS**, **React** and **NodeJS** projects and it really helps on improving our **development workflow performance**.
Having that configuration in our project will help on:
- Running **linter on demand** -> `npm run lint`
- Running **linter before commit** -> `git commit`
- Running **tests** before push -> `git push`
- Running **linter on each file in live** (using VS Code Extension) and being able to solve some issues with auto-formatting.


<br>
