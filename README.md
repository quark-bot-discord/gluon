# Gluon

## Simple Discord API Library for Quark

https://quark-bot-discord.github.io/gluon/

https://gluon.quark.bot/

# Info

### Purpose

Gluon is a library made specifically for Quark, so only has options to cache anything that Quark needs to cache. Many things are missing from this library. There are also options to further refine caching, in order to minimise memory usage. Some structures are also stored in "weird" ways in order to optimise memory usage, such as the use of bitfields in order to store groups of binary fields or ids being stored as BigInts rather than strings.

### Bugs

Gluon has been used in Quark for well over a year, and most bugs have been ironed out over this time.

### Structure

Gluon is intended to be very similar in terms of structure to Discord.JS, so that switching from Discord.JS to Gluon requires minimal modifications. It should be noted that the behaviour of these two libraries are very different, and this should be considered when converting.

### IDs for related structures

Where possible, Gluon will try to attach the structure of related resources. For example, attaching a channel object to a message. However, if these related structures are not being actively cached (the channel not being cached in this example), it is not possible to attach these structures. If that structure is not present, Gluon will **always provide the id of the related structure instead** (either/or).
