Ctrl+Shift+P
settings.json (workspace) and add
    "terminal.integrated.profiles.windows": {
    "PowerShell": {
        "source": "PowerShell",
        "icon": "terminal-powershell",
        "args": ["-ExecutionPolicy", "Bypass"]
    }
    },
    "terminal.integrated.defaultProfile.windows": "PowerShell",

Install Yarn, Init
Install Larvel Mix; yarn add laravel-mix -D; https://laravel-mix.com/docs/6.0/installation and scripts https://laravel-mix.com/docs/6.0/upgrade?, yarn add cross-env --save-dev
yarn add express-session
yarn add mongoose
Mongoose database connection did not work from video, changed some stuff, check server.js 
add node modules to git ingoree.. 
env file to gitingore
yarn add express-flash
yarn add connect-mongo
Fix session db mongo connect from https://youtu.be/ftv9SAcW0lI?list=PLXQpH_kZIxTVRmXQN9J0Az76te5mAreLV&t=2520
yarn add axios

noty used for message displaying such as added in cart, etc. 
yarn add noty
<!-- yarn watch is for continiously compiling app.js and app.scss into public which is for laravel mix so ig we have to keep that open in a terminal -->
<!-- and yarn dev is the one which is nodemon types -->
<!-- both these are readable from package json so cool.  -->

<!-- TODO https://youtu.be/ftv9SAcW0lI?list=PLXQpH_kZIxTVRmXQN9J0Az76te5mAreLV&t=3452
for delete added items in cart. 
 -->

 last updated watch from 