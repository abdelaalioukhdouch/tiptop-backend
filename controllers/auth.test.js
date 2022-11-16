const loginUser = require('./auth')

test('loginUser() enter a valid email address', () => {
    const result = loginUser(1,2)
    expect(result).toBe(3)
})