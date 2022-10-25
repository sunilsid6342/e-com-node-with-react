const express = require("express")
const cors = require('cors')
const app = express()
require('./db/config')
const Products = require('./db/Products')
const User = require('./db/User')
const Jwt = require("jsonwebtoken")
const jwtKey = 'e-comm'
const multer = require('multer')
const upload = multer({ dest: 'upload/' })

app.use(express.json())
app.use(cors())

app.post('/register', async (req, resp) => {
    console.log(req.body);
    let user = new User(req.body);
    let result = await user.save();
    Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
            resp.send({ msg: "No user found" });
        }
        resp.send({ result, auth: token });
    });
});

app.post('/login', async (req, resp) => {

    if (req.body.email && req.body.password) {
        let user = await User.findOne(req.body).select("-password")
        if (user) {
            Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    resp.send({ result: "No user found" });
                }
                resp.send({ user, auth: token });
            });

        }
        else {
            resp.send({ result: "No result Found" })
        }

    }
    else {
        resp.send({ result: "No result Found" })
    }

});

app.post("/add-product", upload.single('images'), verifyToken, async (res, resp) => {
    let name = res.body.name;
    let price = res.body.price;
    let category = res.body.category;
    let userId = res.body.userId;
    let company = res.body.company;
    let img = res.body.images;
    console.log(res.file);
    let product = new Products({ name: name, price: price, category: category, userId: userId, company: company, image: img });
    let result = await product.save();
    resp.send(result);
});


app.get("/product-list", verifyToken, async (res, resp) => {
    let list = await Products.find();
    if (list.length > 0) {
        resp.send(list);
    }
    else {
        resp.send({ result: "No record found" });
    }
});


app.delete("/product/:id", verifyToken, async (req, resp) => {
    const result = await Products.deleteOne({ _id: req.params.id });
    resp.send(result);
});

app.get("/product/:id", verifyToken, async (req, resp) => {
    const result = await Products.findOne({ _id: req.params.id });
    if (result) {
        resp.send(result);
    }
    else {
        resp.send({ result: "No record found" });
    }
});

app.put("/product/:id", verifyToken, async (req, resp) => {
    const result = await Products.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    )
    resp.send(result);

});

app.get("/search/:key", verifyToken, async (req, resp) => {
    let result = await Products.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { category: { $regex: req.params.key } },
            { price: { $regex: req.params.key } },
            { company: { $regex: req.params.key } }
        ]
    })

    resp.send(result);
});



function verifyToken(req, resp, next) {
    let token = req.headers['authorization'];
    if (token) {
        token = token.split(' ')[1];
        Jwt.verify(token, jwtKey, (err, valid) => {
            if (err) {
                resp.status(404).send({ result: "please provide valid token" });
            } else {
                next();
            }
        });
    } else {
        resp.status(403).send({ result: "please add token with headers" })
    }

}


app.listen(5000);