/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { Question } from '../models/question';
import { Quiz } from '../models/quiz';
export interface OpenQuestionAnswer {
  answer: string;
  createdDate?: string;
  id?: number;
  lastModifiedDate?: string;
  question: Question;
  quiz: Quiz;
}
