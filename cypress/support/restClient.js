export class RestClient {

    sendGetRequest(apiUrl) {

        return cy.request({
            method: 'GET',
            url: apiUrl
        })

    }

    sendPostRequest(apiUrl, requestHeaders, requestPayload) {

        return cy.request({
            method: 'POST',
            url: apiUrl,
            headers: requestHeaders,
            body: requestPayload
        })

    }

}

export const restClient = new RestClient();