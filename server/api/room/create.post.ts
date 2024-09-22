import { AccessToken } from 'livekit-server-sdk';

const wsUrl = process.env.LIVEKIT_WS_URL;
const livekitApiKey = process.env.LIVEKIT_API_KEY;
const livekitApiSecret = process.env.LIVEKIT_API_SECRET;

export default defineEventHandler(async (event) => {
    // ログイン元instance, tokenと任意roomIDを取得
    const body: any = await readBody(event);
    const instance: string | undefined = body.instance as string;
    const token: string | undefined = body.token as string;
    const roomName: string | undefined = body.roomName as string;

    // ユーザー名の取得
    try{
      const data: any = await $fetch(`${instance}/api/i`,
      {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            'i': token
          })
      });
        
      if (!data.username) return new Response('Unauthorized', { status: 401 });

      // 乱数生成
      const roomId: string = Math.random().toString(32).substring(2);
      const userName: string | undefined = data.username;
      const displayRoomName: string = `${roomName} - @${userName}@${instance.replace('https://', '')}`;
  
      console.log(`Creating room ${displayRoomName} with id ${roomId}`);
  
      const at = new AccessToken(livekitApiKey, livekitApiSecret, {
        identity: roomId,
        ttl: '5m',
      });
      at.addGrant({ roomJoin: true, room: displayRoomName, canPublish: true, canSubscribe: true });
      const accessToken: string = await at.toJwt();

      return new Response(JSON.stringify({ "roomId": roomId, "wsUrl": wsUrl, "accessToken": accessToken }), { status: 200 });

    } catch (e) {
      return new Response('Internal Server Error'+ e, { status: 500 });
    }
});