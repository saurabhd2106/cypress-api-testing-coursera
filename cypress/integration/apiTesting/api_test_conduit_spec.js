/// <reference types="cypress" />

import { restClient } from "../../support/restClient";

describe("API Testing of Conduit App", function () {

    let token;

    beforeEach(() => {

        cy.loginToApplication("saurabh@fake.com", 'admin')

        token = Cypress.env('token')

    })

    it("GET Tags API", () => {
        restClient.sendGetRequest('http://localhost:3000/api/tags')
            .then(response => {
                cy.log(JSON.stringify(response))

                expect(response.status).to.equal(200)

                expect(response.body.tags).to.contains("cypress")
            })
    })

    it("Add article", () => {

        restClient.sendPostRequest('http://localhost:3000/api/articles',
        {
            "Authorization": "Token " + token
        },
        {
            "article": {
                "title": "Cypress articles from cypress code",
                "description": "This is regarding Cypress",
                "body": "Cypress is a test automation tool",
                "tagList": [
                    "Cypress",
                    "Test"
                ]
            }
        }).then(response => {
            expect(response.status).to.equal(200)
        })

    })

    it("Edit Article", () => {

        let slug

        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/api/articles',
            headers: {
                "Authorization": "Token " + token
            },
            body: {
                "article": {
                    "title": "Cypress articles from cypress code",
                    "description": "This is regarding Cypress",
                    "body": "Cypress is a test automation tool",
                    "tagList": [
                        "Cypress",
                        "Test"
                    ]
                }
            }
        }).then(response => {
            expect(response.status).to.equal(200)

            slug = response.body.article.slug

            cy.log(slug)

            //Edit Article

            cy.request({

                method: 'PUT',
                url: 'http://localhost:3000/api/articles/' + slug,
                headers: {
                    "Authorization": "Token " + token
                },
                body: {
                    "article": {
                        "title": "Cypress articles from cypress code edited",
                        "description": "This is regarding Cypress edited",
                        "body": "Cypress is a test automation tool",
                        "tagList": [
                            "Cypress",
                            "Test"
                        ]
                    }
                }

            }).then(response => {
                expect(response.status).to.equal(200)

                expect(response.body.article.title).to.equal("Cypress articles from cypress code edited")
            })
        })

    })

    it("Delete Article", () => {

        let slug

        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/api/articles',
            headers: {
                "Authorization": "Token " + token
            },
            body: {
                "article": {
                    "title": "Cypress articles from cypress code",
                    "description": "This is regarding Cypress",
                    "body": "Cypress is a test automation tool",
                    "tagList": [
                        "Cypress",
                        "Test"
                    ]
                }
            }
        }).then(response => {
            expect(response.status).to.equal(200)

            slug = response.body.article.slug

            cy.log(slug)

            //Delete Article

            cy.request({

                method: 'DELETE',
                url: 'http://localhost:3000/api/articles/' + slug,
                headers: {
                    "Authorization": "Token " + token
                }

            }).then(response => {
                expect(response.status).to.equal(204)


            })
        })

    })
})