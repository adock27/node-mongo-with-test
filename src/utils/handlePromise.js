module.exports = (promise, res) => {
    promise
        .then(result => {
            res.json({ data: result, status: "success" });
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
};