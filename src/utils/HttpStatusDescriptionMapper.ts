import { HttpStatus } from '@nestjs/common';

export const mapHttpStatusCodeToDescription = (statusCode: HttpStatus) => new Map([
  [HttpStatus.BAD_REQUEST, 'The server cannot or will not process the request due to something that is perceived to be a client error'],
  [HttpStatus.UNAUTHORIZED, 'The request has not been applied because it lacks valid authentication credentials for the target resource'],
  [HttpStatus.FORBIDDEN, 'The server understood the request but refuses to authorize it'],
  [HttpStatus.NOT_FOUND, 'The origin server did not find a current representation for the target resource or is not willing to disclose that one exists'],
  [HttpStatus.REQUEST_TIMEOUT, 'The server did not receive a complete request message within the time that it was prepared to wait'],
  [HttpStatus.GONE, 'The target resource is no longer available at the origin server and that this condition is likely to be permanent'],
  [HttpStatus.PRECONDITION_FAILED, 'One or more conditions given in the request header fields evaluated to false when tested on the server'],
  [HttpStatus.UNPROCESSABLE_ENTITY, 'The server understands the content type of the request entity, and the syntax of the request entity is correct but was unable to process the contained instructions'],
  [HttpStatus.INTERNAL_SERVER_ERROR, 'The server encountered an unexpected condition that prevented it from fulfilling the request'],
  [HttpStatus.BAD_GATEWAY, 'The server, while acting as a gateway or proxy, received an invalid response from an inbound server it accessed while attempting to fulfill the request'],
  [HttpStatus.SERVICE_UNAVAILABLE, 'The server is currently unable to handle the request due to a temporary overload or scheduled maintenance, which will likely be alleviated after some delay'],
  [HttpStatus.GATEWAY_TIMEOUT, 'The server, while acting as a gateway or proxy, did not receive a timely response from an upstream server it needed to access in order to complete the request'],
]).get(statusCode);
