import { Box, Typography, Container, Card, CardHeader, CardContent, List, ListItem, Grid } from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useScenario } from "@/hooks";
import { ITeam } from "@/types/ActivityInterface";
import { useEffect } from "react";
import { IScenarioStand } from "@/types/ScenarioInterface";

const GeneralView: React.FC = () => {
  const { currentScenario, loading, error, refreshScenario } = useScenario();

  useEffect(() => {
    refreshScenario();
  }, []);

  // Récupérer les données du scénario
  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{ display: "flex", flexDirection: "column", height: "100%", paddingBottom: "70px" }}
    >
      <Box sx={{ p: 2 }}>
        <Typography component="h1" variant="h5" align="center" sx={{ mb: 2 }}>
          Vue générale de l'activité
        </Typography>
        {error && !currentScenario && (
          <Box>
            <Typography component="h1" variant="h5" align="center" sx={{ mb: 2 }}>
              Oups :(
            </Typography>
            <Typography align="center">{error.message}</Typography>
          </Box>
        )}
        {!loading && (
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%" // Remplit toute la largeur de la vue
              }}
            >
              <RefreshIcon
                onClick={() => refreshScenario()}
                sx={{
                  fontSize: 30, // Taille de l'icône
                  cursor: "pointer", // Curseur pointer au survol
                  "&:hover": {
                    color: "primary.main", // Changer la couleur au survol
                    transform: "scale(1.2)" // Zoom au survol
                  }
                }}
              />
            </Box>

            {currentScenario && currentScenario.length > 0 ? (
              <Grid container spacing={2}>
                {currentScenario[0].map((stand: IScenarioStand) => (
                  <Grid item xs={12} sm={6} key={stand.standId}>
                    <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                      <CardHeader
                        title={stand.standName}
                        avatar={<StorefrontIcon />}
                        titleTypographyProps={{ variant: "h5" }}
                      />
                      <CardContent>
                        {Array.isArray(stand.teams) && stand.teams.length > 0 ? (
                          <List>
                            {stand.teams.map((team: ITeam) => (
                              <ListItem key={team.teamId} sx={{ py: 0.5 }}>
                                {team.teamName}
                              </ListItem>
                            ))}
                          </List>
                        ) : (
                          <Typography>Aucune équipe disponible</Typography>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography>Aucune activité en cours</Typography>
            )}
          </>
        )}
      </Box>
    </Container>
  );
};

export default GeneralView;
