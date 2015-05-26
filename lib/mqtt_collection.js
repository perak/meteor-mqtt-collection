var Fiber = Npm.require("fibers");

var Mongo = Package.mongo.Mongo;

Mongo.Collection.prototype._mqttClient = null;

Mongo.Collection.prototype.mqttConnect = function(uri, topics) {
	var self = this;
	this.mqttDisconnect();

	this._mqttClient = mqtt.connect(uri);

	this._mqttClient.on("connect", function() {
		self.mqttSubscribe(topics);
	});

	this._mqttClient.on("message", function(topic, message) {
		Fiber(function() {
			self.insert({
				topic: topic,
				message: message.toString()
			}, function(e, r) {
				if(e) console.log(e);
			});
		}).run();
	});

	var init = true;
	this.find().observeChanges({
		added: function(id, doc) {
			if(!init) {
				if(doc && doc.topic && doc.message && doc.broadcast && self._mqttClient) {
					self.remove({ _id: id });
					self._mqttClient.publish(doc.topic, doc.message);
				}
			}
		}
	});
	init = false;
};

Mongo.Collection.prototype.mqttDisconnect = function() {
	if(this._mqttClient) this._mqttClient.end();
	this._mqttClient = null;
};

Mongo.Collection.prototype.mqttSubscribe = function(topics) {
	var self = this;
	if(!this._mqttClient) return;
	if(!topics) return;

	if(typeof topics == 'string' || topics instanceof String) {
		this._mqttClient.subscribe(topics);
	} else if(_.isArray(topics)) {
		_.each(topics, function(topic) {
			self._mqttClient.subscribe(topic);
		});
	}
};
