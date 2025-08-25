import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Res,
  Get,
} from '@nestjs/common';
import { AuthJwtSingInRepostory } from './repositories/auth-jwt-sigin.repository';
import { RegisterDto, SignInDto } from './auth.dto';
import { FastifyReply } from 'fastify';
import { AuthJwtRegisterMobileRepository } from './repositories/auth-jwt-register-mobile.repository';
import { CurrentUserOrNull, JwtUser } from '@shared/decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private authJwtSingInRepostory: AuthJwtSingInRepostory,
    private authJwtRegisterMobileRepository: AuthJwtRegisterMobileRepository,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    return this.authJwtSingInRepostory.signIn(
      response,
      signInDto.email,
      signInDto.password,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post('login-mobile')
  async signInMobile(@Body() signInDto: SignInDto) {
    const result = await this.authJwtSingInRepostory.signInMobile(
      signInDto.email,
      signInDto.password,
    );

    return result;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register-mobile')
  async registerMobile(@Body() registerDto: RegisterDto) {
    return this.authJwtRegisterMobileRepository.execute(
      registerDto.name,
      registerDto.email,
      registerDto.password,
    );
  }

  @Get('is_logged')
  async isLogged(@CurrentUserOrNull() user: JwtUser | null) {
    return { isLogged: !!user };
  }
}
