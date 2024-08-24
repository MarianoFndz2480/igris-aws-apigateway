import { RequestAdapter, RequestProcessor } from 'igris-core'
import { AWSApiGatewayRequestAdapter } from './event-adapter'

export class AWSApiGatewayRequestProcessor extends RequestProcessor {
    static getRequestAdapter(): RequestAdapter {
        return new AWSApiGatewayRequestAdapter()
    }
}
