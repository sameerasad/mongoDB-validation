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
    get: (v) => Math.round(v), //when we read the propert price it will be round due to get mwthod
    set: (v) => Math.round(v), // when we save the price it will rounded due to set method
  },
  genre: String,
  availability: { type: Boolean, required: true },
  date: { type: Date, default: Date.now },
  category: {
    type: String,
    enum: ["horror", "fiction", "drama", "action", "romance", "comedy"],
    required: true,
    trim: true,
    lowercase: true,
    //uppercase:true
  },
  tags: {
    type: Array,
    validate: {
      validator: function (v) {
        return v && v.length > 0;
      },
      message: "a movie should have atleast one tag",
    },
  },
});

const Movies = mongoose.model("movies", moviesSchema);
async function createMovies() {
  const movies = new Movies({
    name: "ben askren pagal",

    price: 11.8,
    availability: true,
    category: "DRAMa",
    tags: "borring",
  });

  // if any required field is missing at time of saving mongoose not allow us to save the collection so have to handle it by exception try{} catch()block
  try {
    const result = await movies.save();
    console.log(result);
  } catch (ex) {
    //ex exception a property errors
    for (field in ex.errors) {
      console.log(ex.errors[field].message);
    }
  }
}

async function getMovies() {
  const movies = await Movies.find({ name: "ben askren pagal1" });
  console.log(movies[0].price);
}

getMovies();
