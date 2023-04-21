const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/foods');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });


// Read data.json
app.get('/api/data', (req, res) => {
  fs.readFile('data.json', (err, data) => {
    if (err) {
      res.status(500).send({ error: 'Failed to read data.json' });
    } else {
      res.send(JSON.parse(data));
    }
  });
});

// Write data.json
app.post('/api/data', upload.single('image'), (req, res) => {
    // 이미지 파일 저장 및 처리
    const image = req.file ? `/images/foods/${req.file.filename}` : null;

    const newArticle = {
        imgUrl: image,
        ...req.body,
        tag: JSON.parse(req.body.tag)

    };

    fs.readFile('data.json', 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }

        const articles = JSON.parse(data);
        const lastId = articles[articles.length - 1]?.id || 0;
        newArticle.id = lastId + 1;
        articles.push(newArticle);

        fs.writeFile('data.json', JSON.stringify(articles, null, 2), 'utf-8', (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }

            res.status(201).send('Article created successfully');
        });
    });
});
  

// Read blog.json
app.get('/api/blog', (req, res) => {
  fs.readFile('blog.json', (err, data) => {
    if (err) {
      res.status(500).send({ error: 'Failed to read blog.json' });
    } else {
      res.send(JSON.parse(data));
    }
  });
});

// Write blog.json
app.post('/api/blog', (req, res) => {
  fs.writeFile('blog.json', JSON.stringify(req.body), (err) => {
    if (err) {
      res.status(500).send({ error: 'Failed to write blog.json' });
    } else {
      res.send({ success: true });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
