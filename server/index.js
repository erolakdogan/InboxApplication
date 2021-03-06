const app = require('express')()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
    } else {
        console.log(`${req.ip} ${req.method} ${req.url}`);
        next();
    }
})

yaml = require('js-yaml');
fs = require('fs');
jsonOjbect = yaml.safeLoad(fs.readFileSync('./files/emails.yaml', 'utf8'));

function ContainsKeyValue(obj, key, value) {
    if (obj[key] === value) return obj[key];
    for (all in obj) {
        if (obj[all] != null && obj[all][key] === value) {
            return obj[all];
        }
        if (typeof obj[all] == "object" && obj[all] != null) {
            var found = ContainsKeyValue(obj[all], key, value);
            if (found) return found;
        }
    }
}

app.get('/api/', (req, res) => {
    try   {
      res.json({
        messages: jsonOjbect.messages
            })
    } catch (e) {
        console.log(e);
    }
})

app.get('/api/', (req, res) => {
    try {
        var searchMenu = req.query.searchMenu;

        var result = ContainsKeyValue(jsonOjbect, "name", searchMenu);


        res.json({
            message: result
        })
    } catch (e) {
        console.log(e);
    }
})


// Uygulama 3000 portundan çalışacak.
app.listen(3000)