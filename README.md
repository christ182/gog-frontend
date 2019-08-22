# `cdi-web-app`

## Prerequisites

Need node.js and npm to install and run.

To install latest node.js.
```
sudo npm install -g n
sudo n v8.5.0
```

To update npm
```
sudo npm install -g npm
```

## Installation
```
git clone https://github.com/dianecodemagnus/cdi-web-app.git
cd cdi-web-app
npm install
```
## Running for Development
```
npm start
```
Your default browser should open and go to localhost:8080.

## Building for Production
```
npm run build
```
This will produce a /dist folder in the root directory


## Project Structure
```
.
├── /node_modules                               # all libraries reside here
├── /src
│     ├── /app
│     │     ├── /components
│     │     │     ├── /sample
│     │     │     │    ├── sample.component.js  # component and controller in 1
│     │     │     │    ├── sample.html          # template for component  
│     │     │     │    └── sample.service.js
│     │     │     └─── /<other components>  
│     │     ├── /filters                        # shared filters
│     │     ├── /helpers                        # global, util, etc
│     │     ├── /services                       # shared services
│     │     ├── /shared                         # shared components
│     │     ├── app.config.js
│     │     └── app.js
│     ├── /public
│     │     ├── /images                         # webpack will find all images here
│     │     ├── /styles                         # webpack will find all css here
│     │     ├── favicon.ico
│     │     └── index.html
│     └── index.js                              # main entry point for webpack
├── .gitignore
├── package-lock.json
├── package.json
├── README.md                                   # You are reading this
└── webpack.config.js                           # Config file for webpack
```

## Sample component
```
// imported straight from npm_modules
import angular from 'angular';

// Helpers have to be imported first
// Webpack will reference it from src/app/helpers
import URLS from 'Helpers/urls';

// If the component needs anything from GLOBAL or UTIL
// They will also need to be imported first

(function() {
      'use strict';

      // First argument for the component function will be it's name.
      // In templates, it will be referenced in kebab-case.
      angular.module('app').component('sample', {

            // Requiring the html returns html as a string
            // the leading "./" in the require denotes that it's in the same folder
            template: require('./sample.html'),

            // Assigns which controller to be paired with the component
            // which is defined below
            controller: SampleCtrl,
            controllerAs: 'vm',

            // bindings is what you can pass to the component
            bindings: {
                  name: '<'         // denotes one way binding
                  onChangeName: '&' // denotes function binding
            }

            // For example,
            // <sample 
                  name="CDI"
                  on-change-name="vm.changeName()">
               </sample>

      });

      // Inject all dependencies
      SampleCtrl.$inject = [
        'SampleService'
      ];

      function SampleCtrl(SampleService) {
            var vm = this;

            // variables ...

            // requiring images return the path to that image
            // webpack will reference it from src/public/images
            vm.logo = require('Images/main-logo.png');

            // This is referenced from the imported URLS object
            vm.url = URLS.base;

            vm.data = [];

            // methods ...
            

            // Components are given lifecycle hooks

            // initialization code here
            vm.$onInit = function() {
                  SampleService.getSamples()
                        .then(function(response) {
                              vm.data = response.data;
                        });
            }

            vm.$onDestroy = function() {
                  vm.data = [];
            }
    }
})();

```
