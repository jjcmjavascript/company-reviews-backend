import leoProfanity from 'leo-profanity';
import fs from 'fs';
import path from 'path';
import { Injectable, Logger } from '@nestjs/common';

export type LeoLanguage = 'es' | 'en';

@Injectable()
export class ProfanityFilterService {
  private readonly logger = new Logger(ProfanityFilterService.name);
  currentLanguage: LeoLanguage = 'es';
  private initialized = false;

  constructor() {
    this.initDictionary();
  }

  private initDictionary() {
    if (this.initialized) return;

    try {
      const candidates = [
        path.resolve(__dirname, 'spanish-words.txt'), // when running from ts-node / dev
        path.resolve(
          process.cwd(),
          'src/shared/services/profanity/spanish-words.txt',
        ),
        path.resolve(
          process.cwd(),
          'dist/shared/services/profanity/spanish-words.txt',
        ), // after build
      ];

      const filePath = candidates.find((p) => fs.existsSync(p));
      if (!filePath) {
        this.logger.warn(
          'profane dictionary file not found; using builtin dictionaries only',
        );
      } else {
        const spanishList = fs
          .readFileSync(filePath, 'utf8')
          .split(/\r?\n/)
          .map((w) => w.trim())
          .filter(Boolean);

        leoProfanity.addDictionary('es', spanishList);
        this.logger.log(`Loaded profanity dictionary from ${filePath}`);
      }

      this.initialized = true;
    } catch (err) {
      this.logger.error('Error initializing profanity dictionary', err as any);
    }
  }

  public clean(text: string): string {
    this.initDictionary();
    return leoProfanity.clean(text, { languages: ['es'] });
  }

  public loadDictionary(language: LeoLanguage): void {
    if (language !== this.currentLanguage) {
      this.currentLanguage = language;
      leoProfanity.loadDictionary(language);
    }
  }

  public containsProfanity(
    text: string,
    language: LeoLanguage = 'es',
  ): boolean {
    this.initDictionary();
    this.loadDictionary(language);
    return leoProfanity.check(text);
  }

  public sanitizeText(text: string): string {
    return this.clean(text);
  }
}
