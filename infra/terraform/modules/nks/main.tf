data "ncloud_nks_versions" "version" {
  filter {
    name   = "value"
    values = ["1.27"]
    regex  = true
  }
}

resource "ncloud_login_key" "login-key" {
  key_name = "${var.service_name}-login-key"
}

resource "ncloud_nks_cluster" "cluster" {
  name                 = "${var.service_name}-cluster"
  cluster_type         = "SVR.VNKS.STAND.C002.M008.NET.SSD.B050.G002"
  k8s_version          = data.ncloud_nks_versions.version.versions.0.value
  login_key_name       = ncloud_login_key.login-key.key_name
  lb_private_subnet_no = var.subnet_id.private_lb
  lb_public_subnet_no  = var.subnet_id.public_lb
  kube_network_plugin  = "cilium"
  subnet_no_list       = [var.subnet_id.private_node]
  vpc_no               = var.vpc_id
  zone                 = var.zone
  log {
    audit = true
  }
}

resource "ncloud_nks_node_pool" "node_pool" {
  cluster_uuid   = ncloud_nks_cluster.cluster.uuid
  node_pool_name = "${var.service_name}-node-pool"
  node_count     = 2
  product_code   = "SVR.VSVR.STAND.C002.M008.NET.SSD.B050.G002"
  subnet_no_list = [var.subnet_id.private_node]
}
