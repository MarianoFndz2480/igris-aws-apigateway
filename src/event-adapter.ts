import { APIGatewayEvent } from 'aws-lambda'
import { RequestAdapter, CommonRequest, ResponseError, ResponseSuccess } from 'igris-core'

export class AWSApiGatewayRequestAdapter extends RequestAdapter {
    parseRequest(event: APIGatewayEvent): CommonRequest {
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

    private formatQueryParams(queryParams: Record<string, string | undefined>) {
        const keys = Object.keys(queryParams)

        keys.forEach((key) => {
            if (typeof queryParams[key] !== 'undefined') {
                queryParams[key] = JSON.parse(queryParams[key] as string)
            }
        })

        return queryParams
    }

    parseResponse(response: ResponseSuccess | ResponseError): { statusCode: number; body: string } {
        const body =
            response instanceof ResponseSuccess
                ? JSON.stringify(response.data)
                : JSON.stringify({ message: response.message, errorName: response.name })

        return {
            statusCode: response.code,
            body,
        }
    }
}
