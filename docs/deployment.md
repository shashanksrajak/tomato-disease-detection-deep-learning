To deploy the server on a cloud server e.g. EC2 instance on AWS, follow these steps 
1. Clone this repo on the server
2. go to dir `backend` in the repo
3. Try out the server is running as expected with these commands
`uv sync` and `uv run main.py`
4. If the server is running fine, close it and create a systemd service to keep the server running even after you close the terminal

```sh

```sh


sudo vim /etc/systemd/system/tomato_disease.service




[Unit]
Description=tomato_disease
After=network.target

[Service]
User=ubuntu
WorkingDirectory=/home/ubuntu/tomato_disease/backend
ExecStart=/home/ubuntu/.local/bin/uv run main.py
Restart=on-failure
StandardOutput=append:/var/log/myapp.log
StandardError=append:/var/log/myapp.log

[Install]
WantedBy=multi-user.target




sudo systemctl enable tomato_disease.service

sudo systemctl start tomato_disease.service

sudo systemctl status tomato_disease.service

sudo journalctl -u tomato_disease.service

```
