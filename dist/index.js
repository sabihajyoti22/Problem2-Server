"use strict";
const app = require("./app");
const PORT = require("./Config/config").app.port;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
