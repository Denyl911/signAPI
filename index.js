import express from 'express';
import path from 'path';
import sequelize from './config/database';
import { create, findAll } from './models/Gif';
import { single } from './config/multer';
import morgan from 'morgan';

const PORT = process.env.SIGNAPPPORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));

// Endpoint para subir GIFs
app.post('/upload', single('gif'), async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ error: 'No se ha proporcionado ningún archivo' });
    }

    if (!req.body.keyword) {
      return res.status(400).json({ error: 'Se requiere una palabra clave' });
    }

    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${
      req.file.filename
    }`;

    const gif = await create({
      keyword: req.body.keyword.toLowerCase(),
      imageUrl: imageUrl,
      originalName: req.file.originalname,
    });

    res.json({
      message: 'GIF subido exitosamente',
      gif,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para buscar GIFs por palabras
app.post('/search', async (req, res) => {
  try {
    if (!req.body.text) {
      return res
        .status(400)
        .json({ error: 'Se requiere un texto para buscar' });
    }

    const words = req.body.text.toLowerCase().split(/[\s]+/);
    const results = {};

    for (const word of words) {
      if (word.length > 0) {
        const gifs = await findAll({
          where: { keyword: word },
          attributes: ['imageUrl'],
        });

        results[word] = gifs.map((gif) => gif.imageUrl);
      }
    }

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


async function initializeServer() {
  try {
    await database.authenticate();
    await sequelize.sync({alter: true});
    console.log('Base de datos conectada y sincronizada');

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al inicializar el servidor:', error);
  }
}

initializeServer();
