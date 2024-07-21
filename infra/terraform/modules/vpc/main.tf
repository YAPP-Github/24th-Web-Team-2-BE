# Resource: VPC
resource "ncloud_vpc" "main" {
  name            = var.service_name
  ipv4_cidr_block = var.cidr_block
}

# Resource: Subnet(Public - for Kube Node)
resource "ncloud_subnet" "public-node" {
  name           = "${var.service_name}-public-node"
  vpc_no         = ncloud_vpc.main.id
  subnet         = cidrsubnet(ncloud_vpc.main.ipv4_cidr_block, 8, 0)
  zone           = var.zone
  network_acl_no = ncloud_vpc.main.default_network_acl_no
  subnet_type    = "PUBLIC"
  usage_type     = "GEN"
}

# Resource: Subnet(Public - for NAT Gateway)
resource "ncloud_subnet" "public-nat" {
  name           = "${var.service_name}-public-nat"
  vpc_no         = ncloud_vpc.main.id
  subnet         = cidrsubnet(ncloud_vpc.main.ipv4_cidr_block, 8, 1)
  zone           = var.zone
  network_acl_no = ncloud_vpc.main.default_network_acl_no
  subnet_type    = "PUBLIC"
  usage_type     = "NATGW"
}

# Resource: Subnet(Public - for Load Balancer)
resource "ncloud_subnet" "public-lb" {
  name           = "${var.service_name}-public-lb"
  vpc_no         = ncloud_vpc.main.id
  subnet         = cidrsubnet(ncloud_vpc.main.ipv4_cidr_block, 8, 2)
  zone           = var.zone
  network_acl_no = ncloud_vpc.main.default_network_acl_no
  subnet_type    = "PUBLIC"
  usage_type     = "LOADB"
}

# Resource: Subnet(Private - for Kube Node)
resource "ncloud_subnet" "private-node" {
  name           = "${var.service_name}-private"
  vpc_no         = ncloud_vpc.main.id
  subnet         = cidrsubnet(ncloud_vpc.main.ipv4_cidr_block, 8, 3)
  zone           = var.zone
  network_acl_no = ncloud_vpc.main.default_network_acl_no
  subnet_type    = "PRIVATE"
}

# Resource: Subnet(Private - for Load Balancer)
resource "ncloud_subnet" "private-lb" {
  name           = "${var.service_name}-private-lb"
  vpc_no         = ncloud_vpc.main.id
  subnet         = cidrsubnet(ncloud_vpc.main.ipv4_cidr_block, 8, 4)
  zone           = var.zone
  network_acl_no = ncloud_vpc.main.default_network_acl_no
  subnet_type    = "PRIVATE"
  usage_type     = "LOADB"
}
