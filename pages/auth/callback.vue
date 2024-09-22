<script setup lang="ts">
    onMounted(async () => {
        
        // すでにtokenがある場合はリダイレクト
        if (sessionStorage.getItem('token') && sessionStorage.getItem('instance')) {
            navigateTo('/');
        }

        const route = useRoute();
        const session: string | undefined = route.query.session as string;

        const instance: string | undefined = sessionStorage.getItem('instance') as string;

        if (!instance || !session) {
            console.error('instance not found');
            navigateTo('/auth/select-instance');
        }

        // トークンの取得
        const { user, token } = await useMiAuthCheck(instance, session);
        console.log(user);
        console.log(token);

        if( token != null ) {
            sessionStorage.setItem('token', token);
            navigateTo('/');
        } else {
            console.error('token not found');
            navigateTo('/auth/select-instance');
        }
    });
</script>

<template>
    <div class="h-screen flex flex-col bg-white dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
        <div class="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
            <div class="flex justify-center">
            <div class="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500" role="status" aria-label="loading">
                <span class="sr-only">Loading...</span>
            </div>
            </div>
            <p class="text-lg text-center mt-4">照会中です。しばらくお待ちください。</p>
        </div>
    </div>

</template>