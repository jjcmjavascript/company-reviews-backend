import { SetMetadata } from '@nestjs/common';

export const IS_LOGED_KEY = 'isLoged';

export const Loged = () => SetMetadata(IS_LOGED_KEY, true);
