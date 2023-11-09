const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://HerbillonMia:68Nr575aB7iSJnxd@herbillonmia.vsxvity.mongodb.net/Eurydice",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const tableauRoute = require("./Routes/Tableau");
const colonneRoute = require("./Routes/Colonne")
const noteRoute = require("./Routes/Note")
app.use(tableauRoute);
app.use(colonneRoute)
app.use(noteRoute)

app.get('*', (req, res) => {
  res.json({ message: "Cette route n'existe pas" });
});

const PORT = 3010;
app.listen(PORT, () => {
  console.log(`👩🏻‍💻 Server is running on port ${PORT}`);
});