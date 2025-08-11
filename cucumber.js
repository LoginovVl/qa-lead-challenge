module.exports = {
  default: [
    "--require-module ts-node/register",
    "--require support/hooks.ts",
    "--require support/world.ts",
    "--require e2e/features/step_definitions/**/*.ts",
    "--publish-quiet",
    "e2e/features/*.feature"
  ].join(" ")
};