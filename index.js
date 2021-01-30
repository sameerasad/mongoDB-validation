const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/vidly1", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected sucessfully"))
  .catch((err) => console.error("could not connect ", err));

const moviesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    /*match:/pattern/*/
  }, //validate by required property
  price: {
    type: Number,
    required: function () {
      return this.availability;
    },
    min: 10,
    max: 200,
  },
  genre: String,
  availability: { type: Boolean, required: true },
  date: { type: Date, default: Date.now },
  category: {
    type: String,
    enum: ["horror", "fiction", "drame", "action", "romance"],
    required: true,
  },
});

const Movies = mongoose.model("movies", moviesSchema);
async function createMovies() {
  const movies = new Movies({
    name: "ben askren",
    price: 11,
    availability: true,
    category: "romance",
  });

  // if any required field is missing at time of saving mongoose not allow us to save the collection so have to handle it by exception try{} catch()block
  try {
    const result = await movies.save();
    console.log(result);
  } catch (err) {
    console.log(err.message);
  }
}

createMovies();
