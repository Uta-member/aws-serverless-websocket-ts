import { APIGatewayProxyWebsocketHandlerV2 } from "aws-lambda";

/**
 * websocket接続時の処理
 * @param _event
 * @param _context
 * @param _callback
 * @returns
 */
const onConnect: APIGatewayProxyWebsocketHandlerV2 = async (
  _event,
  _context,
  _callback
) => {
  try {
    console.log("connected!!");
    return {
      statusCode: 200,
      body: "connected",
    };
  } catch (err) {
    console.log(err);
  }
};

export const main = onConnect;
