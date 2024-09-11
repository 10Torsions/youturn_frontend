import React, { useContext, useRef, useState } from "react";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import ActivitySelection from "@/components/Activity/ActivitySelection";
import CustomSnackbar from "@/components/CustomSnackbar";
import { CustomSnackbarMethods } from "@/types/SnackbarTypes";
import { ACTIVITY_API } from "@/routes/api/";
import { ActivityContext } from "@/contexts/ActivityContext"; // Assurez-vous que ce chemin est correct
import { useAuth } from "@/hooks"


interface IActivities {
  id: number;
  name: string;
}

const ActivityChoice: React.FC = () => {
  const { userId, csrfToken } = useAuth();

  const snackbarRef = useRef<CustomSnackbarMethods>(null);
  // Get selected activity
  const [selectedActivity, setSelectedActivity] = useState<IActivities | null>(null);
  const [newActivityName, setNewActivityName] = useState<string>("");

  // Accès au contexte
  const context = useContext(ActivityContext);

  if (!context) {
    throw new Error("ActivityContext must be used within an ActivityProvider");
  }

  const { setActivityData } = context;

  const handleActivityNameChange = (name: string) => {
    setNewActivityName(name);
  };

  const handleCreateActivity = async () => {
    if (!newActivityName || newActivityName === "") {
      snackbarRef.current?.showSnackbar("Il faudrait choisir un nom d'activité", "warning");
      return;
    }
    try {
      const response = await fetch(`${ACTIVITY_API.activities}/`, {
        method: "POST",
        headers: {
          "x-xsrf-token": csrfToken as string,
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name: newActivityName, user: userId }),
      });

      const responseData = await response.json();
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      setActivityData(responseData.activity_id);
    } catch (error) {
      snackbarRef.current?.showSnackbar(`Echec lors de la création de l'activité : ${error}`, "error");
      console.error(`Failed to create activity: `, error);
    }
  };

  const handleActivitySelect = (activity: IActivities | null) => {
    setSelectedActivity(activity); // Temporarily store the selected activity
  };

  const handleJoinActivity = () => {
    if (!selectedActivity) {
      snackbarRef.current?.showSnackbar("Il faudrait choisir une activité !", "warning");
      return;
    }
    setActivityData(selectedActivity.id); // Mise à jour du contexte

  };

  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{
        marginTop: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "85%",
        p: 2, // Padding général pour l'intérieur du conteneur
        height: "75vh",
        justifyContent: "center"
      }}
    >
      <Typography variant="h6" component="h1" sx={{ mb: 2 }}>
        Choisissez votre activité
      </Typography>

      <Grid container gap={5}>
        <Grid item xs={12}>
          <ActivitySelection onActivitySelect={handleActivitySelect} />
          <Button variant="contained" color="primary" onClick={handleJoinActivity} sx={{ mt: 1, mb: 2, width: "100%" }}>
            Rejoindre
          </Button>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Nom de l'activité"
            sx={{ width: "100%" }}
            variant="outlined"
            value={newActivityName}
            onChange={e => handleActivityNameChange(e.target.value)}
          />

          <Button variant="contained" sx={{ mt: 1, mb: 2, width: "100%" }} onClick={handleCreateActivity}>
            Créer
          </Button>
        </Grid>
        <CustomSnackbar ref={snackbarRef} />
      </Grid>
    </Container>
  );
};

export default ActivityChoice;
