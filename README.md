Log Collector
=============


Requirements
------------

- Vagrant 1.5.0 or newer
- Ansible, tested on 1.5.3


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

Access kibana by surfing to [http://redis.vagrant/](http://redis.vagrant/) in your browser.

On the shipper nodes, output your logs to the redis host on port 6379.

Adding an elasticsearch machine is as simple as adding it in the Vagrantfile and the Ansible inventory, then running the `site.yml` playbook. The node will automatically join the ES cluster.


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


Security considerations
-----------------------

Sending logs to redis should probably be encrypted, use a VPN.
Unless you want open access to your logs, you should further limit access to ports 80 en 9200 to a set of known IPs, set these (and other server configs) in the `host_vars` under `nginx.server_config`. You can additionally configure firewall rules, htaccess auth, or anything else.


Further reading
---------------

- [Logstash documentation](http://logstash.net/docs/1.4.0/tutorials/getting-started-centralized)
- [Bigdesk ES cluster overview](http://bigdesk.org/v/)
