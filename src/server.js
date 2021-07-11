import sirv from "sirv";
import polka from "polka";
import compression from "compression";
import * as sapper from "@sapper/server";

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

polka() // You can also use Express
  .use(
    compression({ threshold: 0 }),
    sirv("static", { dev }), // 爲 static 目録提供對外訪問服務
    sapper.middleware() // 必須要導入 app.use(sapper.middleware())
  )
  // 必須監聽 process.env.PORT 端口
  .listen(PORT, (err) => {
    if (err) console.log("error", err);
  });
