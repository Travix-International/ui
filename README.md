# Travix themes

This is repository for Travix brand themes

# Motivation
As we are moving components to separate travix ui kit we need to provide configuration file for different Travix brands. The main idea of this configuration files is to follow inharitance model where the common rules are written in the _default.yaml files, and this rules can be overwritten by rules specific by `brand`, `affiliate` or `language`.

# How it is structured:
In `themes/_default.yaml` file you can find the most common rules defining a Travix theme. To have specific theme for example CT, we have the path `themes/cheaptickets/_default.yaml`. If you want to be even more specific, for example on an affiliate level, then the file created to overwrite this rules, let's say for NL, needs to have the following path `themes/cheaptickets/NL/_default.yaml`.

# How to use it in a project:

```
const fs = require('fs');
const travixTheme = require('travix-themes');
const file = travixTheme('cheaptickets', 'en', 'US');
fs.writeFileSync('./theme.yaml', file);
```

**Work in progress**