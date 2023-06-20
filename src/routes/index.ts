import { ApiRequest, ApiResponse, Route, methods } from "@sapphire/plugin-api";

export class IndexRoute extends Route {
  public constructor(context: Route.Context, options: Route.Options) {
    super(context, {
      ...options,
      route: "/",
    });
  }

  public [methods.GET](_req: ApiRequest, res: ApiResponse) {
    return res.status(200).json({
      error: false,
      message: "Welcome to the API!"
    });
  }
}