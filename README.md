# CDI Frontend Core

### Description

Code Disruptors, Inc frontend boilerplate created on top of create-react-app. Includes company standards for frontend web development. 

### Contents
- [Requirements](#requirements)
- [Pre-installation](#pre-installation)
- [Installation](#installation)
- [Principles](#principles)
- [Folder Structure](#folder-structure)
- [Naming Conventions](#naming-conventions) 
    - [Folders](#folders) 
    - [Components](#components) 
    - [Functions](#functions)
    - [Variables](#variables)
- [Import Rules](#import-rules)
- [Export Rules](#export-rules)
- [Component Structure](#component-structure)
- [Core Setup + Redux](#redux-setup)

### Requirements
- node
- npm
- VS Code

### Pre-installation

Before using this boilerplate make sure to do the following:

1. Install `node`
2. Install `npm` 
3. Go to [Visual Studio Code on Linux](https://code.visualstudio.com/docs/setup/linux) and follow the instructions on how to install VS Code.
4. Run the following:
   ```
   code --install-extension dbaeumer.vscode-eslint
   code --install-extension dsznajder.es7-react-js-snippets
   code --install-extension EditorConfig.EditorConfig
   code --install-extension esbenp.prettier-vscode
   code --install-extension waderyan.gitblame
   ```

### Installation

```
git clone git@github.com:dianecodemagnus/cdi-frontend-core.git
cd cdi-frontend-core
npm install
```
### Principles
1. [Keep it simple.](http://www.principles-wiki.net/principles:keep_it_simple_stupid)
2. [Don't repeat yourself.](http://www.principles-wiki.net/principles:don_t_repeat_yourself?s[]=dry)
3. [You ain't gonna need it.](http://www.principles-wiki.net/principles:you_ain_t_gonna_need_it)

### Folder Structure

```
src/
├── components // components used to build the application including routing and layouts
│   ├── AppRouter.js // handles application routing
│   ├── AuthContext.js // handles application authentication
│   ├── ErrorBoundary.js // handle component errors
│   └── styledComponents // contains styled components used for layouts
│       ├── Buttons.js
│       ├── Containers.js
│       ├── Nav.js
│       └── Table.js
├── containers // contains modules of the application
│   ├── App.js
│   ├── dashboard
│   │   └── Dashboard.js
│   ├── home
│   │   └── Home.js
│   ├── main
│   │   └── Main.js
│   ├── styles.js
│   └── users
│       └── Users.js
├── index.js
├── logo.svg
├── routes
│   ├── privateRoutes.js
│   └── publicRoutes.js
├── serviceWorker.js
└── utils
    ├── useApiService.js
    └── useFetchAPI.js

```


### Naming Conventions
These naming conventions should be strictly followed for consistency across all developers

#### Folders
Folder names can be one-word lowercase or multi-word in camelCase.

```
src/
├── components
│   └── styledComponents
├── containers
│   ├── dashboard
│   ├── home
│   ├── main
│   └── users
├── routes
└── utils
```
#### Components
Component names should be in PascalCase. The name of your component file should be the same as the component itself.

```
// Dashboard.js
const Dashboard = () => {
  return (
    <div>
      <h1>Hello, Disruptor</h1>
    </div>
  );
};

// AccountGroups.js
const AccountGroups = () => {
  return (
    <div>
      <h1>Account Groups</h1>
    </div>
  );
};


```
#### Functions
Function names should be in camelCase.

```
const fetchUsers = () => {
  // your function here
}

function createUser () {
  // your function here
}

```
#### Variables
Variable names should be in snake_case.

```
const account_groups = [];
const user_role = {};
let is_authenticated = false;

```
### Import Rules
Add a space between internal and external (from libraries) imports. Order of file imports will be handled by lint automatically.
```
// imports from libraries
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import 'normalize.css/normalize.css';

//import from internal files
import App from 'containers/App';
import GlobalStyle from 'containers/styles';
import { AuthProvider } from 'components/AuthContext';
import * as serviceWorker from './serviceWorker';

```
### Export Rules
Always put your exports on the bottom
```
const Dashboard = () => {
  return (
    <div>
      <h1>Hello, Disruptor</h1>
    </div>
  );
};

export default Dashboard
```
### Component Structure
The ordering of component should be: 
1. imports
2. hooks
3. jsx
4. proptypes
5. export

```
// imports from libraries
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// internal imports
import { AuthContext } from 'components/AuthContext';

// Component
const AppRouter = ({ routes }) => {
//	hooks
  const { is_authenticated } = useContext(AuthContext);
  const defaultPage = () => {
    return is_authenticated === true ? (
      <Redirect to="/dashboard" />
    ) : (
      <Redirect to="/home" />
    );
  };

// jsx
  return (
    <Switch>
      {routes.map((route, index) =>
        route.component ? (
          <Route
            key={index}
            path={route.path}
            component={route.component}
            exact={route.exact === undefined ? false : route.exact}
          />
        ) : (
          route.render && (
            <Route
              key={index}
              path={route.path}
              render={route.render}
              exact={route.exact === undefined ? false : route.exact}
            />
          )
        ),
      )}
      {<Route component={defaultPage} />}
    </Switch>
  );
};

// proptypes
AppRouter.propTypes = {
  routes: PropTypes.array.isRequired,
};

// export
export default AppRouter;

```
### Core Setup + Redux
> coming soon...

