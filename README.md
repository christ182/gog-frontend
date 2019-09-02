# CDI WEB-APP

### Description

Code Disruptors, Inc frontend boilerplate created on top of create-react-app. Includes company standards for frontend web development

### Contents

- [Pre-installation](#pre-installation)
- [Installation](#installation)
- [Folder Structure](#folder-structure)
- [Naming Conventions](#naming-conventions) - [Folder](#folder) - [Components](#components) - [Functions](#functions)
- [Examples](#examples) - [Add component](#add-component) - [Add function](#add-function) - [Add variables](#add-variables)

### Pre-installation

Before using this boilerplate make sure to do the following

1. Make sure you have VS Code installed. If not, go to
   [Visual Studio Code on Linux](https://code.visualstudio.com/docs/setup/linux) and follow the instructions on how to install VS Code.
2. Run the following:
   ```
   code --install-extension dbaeumer.vscode-eslint
   code --install-extension dsznajder.es7-react-js-snippets
   code --install-extension EditorConfig.EditorConfig
   code --install-extension esbenp.prettier-vscode
   code --install-extension waderyan.gitblame
   ```

### Installation

```
git clone url
cd cdi-web-app
npm install
```

### Folder Structure

```
src/
├── components // components used to build the application including layouts & routing
│   ├── AppRouter.js // convention for file names is PascalCase
│   ├── AuthContext.js
│   ├── ErrorBoundary.js
│   └── styledButton // convention for file names is camelCase
│       └── StyledButton.js
├── containers // main application modules
│   ├── App.js
│   ├── privateContent
│   │   └── PrivateContent.js
│   └── publicContent
│       └── PublicContent.js
├── index.js
├── logo.svg
├── routes
│   ├── privateRoutes.js // routes only accessible after authentication
│   └── publicRoutes.js // routes visible to anyone
├── serviceWorker.js
└── utils // helper functions
```
