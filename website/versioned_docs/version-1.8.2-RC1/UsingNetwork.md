---
title:  Using network
---


## Introduction

GAMA provides features to allow agents to communicate with other agents (and other applications) through network and to exchange messages of various types (from simple number to agents). To this purpose, the `network` skill should be used on agents intending to use these capabilities.

Notice that in this communication, roles are asymetric: the simulations should contain a server and some clients to communicate. Message exchanges are made between agents through this server. 3 protocols are supported (TCP, UDP and MQTT):

* **when TCP or UDP protocols are used:** one agent of the simulation is the server and the other ones are the clients.
* **when the MQTT protocol is used:** all the agents are clients and the server is an external software. A free solution (ActiveMQ) can be freely downloaded from: http://activemq.apache.org.

## Which protocol to use ?

In the GAMA network, 3 kinds of protocol can be used. Each of them has a particular purpose.

* **MQTT**: this is the default protocol that should be used to make agents of various GAMA instances to communicate through a MQTT server (that should be run as an external application, e.g. ActiveMQ that can be downloaded from: http://activemq.apache.org/),
* **UDP**: this protocol should be limited to fast (and unsecured) exchanges of small pieces of data from GAMA to an external application (for example, mouse location from a Processing application to GAMA, c.f. model library),
* **TCP**: this protocol can be used both to communicate between GAMA applications or between GAMA and an external application.

## Disclaimer

**In all the models using any network communication, the server should be launched before the clients.**
As a consequence, when TCP or UDP protocols are used, a model creating a server agent should always be run first. Using MQTT protocol, the external software server should be launched before running any model using it.


## Declaring a network species

To create agents able to communicate through a network, their species should have the skill `network`:
```
species Networking_Client skills: [network] {
    ...
}
```

A list exhaustive of the additional attributes and available actions provided by this skill are described here:
[network skill preference page](https://github.com/gama-platform/gama/wiki/BuiltInSkills#network).


## Creation of a network agent

The network agents are created as any other agents, but (in general) at the creation of the agents, the connection is also created, using the `connect` built-in action:

```
create Networking_Client {
    do connect to: "localhost" protocol: "tcp_client" port: 3001 with_name: "Client";
}
```

Each protocol has its specificities regarding the connection:

* **TCP**: 
  * **`protocol`**: the 2 possibles keywords are `tcp_server` or `tcp_client`, depending on the wanted role of the agent in the communication.
  * **`port`**: traditionally the port `3001` is used.
* **UDP**: 
  * **`protocol`**: the 2 possibles keywords are `udp_server` or `udp_emitter`, depending on the wanted role of the agent in the communication.
  * **`port`**: traditionally the port `9876` is used.
* **MQTT**: 
  * **`protocol`**: MQTT is the default protocol value (if no value is given, MQTT will be used)
  * **`port`**: traditionally the port `1883` is used (when ActiveMQ is used as the server application)
  * **`admin`** and **`password`**: traditionally the default login and password are "admin" (when ActiveMQ is used as the server application)

Note: if no connection information is provided with the MQTT protocol (no `port`), then GAMA connects to an MQTT server provided by the GAMA community (for test purpose only!).

## Sending messages

To send any message, the agent has to use the `send` action:
```		
do send to: "server" contents: name + " " + cycle + " sent to server";
```

The network skill in GAMA allows the modeler to send simple string messages between agents but also to send more complex objects (and in particular agents). In this case, the use of the MQTT protocol is highly recommended.

```
do send to: "receiver" contents: (9 among NetworkingAgent);	
```

## Receiving messages

The messages sent by other agents are received in the `mailbox` attribute of each agent. So to get its new message, the agent has simply to check whether it has a new message (with action `has_more_message()` ) and fetch it (that gets it and remove it from the mailing box) with the action `fetch_message()`.
```
reflex fetch when: has_more_message() {	
    message mess <- fetch_message();
    write name + " fecth this message: " + mess.contents;	
}
```

Note that when an agent is received, the fetch of the message will recreate the agent in the current simulation.

Alternatively, the `mailbox` attribute can be directly accessed (notice that the `mailbox` is a list of messages):
```
reflex receive {  
    if (length(mailbox) > 0) {
        write mailbox;
    }
}
```


## Broadcasting a message to all the agents' members of a given group

Each time an agent creates a connection to another agent as a client, a way to communicate with it is stored in the `network_groups` attribute. 
So an agent can use this attribute to broadcast messages to all the agents with whose it can communicate: 
```
reflex broad {
    loop id over: network_groups {
        do send to: id contents: "I am Server " + name + " I give order to " + id;
    }
}
```

To go further:

* [network skill reference page](BuiltInSkills#network).
* example models can be found in the GAMA model library, in: `Plugin models > Network`.

