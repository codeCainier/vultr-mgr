const startupScript = `
#!/bin/sh

# NOTE: This is an example that sets up SSH authorization. To use it, you'd need to replace "ssh-rsa AA... youremail@example.com" with your SSH public.
# You can replace this entire script with anything you'd like, there is no need to keep it

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
  - PASSWORD=codeMaster.95
 # docker exec -it v2ray /bin/sh -c 'cat /etc/v2ray/config.json'
 v2ray:
  image: "v2ray/official"
  container_name: v2ray
  ports:
  - "8001:8001"
  - "8001:8001/udp"
' > /root/docker-compose.yml

# Create Docker Container
docker-compose -f /root/docker-compose.yml up -d



# mkdir -p /root/.ssh
# chmod 600 /root/.ssh
# echo ssh-rsa AA... youremail@example.com > /root/.ssh/authorized_keys
# chmod 700 /root/.ssh/authorized_keys
`