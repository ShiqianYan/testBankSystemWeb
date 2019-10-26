const chai = require("chai");
const server = require("../bin/www");
const expect = chai.expect;
const request = require("supertest");
const _ = require("lodash");

let validID;

describe("bankSystemWeb", () => {
    describe("GET /user", () => {
        it('should return all users', done => {
            request(server)
                .get("/user")
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .end((err, res) => {
                    try {
                        expect(res.body).to.be.a("array")
                        expect(res.body.length).to.equal(4)
                        let result = _.map(res.body, user => {
                            return {
                                _id: user._id,
                                name: user.name,
                                userName: user.userName,
                                cardNumber: user.cardNumber,
                                phoneNumber: user.phoneNumber
                            }
                        })
                        expect(result).to.deep.include({
                            _id: "5db3307c1c9d440000ff784b",
                            name: "Camille",
                            userName: "876212493@gmail.com",
                            cardNumber: "2356876065282137",
                            phoneNumber: "0892347642"
                        });
                        expect(result).to.deep.include({
                            _id: "5db330cf1c9d440000ff784d",
                            name: "Bob",
                            userName: "123456789@gmail.com",
                            cardNumber: "0948447639175421",
                            phoneNumber: "0237857567"
                        });
                        expect(result).to.deep.include({
                            _id: "5db331101c9d440000ff784f",
                            name: "Arila",
                            userName: "235299211@163.com",
                            cardNumber: "6750426952807546",
                            phoneNumber: "0769673521"
                        });
                        expect(result).to.deep.include({
                            _id: "5db333d66d2856393cb661ec",
                            name: "Jack",
                            userName: "314532592@wit.ie",
                            cardNumber: "3827305806378854",
                            phoneNumber: "0874758092"
                        });
                        done()
                    } catch (e) {
                        done(e)
                    }
                })
        });
    })
    describe("GET /user/:id", () => {
        describe("When the id is valid", () => {
            it('should return the specific user', done => {
                request(server)
                    .get('/user/5db3307c1c9d440000ff784b')
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .end((err, res) => {
                        expect(res.body).to.deep.include({
                            _id: "5db3307c1c9d440000ff784b",
                            name: "Camille",
                            userName: "876212493@gmail.com",
                            cardNumber: "2356876065282137",
                            phoneNumber: "0892347642"
                        })
                        done(err)
                    })
            });
        })
        describe("When the id is invalid", () => {
            it('should return the Not Found message', done => {
                request(server)
                    .get('/user/1243314314')
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .end((err, res) => {
                        expect(res.body).to.deep.include({
                            "message": "User Not Found"
                        })
                        done(err)
                    })

            });
        })
    })
    describe("POST /user", () => {
        it('should return confirmation message and update database', function () {
            const user = {
                name: "Apple",
                userName: "32325323@wit.ie",
                cardNumber: "9729383298302332",
                phoneNumber: "0295308720"
            };
            return request(server)
                .post('/user')
                .send(user)
                .then(res => {
                    expect(res.body.message).equals("User Added Successfully");
                    validID = res.body.data._id
                })
        });
        after(() => {
            return request(server)
                .get(`/user/${validID}`)
                .then(res => {
                    expect(res.body).to.deep.include({
                        name: "Apple",
                        userName: "32325323@wit.ie",
                        cardNumber: "9729383298302332",
                        phoneNumber: "0295308720"
                    })
                })
        })
    })
    describe("DELETE /user/:id", () => {
        describe("When the id is valid", () => {
            it('should return the confirmation message and delete the user', () => {
                return request(server)
                    .delete(`/user/${validID}`)
                    .then(res => {
                        expect(res.body).to.include({
                            "message": "User Deleted Successfully"
                        })
                    })
            });
            after(() => {
                return request(server)
                    .get('/user')
                    .then(res => {
                        expect(res.body.length).equals(4);
                    })
            })
        });
        describe("When the id is invalid", () => {
            it('should return the Not Found message', () => {
                return request(server)
                    .delete("/user/12433142314")
                    .then(res => {
                        expect(res.body).to.include({
                            "message": "User Not Deleted"
                        })
                    })
            });
        })
    })
    describe("GET /card", () => {
        it('should return all cards', done => {
            request(server)
                .get("/card")
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .end((err, res) => {
                    try {
                        expect(res.body).to.be.a("array")
                        expect(res.body.length).to.equal(4)
                        let result = _.map(res.body, card => {
                            return {
                                _id: card._id,
                                cardNumber: card.cardNumber,
                                EURBalance: card.EURBalance,
                                CNYBalance: card.CNYBalance,
                                password: card.password
                            }
                        })
                        expect(result).to.deep.include({
                            _id: "5db367af1c9d4400005ea2e9",
                            cardNumber: "2356876065282137",
                            EURBalance: 1300,
                            CNYBalance: 900,
                            password: "245032"
                        });
                        expect(result).to.deep.include({
                            _id: "5db343801c9d4400005ea2d1",
                            cardNumber: "0948447639175421",
                            EURBalance: 1300,
                            CNYBalance: 1283,
                            password: "123456"
                        });
                        expect(result).to.deep.include({
                            _id: "5db343ad1c9d4400005ea2d3",
                            cardNumber: "6750426952807546",
                            EURBalance: 1000,
                            CNYBalance: 900,
                            password: "123422"
                        });
                        expect(result).to.deep.include({
                            _id: "5db3433c1c9d4400005ea2cf",
                            cardNumber: "3827305806378854",
                            EURBalance: 91,
                            CNYBalance: 300,
                            password: "786215"
                        });
                        done()
                    } catch (e) {
                        done(e)
                    }
                })
        });
    })
    describe("GET /card/:id", () => {
        describe("When the id is valid", () => {
            it('should return the specific card', done => {
                request(server)
                    .get('/card/5db3433c1c9d4400005ea2cf')
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .end((err, res) => {
                        expect(res.body).to.deep.include({
                            _id: "5db3433c1c9d4400005ea2cf",
                            cardNumber: "3827305806378854",
                            EURBalance: 91,
                            CNYBalance: 300,
                            password: "786215"
                        })
                        done(err)
                    })
            });
        })
        describe("When the id is invalid", () => {
            it('should return the Not Found message', done => {
                request(server)
                    .get('/card/1243314314')
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .end((err, res) => {
                        expect(res.body).to.deep.include({
                            "message": "Card Not Found"
                        })
                        done(err)
                    })

            });
        })
    })
    describe("GET /cardVUN/:userName", () => {
        it('should return the card', done => {
            request(server)
                .get('/cardVUN/876212493@gmail.com')
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .end((err, res) => {
                    expect(res.body).to.deep.include({
                        _id: "5db367af1c9d4400005ea2e9",
                        cardNumber: "2356876065282137",
                        EURBalance: 1300,
                        CNYBalance: 900,
                        password: "245032"
                    })
                    done(err)
                })
        });
    })
    describe("POST /card", () => {
        it('should return confirmation message and update database', () => {
            const card = {
                cardNumber: "9729383298302332",
                password: "532911"
            };
            return request(server)
                .post('/card')
                .send(card)
                .then(res => {
                    expect(res.body.message).equals("Card Added Successfully");
                    validID = res.body.data._id
                })
        });
        after(() => {
            return request(server)
                .get(`/card/${validID}`)
                .then(res => {
                    expect(res.body).to.deep.include({
                        cardNumber: "9729383298302332",
                        EURBalance: 0,
                        CNYBalance: 0,
                        password: "532911"
                    })
                })
        })
    })
    describe("DELETE /card/:id", () => {
        describe("When the id is valid", () => {
            it('should return the confirmation message and delete the card', () => {
                return request(server)
                    .delete(`/card/${validID}`)
                    .then(res => {
                        expect(res.body).to.include({
                            "message": "Card Deleted Successfully"
                        })
                    })
            });
            after(() => {
                return request(server)
                    .get('/card')
                    .then(res => {
                        expect(res.body.length).equals(4);
                    })
            })
        });
        describe("When the id is invalid", () => {
            it('should return the Not Found message', () => {
                return request(server)
                    .delete("/card/12433142314")
                    .then(res => {
                        expect(res.body).to.include({
                            "message": "Card Not Deleted"
                        })
                    })
            });
        })
    })
    describe("PUT /card/save/:id", () => {
        describe("When the id is valid", () => {
            describe("When the password is valid", () => {
                it('should return the confirmation message and save the money', () => {
                    let money = {
                        amount: 100,
                        password: "123456"
                    };
                    return request(server)
                        .put('/card/save/5db343801c9d4400005ea2d1')
                        .send(money)
                        .then(res => {
                            expect(res.body).to.include({
                                "message": "Money Saved Successfully"
                            })
                        })
                });
                after(() => {
                    return request(server)
                        .get('/card/5db343801c9d4400005ea2d1')
                        .then(res => {
                            expect(res.body.EURBalance).equals(1400);
                        })
                })
            })
            describe("When the password is invalid", () => {
                it('should return a confirmation message', () => {
                    return request(server)
                        .put('/card/save/5db343801c9d4400005ea2d1')
                        .send({amount: 100, password: "325253"})
                        .then(res => {
                            expect(res.body.message).equals("Invalid Password");
                        })
                });
            })
        });
        describe("When the id is invalid", () => {
            it('should return the Not Found message', () => {
                return request(server)
                    .put("/card/save/12433142314")
                    .then(res => {
                        expect(res.body).to.include({
                            "message": "Card Not Found"
                        })
                    })
            });
        })
    })
    describe("PUT /card/withdraw/:id", () => {
        describe("When the id is valid", () => {
            describe("When the password is valid", () => {
                describe("When the balance is sufficient", () => {
                    it('should return the confirmation message and withdraw the money', () => {
                        return request(server)
                            .put('/card/withdraw/5db343801c9d4400005ea2d1')
                            .send({amount: 100, password: "123456"})
                            .then(res => {
                                expect(res.body).to.include({
                                    "message": "Money Withdrew Successfully"
                                })
                            })
                    });
                    after(() => {
                        return request(server)
                            .get('/card/5db343801c9d4400005ea2d1')
                            .then(res => {
                                expect(res.body.EURBalance).equals(1300);
                            })
                    })
                })
                describe("When the balance is insufficient", () => {
                    it('should return a confirmation message', () => {
                        return request(server)
                            .put('/card/withdraw/5db343801c9d4400005ea2d1')
                            .send({amount: 4000, password: "123456"})
                            .then(res => {
                                expect(res.body.message).equals("Insufficient Balance")
                            })
                    });
                })
            })
            describe("When the password is invalid", () => {
                it('should return a confirmation message', () => {
                    return request(server)
                        .put('/card/withdraw/5db343801c9d4400005ea2d1')
                        .send({amount: 100, password: "325253"})
                        .then(res => {
                            expect(res.body.message).equals("Invalid Password");
                        })
                });
            })
        });
        describe("When the id is invalid", () => {
            it('should return the Not Found message', () => {
                return request(server)
                    .put("/card/withdraw/12433142314")
                    .then(res => {
                        expect(res.body).to.include({
                            "message": "Card Not Found"
                        })
                    })
            });
        })
    })
})