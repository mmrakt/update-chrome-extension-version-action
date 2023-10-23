import * as core from "@actions/core";

type Layer = "major" | "minor" | "patch";

const run = () => {
  try {
    const targetLayer = core.getInput("layer") as Layer;
    const currentVersion = core.getInput("version");
    const updatedVersion = getUpdatedVersion(targetLayer, currentVersion);

    core.info(updatedVersion);
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
};

const getUpdatedVersion = (layer: Layer, currentVersion: string) => {
  const currentVersionArr = currentVersion.split(".");
  let updatedVersionArr = currentVersionArr;
  switch (layer) {
    case "major":
      updatedVersionArr[0] = updatedVersionArr[0] + 1;
      updatedVersionArr[1] = "0";
      updatedVersionArr[2] = "0";
    case "minor":
      updatedVersionArr[1] = updatedVersionArr[1] + 1;
      updatedVersionArr[2] = "0";
    case "patch":
      updatedVersionArr[2] = updatedVersionArr[2] + 1;
  }
  return updatedVersionArr.join("");
};

run();
