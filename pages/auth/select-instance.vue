<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'

let instance: Ref<string | undefined> = ref()

const login = (instance: string | undefined) => {
    console.log(instance)
    if (!instance) {
        return
    }

    // instance.valueにhttps://を含むかどうか
    if (!instance?.startsWith('https://')) {
        instance = 'https://' + instance
    }
    

    // UUIDの生成
    const session: string = uuidv4();
    // callbackURLの生成
    const callbackURL = new URL(window.location.href).hostname + "/auth/callback";

    // URL以降のパスを削除しhttps://{host}/miauth/{session}に置き換え
    const url = new URL(instance);
    url.pathname = '/miauth/' + session;
    // パラメタ系
    // ?name=MiSpace&permission=read:account&callback
    url.searchParams.append('name', 'MiSpace');
    url.searchParams.append('permission', 'read:account');
    url.searchParams.append('callback', callbackURL);

    // リダイレクト
    return navigateTo(url.href, { external: true, });
}
</script>

<template>
    <div class="h-full">
        <div class="relative overflow-hidden">
            <div class="mx-auto max-w-screen-md py-12 px-4 sm:px-6 md:max-w-screen-xl md:py-20 lg:py-32 md:px-8">
                <div class="md:pe-8 md:w-1/2 xl:pe-0 xl:w-5/12">
                    <!-- Title -->
                    <h1 class="text-3xl text-gray-800 font-bold md:text-4xl md:leading-tight lg:text-5xl lg:leading-tight dark:text-neutral-200">
                        ログインして<span class="text-blue-600 dark:text-blue-500">MiSpace</span>を始めよう
                    </h1>
                    <p class="mt-3 text-base text-gray-500 dark:text-neutral-500">
                        ほげほげふがふが
                    </p>
                    <!-- End Title -->

                    <div class="mt-8 grid">
                        <button type="button" class="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-green-600 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                        Sign up with misskey.io
                        </button>
                    </div>

                    <div class="py-6 flex items-center text-sm text-gray-400 uppercase before:flex-1 before:border-t before:me-6 after:flex-1 after:border-t after:ms-6 dark:text-neutral-500 dark:before:border-neutral-700 dark:after:border-neutral-700">Or</div>

                    <form @submit.prevent="login(instance)">
                        <div class="mb-4">
                        <label for="hs-hero-password-2" class="block text-sm font-medium dark:text-white"><span class="sr-only">Password</span></label>
                        <input type="text" v-model="instance" class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="インスタンスURL" required>
                        </div>

                        <div class="grid">
                        <button type="submit" class="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">ログイン</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </div>
</template>