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
})