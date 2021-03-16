# Contributing to Senko-Tanker
First off, thanks for taking time to contribute and even read this document.

The following is a set of guidelines for contributing to Senko-Tanker. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

#### Table of contents   
* [Code of conduct](#code-of-conduct)
* [I just have a question](#i-just-have-a-question)
* [What should I know](#what-should-i-know)
    * [Folder Structure](#folder-structure)
    * [Roadmap](#roadmap)
***

## Code of conduct
This project, and everyone participating in it is governed by the [Contributor Covenant](./CODE_OF_CONDUCT.md)

## I just have a question
If you have a question, just @ [DevSadie](https://twitter.com/DevSadie) on Twitter. Do not create an issue, you're just going to add to the bloat.

## What should I know

### Folder structure
| Codebase                             | Description                                                              |
|:-------------------------------------|:-------------------------------------------------------------------------|
| [commands](/src/commands)            | Commands                                                                 |
| [config](/src/config)                | Bot configuration, tokens                                                |
| [controllers](/src/controllers)      | Controllers for the commands and events                                  |
| [events](/src/events/)               | Collection of actions triggered by events                                |
| [events/client](/src/events/client)  | Actions triggered by client-side events                                  |
| [events/server](/src/events/server/) | Actions triggered by guild-side events                                   |
| [functions](/src/functions/)         | Pieces of code used by code, It's recommended to not mess around in here |

### Roadmap 
The project roadmap is availble [here](https://github.com/Senko-Dev/Senko-Tanker/projects/1).