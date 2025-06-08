import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import exhibitionRoutes from "./routes/exhibitRoutes";
import itemRoutes from "./routes/itemRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/exhibitions", exhibitionRoutes);
app.use("/api/items", itemRoutes);


const PORT = Number(process.env.PORT) || 3001;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;