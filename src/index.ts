import { app, port } from "@src/app.js";

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});