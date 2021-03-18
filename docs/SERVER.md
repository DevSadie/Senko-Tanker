# Setting up the bot
If you are using this bot for your own purposes, please read this document. Before doing this, please read the [contributing guide](./CONTRIBUTING.md).

#### Table of contents
* [Changing default values](#changing-default-values)
    * [Embed Data](#embed-data)
        * [Notes](#notes)
    * [Owners](#owners)
    * [Changing the prefix](#changing-the-prefix)

***

## Changing Default Values
The bot comes preinstalled with some default values, if you are using this bot for your own purposes, you might want to change these.

### Embed Data
1. Open [the embed configuration file](/src/config/embeds.json)
2. Replace the values with your own values

#### Notes
1. If you do not want to add a URL, add `null` as the value without double quotation marks.
2. The logo image should be hosted on Imgur or other image hosting platforms.
3. When adding text or links, type double quotation marks (`"`) on both ends.

### Adding Owners
1. Open [the owner configuration file](/src/config/owners.json)
2. Replace the IDs with the IDs of the people you want to give access to devtools.
3. Seperate each owner using a comma and put each ID between double quotation marks.

### Changing the prefix
1. Open [the general configuration file](/src/config/config.json)
2. Change the value in between the two double quotation marks for the value `prefix`

You might also want to replace the bot developer name.








