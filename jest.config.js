import { pathsToModuleNameMapper } from "ts-jest";
import tsconfig from "./tsconfig.json" assert { type: "json" };

const { paths, baseUrl } = tsconfig.compilerOptions;

const jestConfig = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>"],
  modulePaths: [baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(paths, { prefix: "<rootDir>/", useESM: true })
};

export default jestConfig;