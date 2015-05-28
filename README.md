mqtt-collection package for Meteor
==================================

- Messages received via MQTT broker are written into collection

- Data inserted into collection is broadcasted via MQTT


Example
-------

### Connect to MQTT broker and subscribe to topic (server side only)

```
MyCollection.mqttConnect("mqtt://test.mosquitto.org", ["presence"], {});
```

We are now connected and subscribed to "presence" topic. Anything published to "presence" MQTT topic will be written into MyCollection.


### Broadcast data (works both on client and server)

```
MyCollection.insert({ topic: "presence", message: "Hello world! :)", broadcast: true });
```

You need to insert three **mandatory** fields: `topic`, `message` and `broadcast` and your message will be broadcasted via MQTT broker to specified topic.


Functions
=========

Collection.mqttConnect(uri, topics, options)
--------------------------------------------

Establishes connection to MQTT broker and subscribes to listed topic(s).

**Arguments:**

- `uri` is mqtt broker address
- `topics` is array of strings or single string - topic name(s) to subscribe on connect
- `options` is object with following properties:
```
{
	insert: false,
	raw: false
}
```
- `insert` - if set to true, each message will be inserted into collection (and your collection will grow!). If this option is not set (or set to false) messages will be upsert-ed (you'l have single document for each topic). Default: false
- `raw` - if set to true, received string will be written as-is. If this option is not set (or set to false) received string will be converted to object with `JSON.parse()`. Default: false


Collection.mqttDisconnect()
---------------------------

Closes connection to MQTT broker


Collection.mqttSubscribe(topics)
--------------------------------

Subscribe to specified topic(s). Works only **after** MQTT connection is established.

**Arguments:**

- `topics` is array of strings or single string - topic name(s) to subscribe


Live example
============

You can find example application using this package <a href="http://generator-iot.meteor.com" target="_blank">here</a>.


That's all folks :)
