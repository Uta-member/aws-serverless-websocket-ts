import { APIGatewayProxyWebsocketHandlerV2 } from "aws-lambda";

/**
 * websocket切断時の処理
 * @param _event
 * @param _context
 * @param _callback
 * @returns
 */
const onDisconnect: APIGatewayProxyWebsocketHandlerV2 = async (
  _event,
  _context,
  _callback
) => {
  try {
    console.log("disconnected!!");
    return {
      statusCode: 200,
      body: "disconnected",
    };
  } catch (err) {
    console.log(err);
  }
};

export const main = onDisconnect;
