import { Box, alpha } from "@mui/material";

export default function Cross() {
  // TODO: +length, +thickness, +alpha
  return (
    <>
      <Box
        width={100}
        height={5}
        borderRadius={5}
        bgcolor={(theme) => alpha(theme.palette.primary.main, 0.5)}
        position="fixed"
        top="50%"
        left="50%"
        marginTop="-2.5px"
        marginLeft="-50px"
        zIndex={(theme) => theme.zIndex.appBar - 1}
      />
      <Box
        width={5}
        height={100}
        borderRadius={5}
        bgcolor={(theme) => alpha(theme.palette.primary.main, 0.5)}
        position="fixed"
        top="50%"
        left="50%"
        marginTop="-50px"
        marginLeft="-2.5px"
        zIndex={(theme) => theme.zIndex.appBar - 1}
      />
    </>
  );
}
