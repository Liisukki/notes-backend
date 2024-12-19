const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://liisukotilainen:${password}@cluster0.4g73b.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

const note = new Note({
  content: "Mongoose makes things easy",
  important: true,
});

/* note
  .save()
  .then(() => {
    console.log("note saved!");
    mongoose.connection.close();
  })
  .catch((error) => {
    console.log("Error saving note:", error.message);
    mongoose.connection.close();
  });*/

Note.find({}).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});
