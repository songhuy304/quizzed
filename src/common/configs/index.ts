import { ConfigFactory } from '@nestjs/config';
import appConfig from './app.config';
import authConfig from './auth.config';

const configs: ConfigFactory[] = [appConfig, authConfig];

export default configs;
