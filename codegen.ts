import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:1337" + "/graphql",
  // this assumes that all your source files are in a top-level `src/` directory - you might need to adjust this to your file structure
  documents: ["src/**/*.{ts,tsx,astro,graphql}"],
  generates: {
    "./src/graphql/__generated__/file.graphql": {
      plugins: ["schema-ast"],
    },
    "./src/graphql/__generated__/introspection.json": {
      plugins: ["introspection"],
      config: {
        minify: true,
      },
    },
    "./src/graphql/__generated__/operations.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-document-nodes",
      ],
    },
    "./src/graphql/__generated__/fragment-matcher.ts": {
      plugins: ["fragment-matcher"],
    },
    // "./src/graphql/__generated__/": {
    //   preset: "client",
    //   plugins: [
    //     "typescript",
    //     "typescript-operations",
    //     "typescript-document-nodes",
    //   ],
    //   presetConfig: {
    //     gqlTagName: "gql",
    //     includeIntrospectionTypes: true,
    //   },
    // },
  },
  ignoreNoDocuments: true,
};

export default config;
