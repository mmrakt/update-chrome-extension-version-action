import * as core from "@actions/core";

type Layer = "major" | "minor" | "patch";

const run = () => {
  try {
    const targetLayer = core.getInput("layer") as Layer;
    const currentVersion = core.getInput("version");

    if (!isValidSemanticVersioning(currentVersion)) throw new Error();

    const updatedVersion = getUpdatedVersion(targetLayer, currentVersion);
    core.setOutput("version", updatedVersion);
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
};

const isValidSemanticVersioning = (version: string) => {
  const regex = new RegExp(
    /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/
  );
  return regex.test(version);
};

const getUpdatedVersion = (layer: Layer, currentVersion: string) => {
  const currentVersionArr = currentVersion.split(".");

  let updatedVersionArr = currentVersionArr;
  switch (layer) {
    case "major":
      updatedVersionArr[0] = String(Number(updatedVersionArr[0]) + 1);
      updatedVersionArr[1] = "0";
      updatedVersionArr[2] = "0";
      break;
    case "minor":
      updatedVersionArr[1] = String(Number(updatedVersionArr[1]) + 1);
      updatedVersionArr[2] = "0";
      break;
    case "patch":
      updatedVersionArr[2] = String(Number(updatedVersionArr[2]) + 1);
      break;
  }
  return updatedVersionArr.join(".");
};

run();
