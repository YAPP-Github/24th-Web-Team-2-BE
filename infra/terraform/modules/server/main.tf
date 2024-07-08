resource "ncloud_login_key" "server-loginkey" {
  key_name = "${var.service_name}-server-loginkey"
}

resource "local_file" "ssh_key" {
  filename = "${ncloud_login_key.server-loginkey.key_name}.pem"
  content  = ncloud_login_key.server-loginkey.private_key
}

resource "ncloud_server" "temp-server" {
  subnet_no                 = var.subnet_id.public_node
  name                      = "${var.service_name}-temp-server"
  server_image_product_code = data.ncloud_server_image.server-image.id
  server_product_code       = data.ncloud_server_product.server-product.id
  login_key_name            = ncloud_login_key.server-loginkey.key_name
  init_script_no            = ncloud_init_script.install-docker.id
}

resource "ncloud_public_ip" "temp-server-public-ip" {
  server_instance_no = ncloud_server.temp-server.id
}

data "ncloud_server_image" "server-image" {
  filter {
    name   = "os_information"
    values = ["CentOS 7.8 (64-bit)"]
  }
}

data "ncloud_server_product" "server-product" {
  server_image_product_code = data.ncloud_server_image.server-image.id

  filter {
    name   = "generation_code"
    values = ["G2"]
  }
  filter {
    name   = "product_type"
    values = ["HICPU"]
  }
  filter {
    name   = "product_name"
    values = ["vCPU 2EA, Memory 4GB, Disk 50GB"]
  }

}
