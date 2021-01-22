const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/vidly1", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected sucessfully"))
  .catch((err) => console.error("could not connect ", err));

const moviesSchema = new mongoose.Schema({
  name: { type: String, required: true }, //validate by required property
  price: { type: Number, required: true },
  genre: String,
  availability: Boolean,
  date: { type: Date, default: Date.now },
});

const Movies = mongoose.model("movies", moviesSchema);
async function createMovies() {
  const movies = new Movies({
    name: "umer",
    price: 50,
  });
  // if any required field is missing at time of saving mongoose not allow us to save the collection so have to handle it by exception try{} catch()block
  await movies.validate((err) => {
    if (err) {
      console.log("there is an error in some field");
    } else {
      async function courseSave() {
        const result = await movies.save();
        console.log(result);
      }
      courseSave();
    }
  });
}

createMovies();
