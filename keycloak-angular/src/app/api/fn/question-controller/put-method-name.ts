/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Question } from '../../models/question';

export interface PutMethodName$Params {
      body: Question
}

export function putMethodName(http: HttpClient, rootUrl: string, params: PutMethodName$Params, context?: HttpContext): Observable<StrictHttpResponse<Question>> {
  const rb = new RequestBuilder(rootUrl, putMethodName.PATH, 'put');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Question>;
    })
  );
}

putMethodName.PATH = '/question';
