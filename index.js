const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/exercise", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongoDb  connected sucessfully");
  })
  .catch((err) => console.error("could not connect"));

const schema = mongoose.Schema({
  tags: [String],
  date: Date,
  name: String,

  author: String,
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model("courses", schema);

async function createCourse() {
  let course = new Course({
    tags: [],
    date,
    name,
    author,
    isPublished,
    price,
  });
  try {
    course = course.save();
    console.log(course);
  } catch (err) {
    console.log(err.message);
  }
}

createCourse();
