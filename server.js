const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 2022;

const corsoption = {
    origin: 'http://localhost:2022',
}

const userRouter = require('./routes/user.routes')

app.use(cors(corsoption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", userRouter);

app.get('/', (req, res) => {
    res.status(200).send("<h1>Welcome to API</h1>");
})
app.listen(port, () => {
    console.log(" Started at http://localhost:2022");
});