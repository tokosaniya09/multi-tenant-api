export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/*.spec.ts'],
    setupFiles: ['<rootDir>/test/setup.ts'],
};
