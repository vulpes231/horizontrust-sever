const allowedOrigins = [
  "https://vestorr.netlify.app",
  "http://localhost:5173",
  "https://horizontrust.netlify.app",
  "https://horizononline.org",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  exposedHeaders: ["Access-Control-Allow-Origin"],
};

module.exports = { corsOptions };
