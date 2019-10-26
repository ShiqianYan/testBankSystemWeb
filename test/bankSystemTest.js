const chai = require("chai");
const server = require("../bin/www");
const expect = chai.expect;
const request = require("supertest");
const _ = require("lodash");

let validID;

