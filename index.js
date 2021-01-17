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

async function updateCourse(id) {
  //1st
  // querry first approach
  //find the courseById()
  //modify its properties
  //save()

  //2nd
  //update first
  //update directly
  // optionally get the updated document as well
  //let use 1st approach

  let course = await Course.findById(id);
  //if there is no course with the give id then immediately return it
  if (!course) return;
  course.isPublished = false;
  course.author = "another author";

  result = await course.save();
  console.log(result);
}

updateCourse("5ffeede9a5a59c113fe3a611");
