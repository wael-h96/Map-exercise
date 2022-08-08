import express from "express";
import cors from "cors";
import "dotenv/config";
import { Client } from "@elastic/elasticsearch";

const app = express();
const PORT = process.env.PORT | 8080;
const router = express.Router();

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(express.json());

const client = new Client({
  cloud: {
    id: process.env.CLOUD_ID,
  },
  auth: {
    username: process.env.ELASTIC_USERNAME,
    password: process.env.ELASTIC_PASSWORD,
  },
});

router.post("/save-coordinate", (req, res) => {
  const { body } = req;

  client.index({
    index: "map-coordinates",
    body: body,
  });

  res.status(200).json(body);
});

router.get("/get-coordinates", async (req, res) => {
  try {
    const {
      hits: { hits },
    } = await client.search({
      index: "map-coordinates",
    });
    res.json(hits);
  } catch (err) {
    res.json(err);
  }
});

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
