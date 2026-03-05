import genericProxyHandler from "utils/proxy/handlers/generic";

const widget = {
  api: "{url}/api/{endpoint}",
  proxyHandler: genericProxyHandler,

  mappings: {
    models: {
      endpoint: "tags",
      map: (data) => ({ models_count: data?.models?.length ?? 0 }),
    },
    running: {
      endpoint: "ps",
      map: (data) => ({ running_count: data?.models?.length ?? 0 }),
    },
    version: {
      endpoint: "version",
    },
  },
};

export default widget;
