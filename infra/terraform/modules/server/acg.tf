resource "ncloud_access_control_group" "temp-server-acg" {
  name        = "${var.service_name}-temp-server-acg"
  description = "VPC Access Control Group"
  vpc_no      = var.vpc_id
}

resource "ncloud_access_control_group_rule" "temp-server-acg-rule" {
  access_control_group_no = ncloud_access_control_group.temp-server-acg.id

  inbound {
    protocol    = "TCP"
    ip_block    = "0.0.0.0/0"
    port_range  = "22"
    description = "accept 22 port"
  }

  inbound {
    protocol    = "TCP"
    ip_block    = "0.0.0.0/0"
    port_range  = "80"
    description = "accept 80 port"
  }

  inbound {
    protocol    = "TCP"
    ip_block    = "0.0.0.0/0"
    port_range  = "3000"
    description = "accept 3000 port"
  }

  outbound {
    protocol    = "TCP"
    ip_block    = "0.0.0.0/0"
    port_range  = "1-65535"
    description = "accept 1-65535 port"
  }
}
