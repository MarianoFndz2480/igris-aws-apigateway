import { APIGatewayEvent } from 'aws-lambda'
import { ApiController, GenericHandlerInput, ResponseError, ResponseSuccess } from 'igris-core'

export class AWSApiGatewayController extends ApiController {
    parseInput(event: APIGatewayEvent): GenericHandlerInput {
        const handlerInput: GenericHandlerInput = {
            payload: {},
            token: '',
            queryParams: {},
        }

        if (event.body) handlerInput.payload = JSON.parse(event.body)

        if (event.headers['Authorization']) handlerInput.token = event.headers['Authorization']

        if (event.queryStringParameters) handlerInput.queryParams = this.formatQueryParams(event.queryStringParameters)

        return handlerInput
    }

    parseResponse(response: ResponseSuccess | ResponseError) {
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

    private formatQueryParams(queryParams: Record<string, any>) {
        const keys = Object.keys(queryParams)

        keys.forEach((key) => {
            queryParams[key] = JSON.parse(queryParams[key])
        })

        return queryParams
    }
}
