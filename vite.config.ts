import path from "path";
import { UserConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni"; // ！此依赖不能安装
import { cool } from "./build/cool";
import { proxy } from "./cool/config/proxy";

function resolve(dir: string) {
  return path.resolve(__dirname, dir);
}

// https://vitejs.dev/config/

export default (): UserConfig => {
  return {
    plugins: [uni(), cool()],
    resolve: {
      alias: {
        "/@": resolve("./"),
        "/$": resolve("./pages/"),
      },
    },
    server: {
      port: 9900,
      proxy,
      hmr: {
        overlay: true,
      },
    },
  };
};
