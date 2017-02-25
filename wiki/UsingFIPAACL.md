---
layout: default
title: Using FIPA ACL
wikiPageName: UsingFIPAACL
wikiPagePath: wiki/UsingFIPAACL.md
---

[//]: # (keyword|concept_fipa)
[//]: # (startConcept|fipa_acl)
# Using FIPA ACL


The communicating skill offers some actions and built-in variables which enable agents to communicate with each other using the FIPA interaction protocol. This document describes the built-in variables and actions of this skill. Examples are found in the models library bundled with GAMA.

##Variables

* **accept_proposals (list)**: A list of 'accept_proposal' performative messages of the agent's mailbox having .
* **agrees (list)**: A list of 'accept_proposal' performative messages.
* **cancels (list)**: A list of 'cancel' performative messages.
* **cfps (list)**: A list of 'cfp' (call for proposal) performative messages.
* **conversations (list)**: A list containing the current conversations of agent. Ended conversations are automatically removed from this list.
* **failures (list)**: A list of 'failure' performative messages.
* **informs (list)**: A list of 'inform' performative messages.
* **messages (list)**: The mailbox of the agent, a list of messages of all types of performatives.
* **proposes (list)**: A list of 'propose' performative messages .
* **queries (list)**: A list of 'query' performative messages.
* **refuses (list)**: A list of 'propose' performative messages.
* **reject_proposals (list)**: A list of 'reject_proposals' performative messages.
* **requests (list)**: A list of 'request' performative messages.
* **requestWhens (list)**: A list of 'request-when' performative messages.
* **subscribes (list)**: A list of 'subscribe' performative messages.

### Actions
####accept_proposal
Replies a message with an 'accept_proposal' performative message
* returns: unknown
* message (message): The message to be replied
* content (list): The content of the replying message

####agree
Replies a message with an 'agree' performative message.
* returns: unknown
* message (message): The message to be replied
* content (list): The content of the replying message

####cancel
Replies a message with a 'cancel' peformative message.
* returns: unknown
* message (message): The message to be replied
* content (list): The content of the replying message

####cfp
Replies a message with a 'cfp' performative message.
* returns: unknown
* message (message): The message to be replied
* content (list): The content of the replying message

####end_conversation
Replies a message with an 'end_conversation' peprformative message. This message marks the end of a conversation. In a 'no-protocol' conversation, it is the responsible of the modeler to explicitly send this message to mark the end of a conversation/interaction protocol.
* returns: unknown
* message (message): The message to be replied
* content (list): The content of the replying message

####failure
Replies a message with a 'failure' performative message.
* returns: unknown
* message (message): The message to be replied
* content (list): The content of the replying message

####inform
Replies a message with an 'inform' performative message.
* returns: unknown
* message (message): The message to be replied
* content (list): The content of the replying message

####propose
Replies a message with a 'propose' performative message.
* returns: unknown
* message (message): The message to be replied
* content (list): The content of the replying message

####query
Replies a message with a 'query' performative message.
* returns: unknown
* message (message): The message to be replied
* content (list): The content of the replying message

####refuse
Replies a message with a 'refuse' performative message.
* returns: unknown
* message (message): The message to be replied
* content (list): The content of the replying message

####reject_proposal
Replies a message with a 'reject_proposal' performative message.
* returns: unknown
* message (message): The message to be replied
* content (list): The content of the replying message

####reply
Replies a message. This action should be only used to reply a message in a 'no-protocol' conversation and with a 'user defined performative'. For performatives supported by GAMA (i.e., standard FIPA performatives), please use the 'action' with the same name of 'performative'. For example, to reply a message with a 'request' performative message, the modeller should use the 'request' action.
* returns: unknown
* message (message): The message to be replied
* performative (string): The performative of the replying message
* content (list): The content of the replying message

####request
Replies a message with a 'request' performative message.
* returns: unknown
* message (message): The message to be replied
* content (list): The content of the replying message

####send
Starts a conversation/interaction protocol.
* returns: msi.gaml.extensions.fipa.Message
* receivers (list): A list of receiver agents
* content (list): The content of the message. A list of any GAML type
* performative (string): A string, representing the message performative
* protocol (string): A string representing the name of interaction protocol

####start_conversation
Starts a conversation/interaction protocol.
* returns: msi.gaml.extensions.fipa.Message
* receivers (list): A list of receiver agents
* content (list): The content of the message. A list of any GAML type
* performative (string): A string, representing the message performative
* protocol (string): A string representing the name of interaction protocol

####subscribe
Replies a message with a 'subscribe' performative message.
* returns: unknown
* message (message): The message to be replied
* content (list): The content of the replying message

[//]: # (endConcept|fipa_acl)
