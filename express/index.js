const express = require("express");

const app = express();
const port = 3030;

app.get("/", (req, res) => {
  console.log("root request");
  res.send("<h1>welcome hp</h1>");
});

app.get("/r/:subreddit/:postId", (req, res) => {
  const { subreddit, postId } = req.params;
  console.log(req.params);
  res.send(`Viewing post id: ${postId}, ${subreddit} subreddit!!`);
});

app.get("/greeting", (req, res) => {
  console.log("greeting request");
  res.send("<h1>hello world!!!</h1>");
});

app.post("/greeting", (req, res) => {
  console.log("greeting request post");
  res.send("post request to greeting");
});

app.get("/search", (req, res) => {
  const { q } = req.query;
  if (!q) {
    res.send("nothing found search");
  }
  res.send(`<h1>${q}</h1>`);
});

app.get("*", (req, res) => {
  res.send("i don't know that path... please check");
});
// get 요청의 가장 아래에 둘 것!!

// app.use((req, res) => {
//   console.log("we got a new request");
//   res.send("<h1>hello, thank you for your request</h1>");
//   // console.dir(req.path);
// });

app.listen(port, () => {
  console.log("hello world 3030!");
});

// app.get('/') {

// }
