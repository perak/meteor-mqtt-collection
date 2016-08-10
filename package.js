Package.describe({
  name: "perak:mqtt-collection",
  version: "1.0.5",
  summary: "IoT for Meteor - send/receive MQTT messages via collections",
  git: "https://github.com/perak/meteor-mqtt-collection.git",
  documentation: "README.md"
});

Npm.depends({
  "mqtt": "1.13.0"
});

Package.onUse(function(api) {
  api.versionsFrom("1.0");
  api.addFiles("lib/mqtt.js", "server");
  api.addFiles("lib/mqtt_collection.js", "server");
  api.export("mqtt");
});
