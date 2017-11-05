const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server.js');
const heroes = require('../state.js').heroes;
chai.use(chaiHttp);

describe('hero router', () => {
    describe('GET /', () => {
        it('should return heroes state', (done) => {
            chai.request(app).get('/heroes').end((err, res) => {
                expect(res.body[0].name).to.eq(heroes[0].name);
                expect(res.body).to.have.lengthOf(2);
                done();
            });
        });

        it('should add a heroe to the state', (done) => {
            chai.request(app).post('/heroes').send({ id: 3, name: 'Hero3' }).end((err, res) => {
                expect(res.body[2].name).to.eq('Hero3');
                expect(res.body).to.have.lengthOf(3);
                done();
            });
        });

        it('should delete a heroe to the state', (done) => {
            chai.request(app).delete('/heroes?name=Hero3').end((err, res) => {
                expect(res.body).to.have.lengthOf(2);
                done();
            });
        });

        it('should not find any hero to delete', (done) => {
            chai.request(app).delete('/heroes?name=HeroUndefined').end((err, res) => {
                expect(res.body).to.have.lengthOf(2);
                done();
            });
        });

        it('should return specific hero', (done) => {
            chai.request(app).get('/heroes/1').end((err, res) => {
                expect(res.body[0].name).to.eq(heroes[0].name);
                expect(res.body).to.have.lengthOf(1);
                done();
            });
        });

        it('should update specific hero', (done) => {
            chai.request(app).put('/heroes/1').send({ id: 1, name: 'newName' }).end((err, res) => {
                expect(res.body[0].name).to.eq('newName');
                expect(res.body).to.have.lengthOf(2);
                done();
            });
        });

        it('should insert new hero', (done) => {
            chai.request(app).put('/heroes/20').send({ id: 20, name: 'name20' }).end((err, res) => {
                expect(res.body[res.body.length - 1].name).to.eq('name20');
                expect(res.body).to.have.lengthOf(3);
                done();
            });
        });

        it('should delete specific hero', (done) => {
            chai.request(app).delete('/heroes/1').end((err, res) => {
                expect(res.body[0].name).to.not.eq(heroes[0].name);
                expect(res.body).to.have.lengthOf(2);
                done();
            });
        });
    });
});
