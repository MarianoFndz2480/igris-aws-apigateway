import { RequestAdapter, RequestProcessor } from 'igris-core'
import { AWSApiGatewayRequestAdapter } from './event-adapter'

export class AWSApiGatewayRequestProcessor extends RequestProcessor {
    getRequestAdapter(): RequestAdapter {
        return new AWSApiGatewayRequestAdapter()
    }
}
