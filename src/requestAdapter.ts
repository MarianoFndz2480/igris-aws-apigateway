import { APIGatewayEvent } from 'aws-lambda'
import { RequestAdapter, UseCaseRequest, ErrorResponse, SuccessResponse } from 'igris-core'

export class AWSApiGatewayRequestAdapter implements RequestAdapter {
    parseRequest(event: APIGatewayEvent): UseCaseRequest {
        const request: UseCaseRequest = {
            payload: {},
            token: '',
            queryParams: {},
            pathParams: {},
            headers: {},
        }

        if (event.body) request.payload = JSON.parse(event.body)

        if (event.headers) request.headers = event.headers

        if (event.headers['Authorization']) request.token = event.headers['Authorization']

        if (event.pathParameters) request.pathParams = event.pathParameters

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

    parseResponse(response: SuccessResponse | ErrorResponse): string | object {
        const body = JSON.stringify(response)

        return {
            statusCode: response.httpStatus,
            body,
        }
    }
}
