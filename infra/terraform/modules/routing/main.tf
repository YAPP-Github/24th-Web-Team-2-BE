# Private Node Subnet의 Routing Table Cofiguration
resource "ncloud_route_table" "rt-private-node" {
  name                  = "${var.service_name}-private-node-rt"
  description           = "Private Node Subnet의 Routing Table"
  vpc_no                = var.vpc_id
  supported_subnet_type = "PRIVATE"
}

resource "ncloud_route_table_association" "rt-association-private-node" {
  route_table_no = ncloud_route_table.rt-private-node.id
  subnet_no      = var.subnet_id.private_node
}

# Route Rule: Internet으로의 outbound traffic을 NAT GW에 연결
resource "ncloud_route" "rt-route-private-node-nat" {
  route_table_no         = ncloud_route_table.rt-private-node.id
  destination_cidr_block = "0.0.0.0/0"
  target_type            = "NATGW"
  target_no              = var.nat_gw.id
  target_name            = var.nat_gw.name
}
