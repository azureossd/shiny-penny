const express = require('express');
var path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', './views');
app.set('view engine', 'pug');

const wp = require('./scripts/wordpress');

app.get('/', (req, res) => {
    res.send('Hello Welcome to the jungle!')
});

app.get('/wordpress-install/199fe551-4087-4034-95ec-af6b3248d65c', (req, res) => {
    res.render('wordpress/index');
});

app.post('/wordpress-install/199fe551-4087-4034-95ec-af6b3248d65c', async(req, res) => {
    if(req.body.siteName !== "" || null){
        try {
            const siteName = req.body.siteName;
            await wp.runInstall(siteName);
            res.render('wordpress/success', {
                url: `https://${siteName}.azurewebsites.net/wp-login.php`
            });
        }
        catch(err) {
            console.log(err);
            res.render('wordpress/error', {
                message: "Install failed or incomplete."
            });
        }
    } else {
        res.status(403).render('wordpress/error', {
            message: 'Site Name was not provided.'
        });
    }
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});