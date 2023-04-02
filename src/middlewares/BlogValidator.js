
const Ajv = require("ajv")
const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}

const schema = {
    type: "object",
    properties: {
        title: { type: "string" },
        body: { type: "string" },
        image: { type: "string" },
        author: { type: "string" }
    },
    required: ['title','body','image', 'author'],
    additionalProperties: false
}

const validate = ajv.compile(schema)


exports.validateBlog = (req, res, next) => {
    const isValidBlog = validate(req.body);
    if (!isValidBlog) return res.status(401).send({ msg: "Data not valid", data: validate.errors[0].message });
    next()
}