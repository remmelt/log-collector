Vagrant.configure("2") do |config|

  config.vm.box = "ubuntu12.04"
  config.vm.box_url = "https://dl.dropbox.com/s/gd3rzuumwgeuqcp/ubuntu12.04.box"

  config.vm.define "es2" do |node|
    node.vm.network :private_network, ip: "10.30.50.201"
    node.vm.hostname = "es2"
  end

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
  end

end
