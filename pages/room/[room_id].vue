<script setup lang="ts">
    import { Room } from 'livekit-client';

    // room_idの取得
    const route = useRoute();
    const roomId: string | undefined = route.params.room_id as string;

    // paramsからwsUrlとtokenを取得
    const wsURL = route.query.wsUrl as string;
    const token = route.query.token as string;

    onMounted(async () => {
        if ( !roomId ) navigateTo('/');

        const room = new Room();
        await room.connect(wsURL, token);
        console.log('connected to room', room.name);

        // Publish local mic tracks
        await room.localParticipant.setMicrophoneEnabled(true);
    });

</script>

<template>

</template>