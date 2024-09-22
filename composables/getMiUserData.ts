export const getMiUserData = async (instance:string, token: string) => {
  const { data, execute, status, error } = await useFetch<any>(`/api/i`,
    {
        method: 'POST',
        baseURL: instance,
        headers: {
          'content-type': 'application/json',
        },
        body: {
          'i': token
        }
    });

  while(status.value === 'idle') {
    await execute();
  }

  return {
    user: data.value ?? null,
    execute,
    status,
    error
  }
}