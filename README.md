# Introduction

react-hmp-cli is a custom scaffolding tool used to automatically build or pull github content.

### Install

Install react-hmp-cli scaffolding globally.

```javascript
  npm install -g react-hmp-cli
```

or

```javascript
  yarn add react-hmp-cli -g
```

### Use

Use react-hmp-cli scaffolding to install the internal default template,you only need to follow the project name.

```javascript
  hmp init <project-name>
```

If you want to pull the template code of the specified github repository and pull the code of the specified branch as a template, you can keep up with the following two optional parameters.

```javascript
  hmp init <project-name> [-u git_address] [-b branch]
```

If you want to simply pull the content in the github repository and disassociate it from the corresponding github repository, you can use the following command to download.

```javascript
  hmp download <git_address> [-b branch]
```
