import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ArtworkEntity } from "../../artwork/artworkModel";
import { useArtworkListQuery } from "../../artwork/artworkService";
import DrawerContent from "../../drawer/DrawerContent/DrawerContent";
import DrawerIconButton from "../../drawer/DrawerIconButton/DrawerIconButton";
import HomeIconButton from "../HomeIconButton/HomeIconButton";

export default function MapToolbar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const artworkListQuery = useArtworkListQuery();

  const handleChange = (_: unknown, artwork: ArtworkEntity) => {
    navigate(`/map/${artwork.latitude}/${artwork.longitude}/18/${artwork.id}`);
  };

  // TODO: add author name to option items to prevent ambiguity between artwork with the same title (Senza titolo)

  return (
    <Autocomplete
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={t("Search")}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <DrawerIconButton drawer={<DrawerContent />} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <HomeIconButton />
              </InputAdornment>
            ),
          }}
        />
      )}
      fullWidth
      disableClearable
      forcePopupIcon={false}
      options={artworkListQuery.data ?? []}
      getOptionLabel={(option) => option.title}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      onChange={handleChange}
      getOptionKey={(option) => option.id}
    />
  );
}
