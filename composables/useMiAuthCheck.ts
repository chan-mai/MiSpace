export type MiAuthReturn = {
  user: {
    id: string,
    username: string,
    name: string,
    lang: string,
    isCat: boolean,
    avatarUrl: string,
    [key: string]: any,
  },
  token: string
}

export const useMiAuthCheck = async (instance:string, session: string) => {
  const { data, execute, status, error } = await useFetch<MiAuthReturn>(`/api/miauth/${session}/check`,
    {
        method: 'POST',
        baseURL: instance,
    });

  while(status.value === 'idle') {
    await execute();
  }

  return {
    user: data.value?.user ?? null,
    token: data.value?.token ?? null,
    execute,
    status,
    error
  }
}