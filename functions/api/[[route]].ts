interface Env {
  API_URL: string;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  let request_path = context.functionPath.slice(5);
  const api_url = context.env.API_URL;
  let new_url = api_url + request_path;
  return await fetch(new_url, context.request);
};
