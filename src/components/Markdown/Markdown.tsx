import { Paper, Typography } from "@mui/material";
import { ComponentProps } from "react";
import ReactMarkdown from "react-markdown";

type MarkdownProps = Pick<ComponentProps<typeof ReactMarkdown>, "children">;

export default function Markdown(props: MarkdownProps) {
  return <ReactMarkdown {...props} components={MARKDOWN_COMPONENTS} />;
}

const MARKDOWN_COMPONENTS: ComponentProps<typeof ReactMarkdown>["components"] =
  {
    p: ({ ref: _, ...props }) => (
      <Typography variant="body1" paragraph {...props} />
    ),
    h1: ({ ref: _, ...props }) => (
      <Typography variant="h4" {...props} gutterBottom />
    ),
    h2: ({ ref: _, ...props }) => (
      <Typography variant="h5" {...props} gutterBottom />
    ),
    h3: ({ ref: _, ...props }) => (
      <Typography variant="h6" {...props} gutterBottom />
    ),
    h4: ({ ref: _, ...props }) => (
      <Typography variant="h6" color="textSecondary" gutterBottom {...props} />
    ),
    h5: ({ ref: _, ...props }) => (
      <Typography variant="h6" color="textSecondary" gutterBottom {...props} />
    ),
    h6: ({ ref: _, ...props }) => (
      <Typography variant="h6" color="textSecondary" gutterBottom {...props} />
    ),
    strong: ({ ref: _, ...props }) => (
      <Typography {...props} component="strong" fontWeight="bold" />
    ),
    em: ({ ref: _, ...props }) => <Typography {...props} component="em" />,
    code: ({ ref: _, ...props }) => (
      <Paper square sx={(theme) => ({ p: theme.spacing(1) })}>
        <Typography
          variant="body2"
          fontFamily="monospace"
          component="code"
          {...props}
        />
      </Paper>
    ),
    li: ({ ref: _, ...props }) => (
      <Typography variant="body1" component="li" {...props} />
    ),
    a: ({ ref: _, ...props }) => (
      <Typography variant="inherit" component="a" color="primary" {...props} />
    ),
  } as const;
