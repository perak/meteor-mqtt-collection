mqtt-collection package for Meteor
==================================

- Messages received via MQTT broker are written into collection

- Data inserted into collection is broadcasted via MQTT


Example
-------

### Connect to MQTT broker and subscribe to topic (server side only)

```
MyCollection.mqttConnect("mqtt://test.mosquitto.org", ["presence"]);
```

We are now connected and subscribed to "presence" topic. Anything published to "presence" MQTT topic will be written into MyCollection.


### Broadcast data (works both on client and server)

```
MyCollection.insert({ topic: "presence", message: "Hello world! :)", broadcast: true });
```

You need to insert three **mandatory** fields: `topic`, `message` and `broadcast` and your message will be broadcasted via MQTT broker to specified topic.


Functions
=========

Collection.mqttConnect(uri, topics)
-----------------------------------

- `uri` is mqtt broker address
- `topics` is array of strings or single string - topic name(s) to subscribe on connect

Establishes connection to MQTT broker and subscribes to listed topic(s).


Collection.mqttDisconnect()
---------------------------

Closes connection to MQTT broker


Collection.mqttSubscribe(topics)
--------------------------------

- `topics` is array of strings or single string - topic name(s) to subscribe on connect

Subscribe to specified topic(s). Works only **after** MQTT connection is established.


That's all folks :)
