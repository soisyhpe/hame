// dependencies
import { object, string } from 'yup';
import { EMAIL_REGEX, PASSWORD_REGEX, IP_ADDRESS_REGEX } from '../../tools/validation_tools.js';

const sessionSchema = object(
  {
    body: object({
      email: string().matches(EMAIL_REGEX, 'body.email is not valid').required(),
      password: string().matches(PASSWORD_REGEX, 'body.password is not valid').required(),
      ip_address: string().matches(IP_ADDRESS_REGEX, 'body.ip_address is not valid').optional()
    })
  }
);

export { sessionSchema };