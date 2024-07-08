resource "ncloud_init_script" "install-docker" {
  name    = "${var.service_name}-install-docker"
  content = <<-EOT
    #!/usr/bin/env bash
    # Update the system
    sudo yum update -y

    # Install Docker
    sudo yum install -y yum-utils
    sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
    sudo yum install -y docker-ce docker-ce-cli containerd.io
    sudo systemctl start docker
    sudo systemctl enable docker

    # Install Docker Compose
    sudo curl -L https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
  EOT
}
