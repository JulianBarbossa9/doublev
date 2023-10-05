const express = require("express")

const PORT = process.env.PORT || 3001;

const app = express();




app.get("/api", (req, res) => {
  res.set('Access-Control-Allow-Origin');
  res.json({ message: "Hello from the server"});
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})




