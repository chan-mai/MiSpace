<script setup lang="ts">
    onMounted(async () => {
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
        } else {
            console.error('token not found');
            navigateTo('/auth/select-instance');
        }
    });
</script>

<template>

</template>