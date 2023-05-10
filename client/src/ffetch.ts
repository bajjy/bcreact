const HOST = 'http://localhost:5001';

const ffetch = async <T>(
  url: string,
  options?:{
    method?: string,
    body?: any,
  }
): Promise<T> => {
  const res = await fetch(`${HOST}${url}`, {
    method: (options && options.method) || 'GET',
    // @ts-ignore
    headers: {
      'Content-type': 'application/json',
      'x-access-token': localStorage.getItem('x-access-token'),
    },
    body: options?.body && JSON.stringify(options.body),
  });

  return await res.json();
};

export default ffetch;