import './app/app.js';
import './public/favicon.ico';

// recursively finds all files in the stated folders using the regex provided
const styles = require.context('./', true, /.*\.(css)$/);
const helpers = require.context('./app/helpers', true, /.*\.js$/);
const services = require.context('./app', true, /.*\.service\.js$/);
const filters = require.context('./app', true, /.*\.filter\.js$/);
const components = require.context(
    './app',
    true,
    /.*\.(components?|directive)\.js$/
);
const configs = require.context('./app', true, /.*\.config\.js$/);

// requires all of these in order
styles.keys().forEach(styles);
helpers.keys().forEach(helpers);
services.keys().forEach(services);
filters.keys().forEach(filters);
components.keys().forEach(components);
configs.keys().forEach(configs);
