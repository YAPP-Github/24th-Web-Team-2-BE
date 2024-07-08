variable "service_name" {}
variable "zone" {}

variable "cidr_block" {
  type        = string
  description = "CIDR block range"
  default     = "10.0.0.0/16"
}

