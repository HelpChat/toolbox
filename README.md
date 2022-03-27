# HelpChat Toolbox

## What is it?

HelpChat Toolbox is a toolbox of useful tools for HelpChat's Minecraft plugins, configs, and more!

It currently includes the following features:

- [DeluxeChat to ChatChat Config Converter](https://toolbox.helpch.at/converters/chatchat/deluxechat)
- [EssentialsChat to ChatChat Config Converter](https://toolbox.helpch.at/converters/chatchat/essentialschat)
- [VentureChat to ChatChat Config Converter](https://toolbox.helpch.at/converters/chatchat/venturechat)
- [Yaml Config Validator](https://toolbox.helpch.at/validators/yaml)
- [Properties Config Validator](https://toolbox.helpch.at/validators/properties)
- [Toml Config Validator](https://toolbox.helpch.at/validators/toml)
- [Hocon Config Validator](https://toolbox.helpch.at/validators/hocon)
- [XML Config Validator](https://toolbox.helpch.at/validators/xml)

### Usage

HelpChat's Toolbox is hosted at [toolbox.helpch.at](https://toolbox.helpch.at/).

## Development

### Starting Guide

1. Clone the repository
2. Install NPM, and NodeJS for your respective platform
3. Install yarn globally (`npm i -g yarn`)
4. Install the dependencies of this project (`yarn install`)
5. Run the dev server (`yarn dev`)
6. Start making changes! They'll be automatically reloaded @ http://localhost:3000/

### Generating JSON Schemas for Converter Types

Run the command `yarn generateschema`, and pass it to the Converter. It will validate types for you at runtime.

### UI Development & Design

Run `yarn dev`, and it will automatically reload the UI at http://localhost:3000/ as you make changes.
Pages are generated from the `pages/` directory, so to add a new page simply just create that file in the directory.

### Feature Development

Converters are currently written in their own folder (`converters/`), directory.
To test a newly created one you'll need to create a new page for it to see live updates in your browser, refer to the UI Development & Design section above for more information on developing with live-updates
