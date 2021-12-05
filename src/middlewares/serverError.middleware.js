/* eslint-disable no-unused-vars */
import { statusCode } from '../enums/httpStatus.js';

const serverError = async (error, req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(error);
  res.sendStatus(statusCode.INTERNAL_SERVER_ERROR);
};

export default serverError;
