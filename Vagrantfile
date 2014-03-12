Vagrant.configure("2") do |config|

  config.vm.box = "ubLTX"
  #config.vm.box_url = "http://dl.dropbox.com/u/1537815/precise64.box"
  
  # config.vm.define "es2" do |node|
  #   node.vm.network :private_network, ip: "10.30.50.201"
  #   node.vm.hostname = "es2"
  # end
  
  config.vm.define "es1" do |node|
    node.vm.network :private_network, ip: "10.30.50.200"
    node.vm.hostname = "es1"
  end
  
  config.vm.define "redis" do |node|
    config.vm.network :private_network, ip: "10.30.50.100"
    node.vm.hostname = "redis"

    config.vm.provider :virtualbox do |vb|
      vb.customize ["modifyvm", :id, "--memory", "1024"]
    end

    config.vm.provision :ansible do |ansible|
      ansible.playbook = "site.yml"
      ansible.verbose = "false"
      ansible.sudo = "false"
      ansible.inventory_path = "inventories/vagrant"
    end
  end

  # Manage /etc/hosts on host and VMs
  # config.hostmanager.enabled = true
  # config.hostmanager.manage_host = true
  # config.hostmanager.include_offline = true
  # config.hostmanager.ignore_private_ip = false
  
  # config.vm.provision :hostmanager  

end
