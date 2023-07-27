import { app, port } from "@src/app.js";

// Please check if you setup all dotenv variables

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));