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
    maxlength: 10 /*match:/pattern/*/,
  }, //validate by required property
  price: {
    type: Number,
    required: function () {
      return this.availability;
    },
    minimum: 100,
    maximum: 200,
  },
  genre: String,
  availability: Boolean,
  date: { type: Date, default: Date.now },
});

const Movies = mongoose.model("movies", moviesSchema);
async function createMovies() {
  const movies = new Movies({
    name: "harry welcome2",
    price: 40,
    availability: true,
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
