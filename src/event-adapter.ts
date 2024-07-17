import { APIGatewayEvent } from 'aws-lambda'
import { RequestAdapter, CommonRequest, ResponseError, ResponseSuccess } from 'igris-core'

export class AWSApiGatewayRequestAdapter extends RequestAdapter {
    parseInput(event: APIGatewayEvent): CommonRequest {
        const request: CommonRequest = {
            payload: {},
            token: '',
            queryParams: {},
            headers: {},
        }

        if (event.body) request.payload = JSON.parse(event.body)

        if (event.headers) request.headers = event.headers

        if (event.headers['Authorization']) request.token = event.headers['Authorization']

        if (event.queryStringParameters) request.queryParams = this.formatQueryParams(event.queryStringParameters)

        return request
    }

    private formatQueryParams(queryParams: Record<string, any>) {
        const keys = Object.keys(queryParams)

        keys.forEach((key) => {
            queryParams[key] = JSON.parse(queryParams[key])
        })

        return queryParams
    }

    parseResponse(response: ResponseSuccess | ResponseError): any {
        if (response instanceof ResponseSuccess)
            return {
                statusCode: response.code,
                body: JSON.stringify(response.data),
            }

        return {
            statusCode: response.code,
            body: JSON.stringify({ message: response.message, errorName: response.name }),
        }
    }
}
