Vagrant.configure("2") do |config|

  config.vm.box = "hashicorp/precise64"

  # config.vm.define "es3" do |node|
  #   node.vm.network :private_network, ip: "10.30.50.202"
  #   node.vm.hostname = "es3.vagrant"
  # end

  # config.vm.define "es2" do |node|
  #   node.vm.network :private_network, ip: "10.30.50.201"
  #   node.vm.hostname = "es2.vagrant"
  # end

  config.vm.define "es1" do |node|
    node.vm.network :private_network, ip: "10.30.50.200"
    node.vm.hostname = "es1.vagrant"
  end

  config.vm.define "redis" do |node|
    config.vm.network :private_network, ip: "10.30.50.100"
    node.vm.hostname = "redis.vagrant"

    config.vm.provider :virtualbox do |vb|
      vb.customize ["modifyvm", :id, "--memory", "1024"]
    end
  end

end
