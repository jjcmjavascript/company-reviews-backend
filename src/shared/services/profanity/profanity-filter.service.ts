import leoProfanity from 'leo-profanity';
import fs from 'fs';
import path from 'path';
import { Injectable } from '@nestjs/common';
import { ProfanityLanguage } from './profanity.types';
import { DefaultLogger } from '../logger.service';

@Injectable()
export class ProfanityFilterService {
  private readonly logger = new DefaultLogger(ProfanityFilterService.name);
  currentLanguage: ProfanityLanguage = 'es';
  private initialized = false;

  constructor() {
    this.initDictionary();
  }

  private initDictionary() {
    if (this.initialized) return;

    try {
      const candidates = [
        path.resolve(__dirname, 'dictionaries/es.txt'),
        path.resolve(
          process.cwd(),
          'src/shared/services/profanity/dictionaries/es.txt',
        ),
        path.resolve(
          process.cwd(),
          'dist/shared/services/profanity/dictionaries/es.txt',
        ),
      ];

      const filePath = candidates.find((p) => fs.existsSync(p));

      if (!filePath) {
        this.logger.end({
          message:
            'Profane dictionary file not found; using builtin dictionaries only',
        });
      } else {
        const spanishList = fs
          .readFileSync(filePath, 'utf8')
          .split(/\r?\n/)
          .map((w) => w.trim())
          .filter(Boolean);

        leoProfanity.addDictionary('es', spanishList);
        this.logger.process({
          message: `Loaded profanity dictionary from ${filePath}`,
        });
      }

      this.initialized = true;
    } catch (err) {
      this.logger.fromError(err);
    }
  }

  public loadDictionary(language: ProfanityLanguage): void {
    if (language !== this.currentLanguage) {
      this.currentLanguage = language;
      leoProfanity.loadDictionary(language);
    }
  }

  public containsProfanity(
    text: string,
    language: ProfanityLanguage = 'es',
  ): {
    hasProfanity: boolean;
    cleaneable: boolean;
  } {
    this.initDictionary();
    this.loadDictionary(language);
    const normalized = this.normalize(text);

    // Chequeo directo
    if (leoProfanity.check(normalized))
      return { hasProfanity: true, cleaneable: true };

    // Chequeo por fragmentos dentro de palabras largas
    //TODO: habilitar si se desea esta funcionalidad , tengo q ver como lo mejoro
    // const tokens = normalized.split(/\s+/);

    // for (const token of tokens) {
    //   for (const bad of leoProfanity.list()) {
    //     if (token.includes(bad)) {
    //       return { hasProfanity: true, cleaneable: false };
    //     }
    //   }
    // }

    return { hasProfanity: false, cleaneable: false };
  }

  public clean(text: string, language: ProfanityLanguage = 'es'): string {
    this.initDictionary();
    this.loadDictionary(language);

    const normalized = this.normalize(text);
    if (!leoProfanity.check(normalized)) return text; // no hay groserías

    // Mapea las groserías del normalizado al texto original
    const words = normalized.split(/\b/);
    const cleanedWords = words.map((word) =>
      leoProfanity.check(word) ? '*'.repeat(word.length) : word,
    );

    return cleanedWords.join('');
  }

  /** 🧠 Normaliza SOLO para detección */
  private normalize(text: string): string {
    return text
      .toLowerCase()
      .replace(/[@4áàä]/g, 'a')
      .replace(/[3éèë]/g, 'e')
      .replace(/[1!|íìï]/g, 'i')
      .replace(/[0óòö]/g, 'o')
      .replace(/[5\$]/g, 's')
      .replace(/[7]/g, 't')
      .replace(/[^a-z0-9\s]/g, '');
  }
}
