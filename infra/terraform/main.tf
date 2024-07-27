module "vpc" {
  source = "./modules/vpc"

  zone         = var.zone
  service_name = var.service_name
}


module "server" {
  source = "./modules/server"

  zone         = var.zone
  service_name = var.service_name

  vpc_id    = module.vpc.vpc_id
  subnet_id = module.vpc.subnet_id
}

module "load-balancer" {
  source = "./modules/load-balancer"

  zone         = var.zone
  service_name = var.service_name
  target_port  = var.facing_port

  vpc_id                  = module.vpc.vpc_id
  subnet_id               = module.vpc.subnet_id
  temp_server_instance_no = module.server.temp_server_instance_no
}

### Kubernetes로 이전할 때 주석 제거 
# module "nks" {
#   source = "./modules/nks"

#   zone         = var.zone
#   service_name = var.service_name

#   vpc_id    = module.vpc.vpc_id
#   subnet_id = module.vpc.subnet_id
# }
