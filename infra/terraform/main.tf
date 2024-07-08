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
