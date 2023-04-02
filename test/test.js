
const chai = require("chai");
const request = require('supertest');
const app = require("../src/app");
const Blog = require("../src/models/Blog");
const expect = chai.expect;


describe('Blog Colettion', () => {
    it('Should clear all data from Blog Collection', (done) => {
        Blog.deleteMany({}).then(() => {
            done();
        });

    });

});

describe('GET /blogs', () => {
    it('should return all blogs', (done) => {
        request(app)
            .get('/api/blogs')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.statusCode).to.equal(200);

                expect(res._body.data).to.be.an('array');
                done();
            });
    });
});


describe('POST /api/blogs', () => {
    it('should insert a new blog', (done) => {
        const newBlog = {
            title: 'OK',
            body: 'OK',
            image: 'OK',
            author: '641fa38bef4c8f9e3fac3461'
        };
        request(app)
            .post('/api/blogs')
            .send(newBlog)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.an('object');
                expect(res.body.data.title).to.equal(newBlog.title);
                expect(res.body.data.body).to.equal(newBlog.body);
                expect(res.body.data.image).to.equal(newBlog.image);
                done();
            });
    });
});


describe("GET /:id", () => {
    it('should get a blog by id', async () => {
        // Crear un blog
        const blog = new Blog({
            title: 'OK',
            body: 'OK',
            image: 'OK',
            author: '641fa38bef4c8f9e3fac3461'
        });
        await blog.save();

        // Hacer una solicitud GET para obtener el blog por su ID
        const res = await request(app)
            .get(`/api/blogs/${blog._id}`);

        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data.title).to.equal(blog.title);
        expect(res.body.data.body).to.equal(blog.body);
        expect(res.body.data.image).to.equal(blog.image);

    })
});


describe("PUT /:id", () => {
    it('should update a blog by id', async () => {
        // Crear un blog
        const blog = new Blog({
            title: 'Blog de prueba',
            body: 'Contenido de prueba',
            image: 'Contenido de prueba',
            author: '641fa38bef4c8f9e3fac3461'
        });
        await blog.save();

        // Hacer una solicitud GET para obtener el blog por su ID
        await request(app)
            .put(`/api/blogs/${blog.id}`).send({
                title: "The first blog was updated by 100",
                body: "This is a blog post",
                image: "it works",
            });

        const res = await request(app)
            .get(`/api/blogs/${blog.id}`);

        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('success');

    })
});

describe("DELETE /:id", () => {
    it('should delete a blog by id', async () => {
        // Crear un blog
        const blog = new Blog({
            title: 'Blog de prueba eliminar',
            body: 'Contenido de prueba',
            image: 'Contenido de prueba',
            author: '641fa38bef4c8f9e3fac3461'
        });
        await blog.save();

        // Hacer una solicitud GET para obtener el blog por su ID
        await request(app)
            .delete(`/api/blogs/${blog.id}`);

        const res = await request(app)
            .get(`/api/blogs/${blog.id}`);

        // Comprobar que la respuesta es exitosa y que el blog se haya eliminado correctamente
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('success');

        // Comprobar que el blog se haya eliminado de la base de datos
        const deletedBlog = await Blog.findById(blog.id);
        expect(deletedBlog).to.be.null;

    })
});