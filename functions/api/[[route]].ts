interface Env {}

export const onRequest: PagesFunction<Env> = async (context) => {
  let request_path = context.functionPath.slice(5);
  const api_url = 'https://timetable-app-api.nokacper24-cfc.workers.dev/';
  let new_url = api_url + request_path;
  return await fetch(new_url, context.request);
};
