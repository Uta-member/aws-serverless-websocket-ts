import { APIGatewayProxyWebsocketHandlerV2 } from "aws-lambda";
import { ApiGatewayManagementApi } from "@aws-sdk/client-apigatewaymanagementapi";
import { encodeObjectToUint8Array } from "src/common/dataEncoder";
import { getEndpoint } from "src/common/endpoint";

/**
 * テストでメッセージを送信してただmessage success!!とbodyを返すだけの関数
 * @param event
 * @param _context
 * @param _callback
 * @returns
 */
const sendMessage: APIGatewayProxyWebsocketHandlerV2 = async (
  event,
  _context,
  _callback
) => {
  try {
    const apiManage = new ApiGatewayManagementApi({
      apiVersion: "2018-11-29",
      endpoint: getEndpoint(event.requestContext),
    });

    const data = encodeObjectToUint8Array({
      message: "message success!!",
      body: event.body,
    });

    // 送る処理
    await apiManage.postToConnection({
      ConnectionId: event.requestContext.connectionId,
      Data: data,
    });

    return {
      statusCode: 200,
      body: "sendMessage",
    };
  } catch (err) {
    console.log(err);
  }
};

export const main = sendMessage;
