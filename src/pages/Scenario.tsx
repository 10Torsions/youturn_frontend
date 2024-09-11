import { Box, CssBaseline, Typography, Card, CardContent, CardHeader, List, ListItem } from "@mui/material";
import { useScenario } from "@/hooks";
import { ITeam } from "@/types/ActivityInterface";

const Scenario: React.FC = () => {
  const { scenario, loading, error } = useScenario();

  return (
    <Box sx={{ flexGrow: 1, overflowY: "auto", padding: 3 }}>
      <CssBaseline />
      {/* Content Area */}
      <Box
        flexGrow={1}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 2, // Adding some padding inside the box
          overflow: "auto" // Allows scrolling inside this box if content overflows
        }}
      >
        {loading && (
          <Typography component="h1" variant="h5" align="center" sx={{ mb: 2 }}>
            Loading...
          </Typography>
        )}
        {error && !scenario && (
          <Box>
            <Typography component="h1" variant="h5" align="center" sx={{ mb: 2 }}>
              Oups :(
            </Typography>
            <Typography align="center">{error.message}</Typography>
          </Box>
        )}
        {!loading && (
          <>
            <Typography>Affichage du scenario :</Typography>
            {scenario && scenario.length > 0 ? (
              scenario.map((turn, index) => (
                <Card key={index} sx={{ mb: 1, width: "90%", maxWidth: 700, padding: 0 }}>
                  <CardHeader title={`Tour n°${index + 1}`} />
                  <CardContent>
                    {Array.isArray(turn) &&
                      turn.map((stand, standIndex) => (
                        <Box key={standIndex} sx={{ mb: 1 }}>
                          <Typography variant="subtitle1">Stand {stand.standName}</Typography>
                          <List>
                            {stand.teams &&
                              Array.isArray(stand.teams) &&
                              stand.teams.map((team: ITeam) => (
                                <ListItem key={team.teamId} sx={{ py: 0.5 }}>
                                  {team.teamName}
                                </ListItem>
                              ))}
                          </List>
                        </Box>
                      ))}
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography>Pas de scénario créé pour cette activité</Typography>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default Scenario;
