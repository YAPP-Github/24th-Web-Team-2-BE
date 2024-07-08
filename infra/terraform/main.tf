module "vpc" {
  source = "./modules/vpc"

  zone         = var.zone
  service_name = var.service_name
}
