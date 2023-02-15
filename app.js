const http = require("http");
const fs = require("fs").promises;
const ws = new require("ws");
const wss = new ws.Server({ noServer: true });
const port = 5000;

const clients = new Set();

const server = http.createServer(async (req, res) => {
  if (req.url == "/") {
    try {
      let index = await fs.readFile(__dirname + "/index.html");
      res.setHeader("Content-Type", "text/html");
      res.writeHead(200);
      res.end(index);
    } catch (err) {
      res.writeHead(500);
      res.end(err);
      return;
    }
  } else if (req.url == "/wss") {
    wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onSocketConnect);
  }
});

function onSocketConnect(ws) {
  clients.add(ws);
  ws.userName = "User_" + clients.size;

  ws.on("message", async (data) => {
    let json = await data.toString();
    let info = JSON.parse(json);

    switch (info.command) {
      case "setName":
        ws.userName = info.data;
        break;
      case "message":
        for (let client of clients) {
          client.send(
            JSON.stringify({
              command: info.command,
              data: info.data,
              userName: ws.userName,
            })
          );
        }
        break;
    }
  });

  ws.on("close", function () {
    clients.delete(ws);
  });
}

server.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
