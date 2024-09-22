<script setup lang="ts">
import { fromJSON } from 'postcss';

    const roomName = ref('');
    const isLoaded = ref(false);
    const username = ref('');

    onMounted(async () => {
        try {
            const token: string | undefined = sessionStorage.getItem('token') as string;
            const instance: string | undefined = sessionStorage.getItem('instance') as string;
            if (!token || !instance) {
                console.error('token not found');
                navigateTo('/auth/select-instance');
            }
        } catch (e) {
            console.error('token not found');
            navigateTo('/auth/select-instance');
        }

        const token: string = sessionStorage.getItem('token') as string;
        const instance: string = sessionStorage.getItem('instance') as string;

        // ユーザーデータの取得
        const { user } = await getMiUserData(instance, token);
        console.log(user);

        // 有効なTokenではないあるいは何かしらのエラーがあった場合
        if (!user.id) navigateTo('/auth/select-instance');
        else isLoaded.value = true;

        // カスタム絵文字はレイアウト崩しかねないので置き換え
        username.value = user.name.replace(/:(.*)/g, '▫️');
    });

    const createNewRoom = async () => {
        if (!roomName.value) alert('スペース名を入力してください');

        const token: string = sessionStorage.getItem('token') as string;
        const instance: string = sessionStorage.getItem('instance') as string;

        // roomの作成
        const { data, execute, status, error } = await useFetch<any>(`/api/room/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                instance: instance,
                token: token,
                roomName: roomName.value,
            }),
        });

        const json = JSON.parse(data.value);

        console.log(json.wsUrl);
        console.log(json.accessToken);

        if ( json.roomId === undefined || json.wsUrl === undefined || json.accessToken === undefined ) {
            alert('スペースの作成に失敗しました');
            return;
        }

        console.log(json);
        console.log(`/room/${json.roomId}?wsUrl=${json.wsUrl}&token=${json.accessToken}`);
        // /room/[room_id]に遷移
        navigateTo(`/room/${json.roomId}?wsUrl=${json.wsUrl}&token=${json.accessToken}`);
    }
</script>

<template>
    <div v-if="!isLoaded" class="h-screen flex flex-col bg-white dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
        <div class="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
            <div class="flex justify-center">
            <div class="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500" role="status" aria-label="loading">
                <span class="sr-only">Loading...</span>
            </div>
            </div>
            <p class="text-lg text-center mt-4">しばらくお待ちください。</p>
        </div>
    </div>
    <div v-else class="h-screen flex justify-center items-center">
        <div class="border rounded-xl p-10">
            <h1 class="text-5xl">ようこそ <span class="text-blue">{{ username }}</span></h1>
            <h2 class="text-2xl text-gray-700 mt-3">新しいスペースを作ってコミュニケーションを始める</h2>
            <div class="mt-10">
                <div id="hs-wrapper-for-copy" class="space-y-3 mb-3">
                    <input v-model="roomName" type="text" class="py-3 px-4 block w-full border rounded-lg text-sm dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500" placeholder="スペースの名前を入力" />
                </div>
                <div class="inline-flex w-full justify-end">
                    <button @click="createNewRoom" type="button" class="py-3 px-4 gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:hover:text-white dark:focus:bg-white/20 dark:focus:text-white">
                    スペースを開く
                    </button>
                </div>
            </div>
            <div class="mt-10 inline-flex w-full justify-center">
                <a>または、</a>
                <button type="button" class="mx-1 gap-x-2 text-sm font-medium underline text-rose-500">
                    スペースに参加する
                </button>
            </div>
        </div>
    </div>
</template>