import { app, port } from "@src/app.js";
import { AppDataSource } from "@src/db.js";

// Please check if you setup all dotenv variables

await AppDataSource.initialize()
.then(() => console.log("DB Connected"))
.catch((e) => console.log(e));

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));