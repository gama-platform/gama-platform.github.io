---
layout: default
title: FIPA no protocol
wikiPageName: FIPA-Skill-FIPA-No-Protocol
wikiPagePath: wiki/FIPA-Skill-FIPA-No-Protocol.md
---

[//]: # (keyword|skill_fipa)
[//]: # (keyword|type_message)
[//]: # (keyword|concept_fipa)
# FIPA no protocol


This model demonstrates a usecase of 'no-protocol' interaction protocol.
'no-protocol' is a freestyle intecraction protocol in which the modeller
(1) can send whatever type of message (i.e., message performative) in the corresponding conversation
(2) is responsible for marking the end of the conversation by sending a message with 'end_conversation' performative. 


Code of the model : 

```
model no_protocol_1

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
		write name + ' with conversations: ' + (string(conversations)) + '; mailbox: ' + (string(mailbox));
	}

	reflex say_hello when: (time = 1) {
		do start_conversation with: [ to :: [p], protocol :: 'no-protocol', performative :: 'inform', contents :: [ ('Hello from ' + name)] ];
	}
	
	reflex read_hello_from_participant when: (time = 3) {
		loop i over: informs {
			write name + ' receives message with content: ' + (string(i.contents));
			do inform with: [ message :: i, contents :: [ ('Goodbye from ' + name)] ];
		}
	}
	
	reflex read_rebound_goodbye when: (time = 5) {
		loop i over: mailbox {
			write name + ' receives message with content: ' + (string(i.contents));
		}
	}
}

species Participant skills: [fipa] {
	reflex print_debug_infor {
		write name + ' with conversations: ' + (string(conversations)) + '; mailbox: ' + (string(mailbox));
	}

	reflex reply_hello when: (time = 2) {
		loop m over: informs {
			write name + ' receives message with content: ' + (string(m.contents));
			do inform with: [ message :: m, contents :: [ ('Rebound hello from ' + name) ] ];
		}
	}
	
	reflex read_goodbye when: (time = 4) {
		loop i over: informs {
			write name + ' receives message with content: ' + (string(i.contents));
			do end_conversation with: [ message :: i, contents :: [ ('Rebound goodbye from' + name) ] ];
		}
	}
}


experiment test_no_protocol type: gui {}
```
