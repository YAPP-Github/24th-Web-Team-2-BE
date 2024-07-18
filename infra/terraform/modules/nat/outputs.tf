output "nat_gw" {
  value = {
    id   = ncloud_nat_gateway.nat-gateway.id
    ip   = ncloud_nat_gateway.nat-gateway.public_ip
    name = ncloud_nat_gateway.nat-gateway.name
  }
}
