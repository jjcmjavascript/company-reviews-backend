// Import with `const Sentry = require("@sentry/nestjs");` if you are using CJS
import { config } from '@config/config';
import * as Sentry from '@sentry/nestjs';
import { nodeProfilingIntegration } from '@sentry/profiling-node';

Sentry.init({
  dsn: config().sentry.dsn,
  integrations: [nodeProfilingIntegration()],
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
});
