import express from 'express'
import methodOverride from 'method-override';
import appRoutes from './routes/flashCardRoutes.js'
import path from "path"

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), "public")));

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));

const loggingMiddleware = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
};
app.use(loggingMiddleware);  

// Overrides the methods and adds support for PUT, PATCH, & DELETE
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      const method = req.body._method;
      delete req.body._method;
      return method;
    }
}));

app.use('/', appRoutes);

app.use((req, res) => {
    res.status(400).send('Page Not Found');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});