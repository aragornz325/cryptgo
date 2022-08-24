import { Controller, Request, Post, UseGuards, Res, Get } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {  
  constructor(private authService: AuthService){}

  @UseGuards(LocalAuthGuard)
  @Post('api/auth/login')
  async login(@Request() req) {
    const login = await this.authService.login(req.user);
    if(login.access_token){
      req.session.access_token = login.access_token;
    }
    req.session.save()
    return login;
  }

  @Post('api/auth/logout')
  async logout(@Request() req) {
    req.session.destroy((err)=>{
      return {error: 'Could not log out of user session'};
    });
    console.log('User logged out.')
    return {success: 'Logged out from user session'};
  }

  @Post('api/auth/user')
  async getUser(@Request() req) {
    return await this.authService.getUserData(req.session.access_token);
  }

}