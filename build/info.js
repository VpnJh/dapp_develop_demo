import { getPackageSize } from "./utils";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import gradientString from "gradient-string";
import boxen from "boxen";
dayjs.extend(duration);

const welcomeMessage = gradientString("cyan", "magenta").multiline(
  `欢迎联系：志坤，Turning_sea~`
);

const boxenOptions = {
  padding: 0.5,
  borderColor: "cyan",
  borderStyle: "round"
};

export function viteBuildInfo() {
  let config;
  let startTime;
  let endTime;
  let outDir;
  return {
    name: "vite:buildInfo",
    configResolved(resolvedConfig) {
      config = resolvedConfig;
      outDir = resolvedConfig.build?.outDir ?? "dist";
    },
    buildStart() {
      console.log(boxen(welcomeMessage, boxenOptions));
      if (config.command === "build") {
        startTime = dayjs(new Date());
      }
    },
    closeBundle() {
      if (config.command === "build") {
        endTime = dayjs(new Date());
        getPackageSize({
          folder: outDir,
          callback: size => {
            console.log(
              boxen(
                gradientString("cyan", "magenta").multiline(
                  `🎉 恭喜打包完成（总用时${dayjs
                    .duration(endTime.diff(startTime))
                    .format("mm分ss秒")}，打包后的大小为${size}）`
                ),
                boxenOptions
              )
            );
          }
        });
      }
    }
  };
}
