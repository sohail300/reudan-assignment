import express from "express";
import catalystSDK from "zcatalyst-sdk-node";
import { taskSchema } from "./utils/taskSchema.js";
import { tableID } from "./utils/config.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  const catalyst = catalystSDK.initialize(req);
  res.locals.catalyst = catalyst;
  next();
});

app.get("/", (req, res) => {
  res.status(200).send({
    success: true,
    data: {
      message: "Welcome to the Catalyst Task Manager API!",
    },
  });
});

app.get("/api/tasks", async (req, res) => {
  try {
    console.log("-----GET TASK-----");
    const { catalyst } = res.locals;
    const result = await catalyst.datastore().table(tableID).getAllRows();

    console.log(result);
    const tasks = result.map((row) => ({
      id: row.ROWID,
      title: row.Title,
      description: row.Description,
      status: row.Status,
    }));

    res.status(200).send({
      success: true,
      data: {
        tasks,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "We're unable to process the request.",
    });
  }
});

app.post("/api/tasks", async (req, res) => {
  try {
    console.log("-----POST TASK-----");
    const parsedInput = taskSchema.safeParse(req.body);
    if (!parsedInput.success) {
      return res.status(400).send({
        success: false,
        message: "Invalid input data.",
      });
    }
    const { title, description, status } = parsedInput.data;
    const { catalyst } = res.locals;

    const table = await catalyst.datastore().table(tableID);

    const result = await table.insertRow({
      Title: title,
      Description: description,
      Status: status,
    });

    console.log(result);
    res.status(200).send({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "We're unable to process the request.",
    });
  }
});

app.put("/api/tasks/:ROWID", async (req, res) => {
  try {
    console.log("-----PUT TASK-----");
    const parsedInput = taskSchema.safeParse(req.body);
    if (!parsedInput.success) {
      return res.status(400).send({
        success: false,
        message: "Invalid input data.",
      });
    }
    const { title, description, status } = parsedInput.data;
    const { ROWID } = req.params;

    const { catalyst } = res.locals;
    const table = await catalyst.datastore().table(tableID);

    const result = await table.updateRow({
      Title: title,
      Description: description,
      Status: status,
      ROWID: ROWID,
    });

    console.log(result);
    res.status(200).send({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "We're unable to process the request.",
    });
  }
});

app.delete("/api/tasks/:ROWID", async (req, res) => {
  try {
    console.log("-----DELETE TASK-----");
    const { ROWID } = req.params;

    const { catalyst } = res.locals;
    const table = await catalyst.datastore().table(tableID);

    const result = await table.deleteRow(ROWID);

    console.log(result);
    res.status(200).send({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "We're unable to process the request.",
    });
  }
});

export default app;
