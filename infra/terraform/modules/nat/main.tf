# Resource: NAT Gateway
resource "ncloud_nat_gateway" "nat-gateway" {
  name      = "${var.service_name}-nat-gw"
  zone      = var.zone
  vpc_no    = var.vpc_id
  subnet_no = var.subnet_id.public_nat
}
