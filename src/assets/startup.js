import tools from 'src/utils'

export default password => tools.base64En(`
#!/bin/sh
# Update apt-get
apt-get update

# Install Docker
apt-get -y install docker.io

# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/download/1.27.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# Chmod
chmod +x /usr/local/bin/docker-compose

# Echo Docker Compose YML File
echo 'version: "2"
services:
 shadowsocks:
  image: shadowsocks/shadowsocks-libev
  container_name: shadowsocks
  ports:
  - "8388:8388"
  - "8388:8388/udp"
  environment:
  - PASSWORD=${password}
 # docker exec -it v2ray /bin/sh -c 'cat /etc/v2ray/config.json'
 v2ray:
  image: "v2ray/official"
  container_name: v2ray
  ports:
  - "8001:8001"
  - "8001:8001/udp"
' > /root/docker-compose.yml

# Create Docker Container
docker-compose -f /root/docker-compose.yml up -d`)