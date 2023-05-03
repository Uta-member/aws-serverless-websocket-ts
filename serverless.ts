import type { AWS } from "@serverless/typescript";

import hello from "@functions/hello";
import defaultFunction from "@functions/defaultFunction";
import onConnect from "@functions/onConnect";
import onDisconnect from "@functions/onDisconnect";
import sendMessage from "@functions/sendMessage";

const serverlessConfiguration: AWS = {
  service: "aws-websocket-ts",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild", "serverless-offline"],
  provider: {
    name: "aws",
    // 18にする
    runtime: "nodejs18.x",
    // websocket関連の機能を使うには以下を追記
    websocketsApiName: "websocket-test",
    websocketsApiRouteSelectionExpression: "$request.body.action",
    websocketsDescription: "band assists api websocket",

    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
  },
  // import the function via paths
  // functionsに関数を追加する
  functions: { hello, onConnect, onDisconnect, defaultFunction, sendMessage },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      // 18にする
      target: "node18",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
