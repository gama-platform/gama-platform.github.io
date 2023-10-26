---
title:  Using FIPA ACL
---


GAMA allows modelers to provide agents the capability to communicate with other agents using [FIPA](http://www.fipa.org/) Communication Acts (such as inform, request, call for proposal...) and [Interaction Protocols](http://www.fipa.org/repository/ips.php3) (such [Contract Net Interaction Protocol](http://www.fipa.org/specs/fipa00029/index.html), [Request Interaction Protocol](http://www.fipa.org/specs/fipa00026/index.html)).

To add these capabilities to the chosen species, the modeler needs to attach the `fipa` [skill](AttachingSkills): it adds to agents of the species some additional attributes (e.g. the list of messages received) and available actions (e.g. the possibility to send messages given the chosen Communication Act). 

The exhaustive list of available Communication Acts and Interaction Protocols is available from the technical description of the [`fipa` skill page](BuiltInSkills#fipa).
Examples can be found in the model library bundled with GAMA (`Plugin models / FIPA Skill`).

## Table of Contents
  * [Main steps to create a conversation using FIPA Communication Acts and Interaction Protocols](UsingFIPAACL#main-steps-to-create-a-conversation-using-fipa-communication-acts-and-interaction-protocols)
  * [Attach the fipa skill to a species](UsingFIPAACL#initiate-a-conversation)
  * [Initiate a conversation](UsingFIPAACL#initiate-a-conversation)
  * [Receive messages](UsingFIPAACL#receive-messages)
  * [Reply to a received message](UsingFIPAACL#reply-to-a-received-message)
  * [The `message` data type](UsingFIPAACL#the-message-data-type)
  * [The `conversation` data type](UsingFIPAACL#the-conversation-data-type)


## Main steps to create a conversation using FIPA Communication Acts and Interaction Protocols

1. Attach the skill `fipa` to the agents' species that need to use Communication Acts 
2. An initiator agent starts a conversation with some agents: it chooses the Interaction Protocol and starts it by sending the first Communication Acts of the protocol
3. Each agent involved in the conversation needs to check its received messages and respond to them by choosing the appropriate Communication Act.

## Attach the `fipa` skill to a species

To attach the `fipa` skill to a species, the modeler has to add it in the `skills` facet of  the `species` statement ([in a way similar to any other skill](AttachingSkills)).

```
species any_species skills: [fipa] {
   ...
}
```

Agents of any species can communicate in the same conversation. The only constraint is that they need to have the capabilities to receive and send messages, i.e. to have the skill `fipa`.

Species can have several attached skills: a single species can be provided with both the `moving` and `fipa` skills (and any other ones).

This skill adds to every agent of the species:
* some additional attributes:
  * `conversations` is the list of the agent's current conversations, 
  * `mailbox` is the list of messages of all types of performatives, 
  * `requests`, `informs`, `proposes`... are respectively the list of the 'request', 'inform', 'propose' performative messages.
* some additional actions, such as:
  * `inform`, `accept_proposal`... that replies a message with an 'inform' (respectively 'accept_proposal' performative message).
  * `start_conversation` that starts a conversation with a chosen interaction protocol.
  * `end_conversation` that replies a message with an 'end_conversation' performative message. This message marks the end of a conversation. In a 'no-protocol' conversation, it is the responsibility of the modeler to explicitly send this message to mark the end of a conversation/interaction protocol.
  * `reply` that replies a message. This action should be only used to reply a message in a 'no-protocol' conversation and with a 'user-defined performative'. For performatives supported by GAMA, please use the 'action' with the same name as the 'performative'. For example, to reply a message with a 'request' performative message, the modeler should use the 'request' action.


## Initiate a conversation

An interaction using an Interaction Protocol starts with the creation of a conversation by an agent, using the `start_conversation` action.

The modeler specifies the chosen **protocol** (facet `protocol`), **list of participants** (facet `to`), **communication act** (facet `performative`) and **message** (facet `contents`).

```
species Initiator skills: [fipa] {
	reflex send_propose_message when: (time = 1) {
		do start_conversation to: [p] protocol: 'fipa-propose' performative: 'propose' contents: ['Go swimming?'] ;
	}
```

## Receive messages

Each agent (with the `fipa` skill) is provided with several "mailbox" attributes filtering the various received messages by communication act: e.g. `proposes` contains the list of the received messages with the "Propose" communication act. 

Receiving a message consists thus in looking at each message from the mailbox, and acting in accordance with its contents, participants...

Important remark: once the `contents` field of a received message has been read, it is removed from all the lists it appears in.


```
species Initiator skills: [fipa] {	
	reflex read_accept_proposals when: !(empty(accept_proposals)) {
		write name + ' receives accept_proposal messages';
		loop i over: accept_proposals {
			write 'accept_proposal message with content: ' + string(i.contents);
		}
	}
}

species Participant skills: [fipa] {
	reflex accept_proposal when: !(empty(proposes)) {
		message proposalFromInitiator <- proposes at 0;
		
		do accept_proposal message: proposalFromInitiator contents: ['OK! It \'s hot today!'] ;
	}
}
```

Remark: 
* To test that the agent has received a new message is simply done by testing whether the dedicated mailing box contains messages.
* To get a message, the modeler can either loop over the message list to get all the messages or get a message by its index in the message box.

## Reply to a received message

Given the message it has received, an agent can reply using the appropriate Communication Act (using the appropriate action).
It simply has to specify the message to which it replies and the content of the reply.

Note that it does not need to specify the receiver as it is contained in the message.

```
species Participant skills: [fipa] {
	reflex accept_proposal when: !(empty(proposes)) {
		message proposalFromInitiator <- proposes at 0;
		
		do accept_proposal message: proposalFromInitiator contents: ['OK! It \'s hot today!'] ;
	}
}
```

## End a conversation

When a conversation is made in the scope of an Interaction Protocol, it is ended automatically when the last Communicative Act has been sent.

In the case of a 'no-protocol conversation', it is the responsibility of the modeler to explicitly send the `end_conversation` message to mark the end of a conversation/interaction protocol.

When a conversation ends, it is automatically removed from the list `conversations`.   


## The `message` type

The agents' mailbox is defined as a list of messages. Each message is a GAML object of type `message`. An exhaustive description of this type is provided in the dedicated [GAML Data Types page](DataTypes#message).

A `message` object is defined by a set of several fields, such as:
* `contents` (type `unknown`): the content of the message
* `sender`  (type `unknown`): the sender of the message. In the case where the sender is an agent, it is possible to get the corresponding agent with `agent(m.sender)` (where `m` is the considered message).
* `unread` (type `bool`): specify whether the message has been read.
* `emission_timestamp` (type `int`)
* `recention_timestamp` (type `int`)


## The `conversation` data type

The agents' `conversations` contain the list of the conversations in which the agent takes part.  Each conversation is a GAML object of type `conversation` that contains the list of messages exchanged, the protocol, initiator... An exhaustive description of this type is provided in the dedicated [GAML Data Types page](DataTypes#conversation).

A `conversation` object is defined by a set of several fields, such as:
* `messages` (type = list of messages): the list of messages that compose this conversation
* `protocol` (type = string): the name of the protocol followed by the conversation
* `initiator` (type = agent): the agent that has initiated this conversation
* `participants` (type = list of agents): the list of agents that participate in this conversation
* `ended` (type = bool): whether this conversation has ended or not 
