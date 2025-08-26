import pino, { LoggerOptions } from 'pino';

const prettyFormat: LoggerOptions = {
  transport: {
    target: 'pino-pretty',
    options: {
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname',
      singleLine: false,
      colorize: true,
    },
  },
  level: 'debug',
};

const defaultFormat: LoggerOptions = {
  level: 'info',
  timestamp: pino.stdTimeFunctions.isoTime,
  formatters: {
    level(label) {
      return { level: label };
    },
    bindings() {
      return {};
    },
  },
};

const loggerOptions = pino(
  process.env.NODE_ENV === 'production' ? defaultFormat : prettyFormat,
);

export class DefaultLogger {
  private logger: pino.Logger;

  constructor(name?: string) {
    this.logger = pino({ ...loggerOptions, name });
  }

  init(object: { message: string; objects?: Record<string, unknown> }) {
    this.logger.info({
      ...object,
      message: `🚀🚀🚀 (INIT) ${object.message}`,
    });
  }

  process(object: { message: string; objects?: Record<string, unknown> }) {
    this.logger.info({
      ...object,
      message: `🔥🔥🔥 (PROCESS) ${object.message}`,
    });
  }

  end(object: { message: string; objects?: Record<string, unknown> }) {
    this.logger.info({
      ...object,
      message: `😍😍😍 (END) ${object.message}`,
    });
  }

  error(object: { message: string; stack?: string; context?: string }) {
    this.logger.error({
      ...object,
      message: `😿😿😿 (ERROR) ${object.message}`,
    });
  }

  processEnd(object: { message: string; objects?: Record<string, unknown> }) {
    this.logger.info({
      ...object,
      message: `❤️‍🔥❤️‍🔥❤️‍🔥 (END) (PROCESS)${object.message}`,
    });
  }

  fromError(error: unknown) {
    const { message, stack } = error as Error;

    this.logger.error({
      message: `😿😿😿 (ERROR) ${message}`,
      stack,
    });
  }
}
