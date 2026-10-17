# Arcane

Docker Compose deployment for [Arcane](https://github.com/getarcaneapp/arcane).
The Docker API is available to Arcane through a socket proxy on a private
Compose network; the proxy is not published to the host.

## Deploy

1. Ensure Docker Compose is installed and the shared `proxy` Docker network
   exists. Create it if needed with `docker network create proxy`.
2. Copy `.env.example` to `.env`.
3. Set unique secrets in `.env`. Generate them on Linux with:

   ```sh
   openssl rand -hex 16
   openssl rand -base64 32
   ```

   Use the first value for `ENCRYPTION_KEY` (32 characters) and the second for
   `JWT_SECRET`. Keep `.env` private.
4. Set `DOCKERDATA_ROOT` to a directory on the Docker host where Arcane can
   store project files and build contexts. The path must be accessible to the
   Docker daemon as well as mounted into Arcane. The default is `/dockerdata`.
5. Start Arcane from this directory:

   ```sh
   docker compose up -d
   ```

Arcane is available at `http://localhost:3552` by default. The port is bound
to loopback; set `ARCANE_BIND_ADDRESS` to an appropriate host address if
direct access from other machines is required. For reverse-proxy access,
connect the proxy to the shared `proxy` network, set `APP_URL` to the public
URL, and set `TRUSTED_PROXIES` to the proxy's IP address or CIDR range.

Persistent application data is stored in the `arcane-data` Docker volume.
Project files and build contexts are stored under
`${DOCKERDATA_ROOT}/projects` and `${DOCKERDATA_ROOT}/builds` on the host.

## Deploy to a Raspberry Pi over SSH

Docker contexts let the Docker CLI on your Windows PC send Compose commands to
the Pi over SSH; the Docker API does not need to be exposed on the network.

1. Enable SSH on the Pi and make sure Docker Engine and the Compose plugin are
   installed there. The SSH user must be able to run Docker commands. Docker
   group membership grants root-equivalent access, so use a trusted account.
2. From PowerShell, set your Pi's SSH username and hostname, then test SSH:

   ```powershell
   $PiUser = "your-user"
   $PiHost = "raspberrypi.local"
   ssh "$PiUser@$PiHost" docker info
   ```

   Set up SSH key authentication for this account if you have not already.
   Keep the private key on your PC; never put it in this repository.
3. From the `arcane` directory, create a Docker context for the Pi and confirm
   it works:

   ```powershell
   docker context create arcane-pi --docker "host=ssh://$PiUser@$PiHost"
   docker --context arcane-pi info
   ```

4. Copy `.env.example` to `.env` and set the secrets as described above. Set
   `DOCKERDATA_ROOT` to a Linux path on the Pi (for example `/dockerdata`),
   not a Windows path. Set `ARCANE_BIND_ADDRESS` to the Pi's LAN IP and
   `APP_URL` to `http://<Pi-LAN-IP>:3552` if you want to open Arcane from
   another machine on your LAN. Restrict access with your firewall or use a
   reverse proxy rather than exposing the management UI to the public internet.
5. Create the shared proxy network on the Pi if it does not already exist,
   then deploy using the remote context:

   ```powershell
   docker --context arcane-pi network create proxy
   docker --context arcane-pi compose up -d
   ```

   If a proxy on the Pi already uses the `proxy` network, skip the network
   creation command. Compose reads `.env` locally, while bind-mount paths such
   as `/dockerdata/projects` and `/dockerdata/builds` refer to paths on the Pi.
6. Check the deployment with
   `docker --context arcane-pi compose ps`. Arcane will be reachable at the
   URL configured in `APP_URL`.

With the default loopback binding, open a PowerShell SSH tunnel to use Arcane
from your PC without exposing its UI on the LAN:

```powershell
$PiUser = "your-user"
$PiHost = "raspberrypi.local"
$SshPort = 22
ssh -F none -N -L 3552:127.0.0.1:3552 -p $SshPort "$PiUser@$PiHost"
```

Keep the tunnel running and browse to `http://localhost:3552`. `-F none`
bypasses your local SSH config; omit it if that config is valid and you need
its settings.
