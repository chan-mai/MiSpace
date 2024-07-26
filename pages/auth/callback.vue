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
        /*await fetch(
            `/api/getToken`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    session: session,
                    instance: instance
                })
            }
        ).then((data: any) => {
            console.log(data);
            console.log(data.body);
            console.log(data.ok, data.token);

        });*/

        $fetch(
            `${instance}/api/miauth/${session}/check`,
            {
                method: 'POST',
            }
        ).then((data: any) => {
            console.log(data);
            console.log(data.ok, data.token);

            if( data?.ok && data?.token !== undefined ) {
                sessionStorage.setItem('token', data.token);
            } else {
                console.error('token not found');
                navigateTo('/auth/select-instance');
            }
        });

        
    });

    

</script>

<template>

</template>