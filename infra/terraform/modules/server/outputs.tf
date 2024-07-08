output "temp_server_instance_no" {
  value = ncloud_server.temp-server.instance_no
}

output "temp_server_public_ip" {
  value = ncloud_public_ip.temp-server-public-ip.public_ip
}
