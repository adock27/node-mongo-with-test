module.exports = (promise, res) => {
    promise
        .then(result => {
            res.status(200).json(...result);
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
};