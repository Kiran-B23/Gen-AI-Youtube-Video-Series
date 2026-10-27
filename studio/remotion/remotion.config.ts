import path from "path";
import { Config } from "@remotion/cli/config";
Config.setVideoImageFormat("jpeg");
Config.setJpegQuality(95);
Config.setOverwriteOutput(true);
// project stages live in ../projects/<slug>/remotion/: resolve react/remotion from this engine only (one React copy)
const NM = path.join(process.cwd(), "node_modules");
Config.overrideWebpackConfig((c) => ({
  ...c,
  resolve: { ...c.resolve, modules: [NM, "node_modules"],
    alias: { ...(c.resolve?.alias ?? {}), react: path.join(NM, "react"), "react-dom": path.join(NM, "react-dom"), remotion: path.join(NM, "remotion") } },
}));
