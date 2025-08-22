describe('BancoXYZ App', () => {
  it('should pass basic math test', () => {
    expect(1 + 1).toBe(2);
  });

  it('should handle string operations', () => {
    const appName = 'BancoXYZ';
    expect(appName).toBe('BancoXYZ');
    expect(appName.length).toBe(8);
  });

  it('should handle array operations', () => {
    const users = ['Gabriel', 'Alejo', 'Wilson'];
    expect(users).toHaveLength(3);
    expect(users).toContain('Gabriel');
  });
});
