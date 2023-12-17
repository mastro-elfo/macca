import { Paper, Typography } from "@mui/material";
import { ComponentProps } from "react";
import ReactMarkdown from "react-markdown";

type MarkdownProps = Pick<ComponentProps<typeof ReactMarkdown>, "children">;

export default function Markdown(props: MarkdownProps) {
  return <ReactMarkdown {...props} components={MARKDOWN_COMPONENTS} />;
}

const MARKDOWN_COMPONENTS: ComponentProps<typeof ReactMarkdown>["components"] =
  {
    p: ({ ref, ...props }) => (
      <Typography variant="body1" paragraph {...props} />
    ),
    h1: ({ ref, ...props }) => (
      <Typography variant="h4" {...props} gutterBottom />
    ),
    h2: ({ ref, ...props }) => (
      <Typography variant="h5" {...props} gutterBottom />
    ),
    h3: ({ ref, ...props }) => (
      <Typography variant="h6" {...props} gutterBottom />
    ),
    h4: ({ ref, ...props }) => (
      <Typography variant="h6" color="textSecondary" gutterBottom {...props} />
    ),
    h5: ({ ref, ...props }) => (
      <Typography variant="h6" color="textSecondary" gutterBottom {...props} />
    ),
    h6: ({ ref, ...props }) => (
      <Typography variant="h6" color="textSecondary" gutterBottom {...props} />
    ),
    strong: ({ ref, ...props }) => (
      <Typography {...props} component="strong" fontWeight="bold" />
    ),
    em: ({ ref, ...props }) => <Typography {...props} component="em" />,
    code: ({ ref, ...props }) => (
      <Paper square sx={(theme) => ({ p: theme.spacing(1) })}>
        <Typography
          variant="body2"
          fontFamily="monospace"
          component="code"
          {...props}
        />
      </Paper>
    ),
    li: ({ ref, ...props }) => (
      <Typography variant="body1" component="li" {...props} />
    ),
    a: ({ ref, ...props }) => (
      <Typography variant="inherit" component="a" color="primary" {...props} />
    ),
  } as const;
