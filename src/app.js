// ************ express() - (don't touch) ************
const app = express();

// ************ Middlewares - (no tocar) ************
app.use(express.static(path.join(__dirname, '../public')));  // Necesario para los archivos estáticos en el folder /public
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE

// ************ Motor de plantillas - (no tocar) ************
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views')); // Define la ubicación de la carpeta de las Vistas



// ************ ESCRIBE TU CÓDIGO DESDE AQUÍ ************
// ************ El sistema de ruta requiere y usa () ************
const mainRouter = require('./routes/main'); // Rutas main
const productsRouter = require('./routes/products'); // Rutas /products

app.use('/', mainRouter);
app.use('/products', productsRouter);



// ************ NO TOQUES DESDE AQUI ************
// ************ capturar 404 y reenviar al controlador de errores ************
app.use((req, res, next) => next(createError(404)));

// ************ controlador de errores ************
app.use((err, req, res, next) => {

// establecer locales, solo proporcionando error en desarrollo
res.locals.message = err.message;
res.locals.path = req.path;
res.locals.error = req.app.get('env') === 'development' ? err : {};

// mostrar la página de error
res.status(err.status || 500);
res.render('error');
});

app.listen ("3000",() => { console.log("23 y Multer - Up")})

// ************ exporta la aplicación - no toque ************
module.exports = app;
