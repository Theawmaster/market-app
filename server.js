const express = require("express");
const database = require("./database");
const app = express();

app.use(express.json());
const itemsRoute = require("./routes/itemsRoute");
const userRoute = require("./routes/userRoute");
const billsRoute = require("./routes/billsRoute");
app.use("/api/items/", itemsRoute);
app.use("/api/users/", userRoute);
app.use("/api/bills/", billsRoute);
const path = require("path");

if (process.env.NODE_ENV === "production")
{
    app.use("/" , express.static("client/build"));
    app.get("*", (req, res) =>
    {
        res.sendFile(path.resolve(__dirname, "client/build/index.html"));
    })
}

const port = process.env.PORT || 8000; // Since client is using 3000

app.get("/", (req, res) => res.send("Hello World"));
app.listen(port, () => console.log(`Nodejs server is running on port ${port}`));
