# Gluon

## Simple Discord API Library for Quark

# Info

### IDs for related structures

Where possible, Gluon will try to attach the structure of related resources. For example, attaching a channel object to a message. However, if these related structures are not being actively cached (the channel not being cached in this example), it is not possible to attach these structures. If that structure is not present, Gluon will **always provide the id of the related structure instead** (either/or).