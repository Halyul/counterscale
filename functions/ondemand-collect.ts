import { collectRequestHandler } from "~/analytics/ondemand-collect";

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
    return collectRequestHandler(request, env);
};
