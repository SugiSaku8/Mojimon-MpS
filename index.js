const express = require("express");
const apps = express();
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
app.set("view engine", "ejs");
const cors = require("cors");
const repl = require("repl");
 const fetch = require('node-fetch');
const { app, BrowserWindow, ipcMain } = require('electron');
const { exec } = require('child_process');
const path = require('path');
const url = require('url');
let chatMessages = [];
function dofil(text) {
  // 悪い言葉のリストを定義します。
  const badWords = ["ばか", "あほ", "カス"];

  //  テキストを小文字に変換し、空白で分割して単語の配列を作成します。
  const words = text.toLowerCase().split(" ");

  // 単語が悪い言葉のリストに含まれているかどうかをチェックします。
  for (let i = 0; i < words.length; i++) {
    if (badWords.includes(words[i])) {
      // 悪い言葉が見つかった場合はfalseを返します。
      return false;
    }
  }

  // 悪い言葉が見つからなかった場合は元のテキストを返します。
  return text;
}
function kitty(cmd) {
  if (cmd === "start") {
    console.log("Kittyをスタートします");
    return true;
  } else {
    console.log(`${cmd}という引数は存在しません。`);
    return `404_kitty:${cmd} does not exist.`;
  }
}
const customCommands = {
  //構文:
  // sayHello: () => console.log('Hello, welcome to the server!'),
  kitty: (cmd) => kitty(cmd),
};
app.use(cors());
const corsOptions = {
  origin: [
    "https://mojimon.onrender.com/",
    "https://e4aa0edf-44a5-4534-bcf2-f5bd5ff79088-00-nrv22tf81lf6.kirk.replit.dev/",
  ],
  optionsSuccessStatus: 200, // For legacy browsers support
};
app.use(cors(corsOptions));
function UploadData() {
    const server = ''
    const filePath = '/olu';
    fetch(filePath)
     .then(response => response.text())
     .then(data => {
        console.log(data); // Use your data here
     })
     .catch(error => {
        console.error('Error reading file:', error);
     });
    const jsonDatas = JSON.parse(data);
    // Extract only the 'name' fields from the JSON data
    const NAMESS = jsonDatas.map((item) => item.name);
    console.log("現在登録されているユーザー一覧:\n" + NAMESS);
    var {usernames,positions} = NAMESS;
    return NAMESS;
}
UploadData();
function positiondata(Name) {
  //ログインしてからならE押したらユーザー名でてくるはずだけど。そもそもログイン画面でないし。:)?
  if (Name != undefined) {
    var jsonString = JSON.stringify(Name);
    var parsedObject = JSON.parse(jsonString);
    parsedObject = parsedObject.map((element) => {
      return {
	status: false,
	x: 10,
	y: 10,
      };
    }); //えー。どこだろ。多分index.html
    return JSON.stringify(parsedObject);
  }
}
function service() {
 /* let NameList_PO = UploadData();
  let positions = {
    そうすけ: {
      name: "そうすけ",
      status: true,
      x: 120,
      y: 220,
    },
    さくや: {
      name: "さくや",
      status: false,
      x: 10,
      y: 10,
    },
    文字もん公式: {
      name: "文字もん公式",
      status: true,
      x: 220,
      y: 250,
    },
    マリル: {
      name: "マリル",
      status: false,
      x: 10,
      y: 10,
    },
    あいうえお: {
      name: "あいうえお",
      status: false,
      x: 10,
      y: 10,
    },
    Sugisaku: {
      name: "Sugisaku",
      status: true,
      x: 1000,
      y: 2222,
    },
    Sakura: {
      name: "Sakura",
      status: false,
      x: 10,
      y: 10,
    },
    "Sakura _sibata": {
      name: "Sakura _sibata",
      status: false,
      x: 10,
      y: 10,
    },
    "18067@shimizu-ki.ed.jp": {
      name: "18067@shimizu-ki.ed.jp",
      status: false,
      x: 10,
      y: 10,
    },
    SibataSakura: {
      name: "SibataSakura",
      status: false,
      x: 10,
      y: 10,
    },
    Test: {
      name: "Test",
      status: false,
      x: 10,
      y: 10,
    },
    "AshiAshi3.14": {
      name: "AshiAshi3.14",
      status: false,
      x: 10,
      y: 10,
    },
    智晴: {
      name: "智晴",
      status: false,
      x: 10,
      y: 10,
    },
    JAXA: {
      name: "JAXA",
      status: false,
      x: 10,
      y: 10,
    },
  }; //= positiondata(NameList_PO);*/
  let livename;
  let x;
  let y;
  let status;
  apps.post("/sendxy", async (req, res) => {
    //こいつが動いてるかどうか。
    try {
      // Destructure the request body for better readability and safety
      // console.log("req.body : " + req.body)//ホントだ。おもろ。
      livename = req.body;
      livex = req.body;
      livey = req.body;
      livestatus = req.body;
      // Assuming positions is a global object that needs to be updated
      if (!positions[livename]) {
  positions[livename] = {}; // Initialize if not present
      }

      // Update the position
      positions[livename].x = x;
      positions[livename].y = y;
      positions[livename].status = status;

      // Log the updated position
      const date = new Date();
      /* console.log(
  `ポジションがアップデートされました。\n現在のポジションデータ: ${JSON.stringify(
    positions,
  )}  更新時間: ${date.toISOString().replace(/[:-]/g, "").slice(0, -5)}`,
      );*/

      // Send a success status
      res.sendStatus(200);
    } catch (error) {
      console.error("Error updating position:", error);
      res.status(500).send("Server Error");
    }
  });

  apps.get("/positions/:userId", (req, res) => {
    res.set({ "Access-Control-Allow-Origin": "*" });
    const userId = req.params.userId;
    fs.readFile(`./n/d/${userId}.moji`, "utf8", (err, jsonString) => {
      if (err) {
  console.log("File read failed:", err);

      }

      try {
  const positions = JSON.parse(jsonString);

  if (users) {
    res.json(positions);
  }
      } catch (err) {
  // console.log("Error parsing JSON string:", err);//エラーなんかよくわからないけどたまに起こるだけ
      }
    });
  });


  apps.post("/sendmessage", (req, res) => {
    try {
      let username = req.body.username;
      let message = req.body.message;
      let time = req.body.time;
      console.log(`${username}からのメッセージ:${message}`);
      try {
  let isClean = dofil(message);
  if (!isClean) {
    return res
      .status(609)
      .json({ error: "悪口が検出されました", content: message });
  } else {
    // 悪い言葉がなければchatMessages配列にメッセージを追加
    chatMessages.push({ username, message, time });
    res.json({ message: message });
  }
      } catch (err) {
  console.error(`フィルタリング中にエラーが発生しました。\nEM:${err}`);
  res
    .status(614)
    .json({ log: "フィルタリング中にエラーが発生しました。" });
      }
    } catch (error) {
      console.error("Wow.Error.:" + error);
    }
  });

  apps.get("/chathistory", (req, res) => {
    res.json(chatMessages); // Send chatHistory as JSON
  });

  //ユーザーデータ処理

  apps.use(bodyParser.json());

  apps.get("/names", (req, res) => {
    fs.readFile("./COP.json", "utf8", (err, data) => {
      if (err) {
  res.status(500).send("Error reading file");
  return;
      }
      const jsonData = JSON.parse(data);
      // Extract only the 'name' fields from the JSON data
      const names = jsonData.map((item) => item.username);
      res.json(names);
    });
  });

  apps.use(bodyParser.urlencoded({ extended: false }));

  apps.use(bodyParser.json());

  apps.use(express.static("/data/"));

  apps.get("/dashboard", function (request, response) {
    response.sendFile(__dirname + "/data/db/index.html"); //
  });

  var usernames = [];
  apps.post("/COP_save", (req, res) => {
    let data = req.body;
    //console.log(data)
    try {
      fs.readFile(`./n/d/${data.username}.moji`, "utf8", (err, jsonString) => {
  if (err) {
    console.log("File read failed:", err);
    return;
  }
  try {
    //ここstringifyにした。
    let users = JSON.stringify(jsonString);
    usernames = users.map((user) => user.username);

    if (users) {
      users = {
        x: data.x,
        y: data.y,
        time: Date.now(),
      };
    }

    // Use JSON.stringify with a replacer function to filter invalid properties
    const cleanedJson = JSON.stringify(users, (key, value) => {
      if (value === undefined) return null; // Filter out undefined values
      return value;
    });

    // Write the cleaned JSON back to the file
    fs.writeFile(`./n/d/${data.username}.moji`, cleanedJson, (err) => {
      if (err) {
        console.error("Error writing file:", err);
        res
    .status(500)
    .send(`Error saving data to ${data.username}.moji`);
      } else {
        res.status(200).send("Data received and saved.");
      }
    });
  } catch (err) {
    // console.log("Error parsing JSON string:", err);
    res.status(500).send("Error parsing existing data");
  }
      });
    } catch (err) {
      console.error("エラーが発生しました。", err);
    }
  });

  function COP_check() {
    for (var i = 0; i < usernames.length; i++) {
      fs.readFile(`./n/d/${usernames[i]}`, "utf8", (err, jsonString) => {
  if (err) {
    console.log("File read failed:", err);
    return;
  }
  try {
    var data = JSON.parse(jsonString);
    var last_time = data.time;
    if (last_time + 10000 < Date.now()) {
      data.status = false;
    } else {
      data.status = true;
    }
    // Write updated data back to file
    fs.writeFile(
      `./n/d/${usernames[i]}.json`,
      JSON.stringify(data),
      (err) => {
        if (err) throw err;
      },
    );
  } catch (err) {
    console.error("An error occurred while checking online status:", err);
  }
      });
    }
  }
  setInterval(COP_check, 1000);

  //404.500エラーに対応する
  apps.use((req, res, next) => {
    res.status(404).sendFile(__dirname + "/views/erorr/404.html");
  });

  apps.use((err, req, res, next) => {
    res.status(500).sendFile(__dirname + "/views/erorr/500.html");
  });

  apps.use((req, res, next) => {
    res.status(409).sendFile(__dirname + "/views/erorr/409.html");
  });

  apps.use((req, res, next) => {
    res.status(502).sendFile(__dirname + "/views/erorr/502.html");
  });

  //サーバーの起動
  var listener = apps.listen(3000, function () {
    console.log(
      "もじもんのサーバーは、" +
  listener.address().port +
  "で動いています!!!!!",
    );
    console.log("____________________________________________________");
    console.log("|              Mojimon Developer Shell");
    console.log("|                     起動しました。");
    console.log("|             ログはすべてここに出力されます。");
    console.log("|  起動時にエラーが出た場合は、index.jsを確認してください。");
    console.log("|                                                   ");
    console.log("|         ©Carnation Mojimon 2023-24");
    console.log("|         このサーバーは、Mojimonのサーバーです。");
    console.log("|___________________________________________________");
    const replInstance = repl.start({ prompt: ">> " });
    Object.assign(replInstance.context, customCommands);
  });
}
function APP(){
   const settingsPath = path.join(__dirname, '.settings');
   if (fs.existsSync(settingsPath)) {
      const settings = fs.readFileSync(settingsPath, 'utf-8');
      const lines = settings.split('\n');
      lines.forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
          process.env[key] = value;
        }
      });
   }
  let mainWindow;
  function createWindow() {
   mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
      },
   });
   mainWindow.loadURL(
      process.env.ifwidget ? 'http://localhost:3000/widget' : 'http://localhost:3000/dashboard'
   );
   mainWindow.on('closed', function () {
      mainWindow = null;
   });
  }

  app.on('ready', () => {
   setFixedIp();
   createWindow();
  });

  app.on('window-all-closed', function () {
   if (process.platform !== 'darwin') app.quit();
  });

  app.on('activate', function () {
   if (mainWindow === null) createWindow();
  });

  function setFixedIp() {
   const platform = process.platform;
   if (platform === 'win32') {
      // Windowsの場合のコマンド
      exec('ipconfig /all', (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
      });
   } else if (platform === 'linux') {
      // Linuxの場合のコマンド
      exec('ifconfig', (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
      });
   }
  }

}
service();
