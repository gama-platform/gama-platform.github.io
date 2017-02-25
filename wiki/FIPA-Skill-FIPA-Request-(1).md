---
layout: default
title: FIPA Request
wikiPageName: FIPA-Skill-FIPA-Request-(1)
wikiPagePath: wiki/FIPA-Skill-FIPA-Request-(1).md
---

[//]: # (keyword|skill_fipa)
[//]: # (keyword|type_message)
[//]: # (keyword|concept_fipa)
# FIPA Request


This model demontrates a usecase of the FIPA Request interaction protocol. (Please see http://www.fipa.org/specs/fipa00026/index.html for the detail description of this protocol).

The Initiator agent begins the 'fipa-request' conversation/interaction protocol by sending a 'request' message to the Participant agent with 'go sleeping' as content.
On receiving the 'request' message, the Participant agent replies with a 'refuse' message.
After the Initiator reads the 'refuse' message, the 'fipa-request' conversation ends.


Code of the model : 

```
model fipa_request_1

global {
	Participant p;
	
	init {
		create Initiator;
		create Participant returns: ps;
		
		 p <- ps at 0;
		
		write 'Step the simulation to observe the outcome in the console';
	}
}

species Initiator skills: [fipa] {
	reflex print_debug_infor {
		write name + ' with conversations: ' + (string(conversations)) + '; messages: ' + (string(mailbox));
	}
	
	reflex send_request when: (time = 1) {
		write 'send message';
		do start_conversation with: [ to :: [p], protocol :: 'fipa-request', performative :: 'request', contents :: ['go sleeping'] ];
	}
	
	reflex read_refuse_message when: !(empty(refuses)) {
		write 'read refuse messages';
		loop r over: refuses {
			write 'refuse message with content: ' + string(r.contents);
		}
	}
}

species Participant skills: [fipa] {
	reflex print_debug_infor {
		write name + ' with conversations: ' + (string(conversations)) + '; messages: ' + (string(mailbox));
	}

	reflex reply_messages when: (!empty(mailbox)) {
		write name + ' sends a refuse message';
		do refuse with: [ message :: (mailbox at 0), contents :: ['I don\'t want'] ];
	}
}



experiment test_request_interaction_protocol type: gui {}
```
