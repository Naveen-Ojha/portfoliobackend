const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://naveenojha:naveenojha@cluster0.cdmku.mongodb.net/portfolio?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch((error) => {
    console.log("Connection error", error);
  });
