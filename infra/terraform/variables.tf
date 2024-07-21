variable "ncp_access_key" {
  type = string
}

variable "ncp_secret_key" {
  type = string
}

variable "service_name" {
  type    = string
  default = "imc"
}

variable "zone" {
  type        = string
  description = "availability zone"
  default     = "KR-1"
}

variable "facing_port" {
  type        = number
  description = "Gateway service의 Port number"
  default     = 3000
}
