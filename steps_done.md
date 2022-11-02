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

yarn add laravel-mix -D
https://laravel-mix.com/docs/6.0/installation and scripts https://laravel-mix.com/docs/6.0/upgrade?, 
yarn add cross-env --save-dev