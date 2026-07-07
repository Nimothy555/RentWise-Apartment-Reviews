terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0"
    }
  }
}

provider "docker" {
  host = "npipe:////.//pipe//docker_engine"
}

resource "docker_image" "rentwise" {
  name         = "apartment-reviews-app:latest"
  keep_locally = true
}

resource "docker_container" "rentwise" {
  name  = "rentwise-terraform"
  image = docker_image.rentwise.image_id

  ports {
    internal = 3000
    external = 3001
  }

  env = [
    "NODE_ENV=production",
    "PORT=3000"
  ]

  restart = "unless-stopped"
}

output "app_url" {
  value = "http://localhost:3001"
}
