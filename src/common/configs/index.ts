import { ConfigFactory } from '@nestjs/config';
import appConfig from './app.config';
import authConfig from './auth.config';
import docConfig from './doc.config';

const configs: ConfigFactory[] = [appConfig, authConfig, docConfig];

export default configs;
