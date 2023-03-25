export default class HttpResponse {
    constructor() {}

    response(promise, req, res) {
        promise.then(answer => {
            res.status(200).send(answer);
        })
        .catch((error) => {
            res.status(500).send({
                msg: "Server internal error",
                status: true
            });
        });
    }
}
