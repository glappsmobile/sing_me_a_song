/* eslint-disable no-unused-vars */
import { statusCode } from '../enums/httpStatus.js';

const serverError = async (err, req, res, next) => res.sendStatus(statusCode.INTERNAL_SERVER_ERROR);

export default serverError;
