output "vpc_id" {
  description = "VPC의 identifier"
  value       = ncloud_vpc.main.id
}

output "subnet_id" {
  description = "Subnet의 idnetifier"
  value = {
    public_node  = ncloud_subnet.public-node.id
    public_lb    = ncloud_subnet.public-lb.id
    public_nat   = ncloud_subnet.public-nat.id
    private_node = ncloud_subnet.private-node.id
    private_lb   = ncloud_subnet.private-lb.id
  }
}
