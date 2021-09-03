"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const memeRoute_1 = __importDefault(require("./routes/memeRoute"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./config/database"));
dotenv_1.default.config();
const port = process.env.PORT;
const connectionURL = process.env.DB_CONNECTION_URL;
const app = express_1.default();
app.use(express_1.default.json());
app.use('/api/meme', memeRoute_1.default);
database_1.default(`${connectionURL}`);
app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});
