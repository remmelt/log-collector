Log Collector
=============


First run
---------

- Install the Vagrant hostmanager plugin:  `vagrant plugin install vagrant-hostmanager`
- Bring up your virtual machines: `vagrant up`. This will ask for your sudo password so it can update your
  `/etc/hosts` file.


Provisioning
------------

Vagrant and Ansible do not work together well. Vagrant wants to do a provisioning run for each machine it brings up, Ansible has its own concept of inventory. We shall do the provisioning manually.

`ansible-playbook -i inventories/vagrant site.yml`

This requires a known private key, add it to your ssh-agent with `ssh-add ~/.vagrant.d/insecure_private_key` or use `ansible-playbook -i inventories/vagrant site.yml -c ssh --private-key ~/.vagrant.d/insecure_private_key`


Result
------

We now have three machines, redis, es1 and es2.

- redis runs redis, the logstash indexer and kibana through nginx. Nginx also proxies elasticsearch.
- es1 and es2 run elasticsearch in a clustered configuration.

Access kibana by surfing to [http://redis/](http://redis/) in your browser.


Glassfish 4 configuration
-------------------------

Use GELF logging from [logstash-gelf](http://logging.paluch.biz/examples/jul.html).
Download the package, put both json-simple-*.jar and logstash-gelf-*.jar in `$GLASSFISH_HOME/glassfish/lib/endorsed`.
Edit `$GLASSFISH_HOME/glassfish/domains/<domain name>/config/<config name>/logging.properties` and change/add these lines:
```
handlers = biz.paluch.logging.gelf.jul.GelfLogHandler, java.util.logging.ConsoleHandler
.handlers = biz.paluch.logging.gelf.jul.GelfLogHandler, java.util.logging.ConsoleHandler

biz.paluch.logging.gelf.jul.GelfLogHandler.host=udp:localhost
biz.paluch.logging.gelf.jul.GelfLogHandler.port=12201
biz.paluch.logging.gelf.jul.GelfLogHandler.level=FINE
biz.paluch.logging.gelf.jul.GelfLogHandler.extractStackTrace=true
```

Now restart instances with sync=full.

Start logstash with `agent -f shipper-gelf.conf` to begin shipping GELF logs to redis.

Logstash currently talks to localhost with the provided shipper configuration. Either change this to put the correct host or create a reverse tunnel using `ssh -R...`.


Further reading
---------------

- [Logstash documentation](http://logstash.net/docs/1.3.3/tutorials/getting-started-centralized)


TODO
----

- Automatically start services (use Tanuki wrapper for starting logstash.jar?)
- Actual clustering of the es machines
