import { getJestProjectsAsync } from '@nx/jest';
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

export default async () => ({
  projects: await getJestProjectsAsync(),
});
