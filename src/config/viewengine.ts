import express from "express";
const path = require("path");
const configViewEngine = (app) => {
    app.set('view engine', 'ejs');
    app.set('views', 'src/views');
    app.use(express.static(path.join("public")));
};

export default configViewEngine;
