# react-video-chat
React.js video chat client

## Usage
* `make init`
* `npm start`
* Profit!

## NPM Scripts

##### `npm run build`
This script will build the un-minified JavaScript, CSS, and HTML files.

##### `npm run build:prod`
This script will build the minified JavaScript, CSS, and HTML files.

##### `npm run pagespeed`
This script will execute Google Pagespeed Insights on the URL to which you deploy your site. You will need to set this property within the `gulpfile`.

##### `npm start`
This script will build the un-minified JavaScript, CSS, and HTML files. It will also begin the development server at port 3000. (The port can be changed in the gulpfile)

##### `npm test`
This task will begin the `Karma` server, which will run continuously, executing the test suite upon file changes within the `src/scripts` directory.

##### `npm run test:single`
This task will run the `Karma` test suite once.
