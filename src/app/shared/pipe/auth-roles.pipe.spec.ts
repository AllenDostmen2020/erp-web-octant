import { AuthRolesPipe } from './auth-roles.pipe';

describe('AuthRolesPipe', () => {
  it('create an instance', () => {
    const pipe = new AuthRolesPipe();
    expect(pipe).toBeTruthy();
  });
});
