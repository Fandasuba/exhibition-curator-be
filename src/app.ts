import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import exhibitionRoutes from "./routes/exhibitRoutes"

const app = express();

app.use(cors());
app.use(express.json());

// User routes
app.use("/api/users", userRoutes);
app.use("/api/exhibitions", exhibitionRoutes);

export default app;