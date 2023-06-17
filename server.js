const express = require("express");
const database = require("./database");
const app = express();

app.use(express.json());
const itemsRoute = require("./routes/itemsRoute");
const userRoute = require("./routes/userRoute");
app.use("/api/items/", itemsRoute);
app.use("/api/users/", userRoute);

const port = 8000; // Since client is using 3000

app.get("/", (req, res) => res.send("Hello World"));
app.listen(port, () => console.log(`Nodejs server is running on port ${port}`));
