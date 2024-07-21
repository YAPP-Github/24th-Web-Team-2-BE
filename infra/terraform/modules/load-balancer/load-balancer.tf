
resource "ncloud_lb" "alb" {
  name           = "${var.service_name}-alb"
  network_type   = "PUBLIC"
  type           = "APPLICATION"
  subnet_no_list = [var.subnet_id.public_lb]
}

resource "ncloud_lb_target_group" "alb-tg" {
  name           = "${var.service_name}-alb-tg"
  vpc_no         = var.vpc_id
  protocol       = "HTTP"
  target_type    = "VSVR"
  port           = var.target_port
  algorithm_type = "RR"
  # TODO: Health Check configuration 추가
  health_check {
    protocol       = "HTTP"
    http_method    = "GET"
    port           = var.target_port
    url_path       = "/"
    cycle          = 30
    up_threshold   = 2
    down_threshold = 2
  }
}

resource "ncloud_lb_listener" "alb-listener-http" {
  load_balancer_no = ncloud_lb.alb.load_balancer_no
  protocol         = "HTTP"
  port             = 80
  target_group_no  = ncloud_lb_target_group.alb-tg.target_group_no
}

### Domain 구매 + Certificate Manager로 tls 적용 후 주석 제거
# resource "ncloud_lb_listener" "alb-listener-https" {
#   load_balancer_no = ncloud_lb.alb.load_balancer_no
#   protocol         = "HTTPS"
#   port             = 443
#   target_group_no  = ncloud_lb_target_group.alb-tg.target_group_no
# }

resource "ncloud_lb_target_group_attachment" "alb-tg-attachment" {
  target_group_no = ncloud_lb_target_group.alb-tg.target_group_no
  target_no_list  = [var.temp_server_instance_no]
}
