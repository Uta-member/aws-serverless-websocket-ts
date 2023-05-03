import { APIGatewayEventWebsocketRequestContextV2 } from "aws-lambda";

/**
 * websocketのエンドポイントを返す関数
 * @param requestContext eventのrequestContext
 * @returns エンドポイント
 */
export const getEndpoint = (
  requestContext: APIGatewayEventWebsocketRequestContextV2
) => {
  // ローカルでやるときとデプロイ後でhttpとhttpsを切り替える
  const { domainName, stage } = requestContext;
  /**
   * serverless-offlineでローカル実行するときのエンドポイント
   */
  const localEndpoint = "http://localhost:3001";
  /**
   * デプロイ後のエンドポイント。
   * 先頭にhttps://をつけないとエラーになります。
   * ドキュメントどおりに書くとうまくいかないのでご注意...
   */
  const cloudEndpoint = `https://${domainName}/${stage}`;

  // serverless-offlineで実行してるときは、stageがlocalになってるので
  // localのエンドポイントを使う
  const endpoint = stage === "local" ? localEndpoint : cloudEndpoint;

  return endpoint;
};
