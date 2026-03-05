import Block from "components/services/widget/block";
import Container from "components/services/widget/container";
import { useTranslation } from "next-i18next";

import useWidgetAPI from "utils/proxy/use-widget-api";

export default function Component({ service }) {
  const { t } = useTranslation();
  const { widget } = service;

  const { data: modelsData, error: modelsError } = useWidgetAPI(widget, "models");
  const { data: runningData, error: runningError } = useWidgetAPI(widget, "running");
  const { data: versionData, error: versionError } = useWidgetAPI(widget, "version");

  const error = modelsError ?? runningError ?? versionError;
  if (error) {
    return <Container service={service} error={error} />;
  }

  if (!modelsData || !runningData || !versionData) {
    return (
      <Container service={service}>
        <Block label="ollama.models" />
        <Block label="ollama.running" />
        <Block label="ollama.version" />
      </Container>
    );
  }

  return (
    <Container service={service}>
      <Block label="ollama.models" value={t("common.number", { value: modelsData.models_count })} />
      <Block label="ollama.running" value={t("common.number", { value: runningData.running_count })} />
      <Block label="ollama.version" value={versionData.version} />
    </Container>
  );
}
