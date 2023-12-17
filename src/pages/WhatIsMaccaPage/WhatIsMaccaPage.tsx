import { useTranslation } from "react-i18next";
import Markdown from "../../components/Markdown/Markdown";
import WorkInProgressAlert from "../../components/WorkInProgressAlert/WorkInProgressAlert";
import PageLayout from "../../layouts/PageLayout/PageLayout";

export default function WhatIsMaccaPage() {
  const { t } = useTranslation();

  return (
    <PageLayout
      title={t("What is MACCA?")}
      py={1}
      background={{
        image: "slide-opera-MACCA.jpg",
        absolutePath: true,
        position: "bottom",
        size: false,
        opacity: 0.25,
      }}
    >
      <WorkInProgressAlert />
      <Markdown>{`
# MACCA 

Il **MACCA – Museo D’Arte Contemporanea a Cielo Aperto** è un’istituzione che raccoglie sotto un’unica direzione le progettualità artistiche disseminate sul territorio di Peccioli e le sue frazioni. Il museo ospita una moltitudine di opere d’arte contemporanea, frutto di un lavoro trentennale in relazione con artisti e artiste che nel tempo sono stati invitati a sviluppare progetti in sintonia con il territorio pecciolese.

Fonte: [https://www.peccioli.net/m-a-c-c-a-2/](https://www.peccioli.net/m-a-c-c-a-2/)

`}</Markdown>
    </PageLayout>
  );
}
