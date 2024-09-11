import { useContext } from "react";
import useActiveComponent from "@/hooks/useActiveComponent";
import NavbarUp from "@/components/NavbarUp";
import ActivityForm from "@/components/Activity/Form/ActivityForm";
import NavbarDown from "@/components/NavbarDown";
import Scenario from "./Scenario";
import GeneralView from "./GeneralView";
import ActivityChoice from "./ActivityChoice";
import { ActivityContext } from "@/contexts/ActivityContext";
// import { CustomSnackbarMethods } from "@/types/SnackbarTypes";
// import useCheckAuthentication from "@/hooks/useCheckAuthentication";

const Gamemaster: React.FC = () => {
   // Accès au contexte
   const context = useContext(ActivityContext);

   if (!context) {
     throw new Error("ActivityContext must be used within an ActivityProvider");
   }
 
   const { activityId } = context;
  // const snackbarRef = useRef<CustomSnackbarMethods>(null);

  // // Utilisation du hook de vérification de l'authentification
  // useCheckAuthentication(snackbarRef);

  const { setActiveComponent, renderActiveComponent } = useActiveComponent({
    defaultComponent: "ActivityForm",
    components: {
      ActivityForm: <ActivityForm chosenActivityId={activityId} />,
      Scenario: <Scenario/>,
      GeneralView: <GeneralView />
    }
  });

  return (
    <>
      <NavbarUp role={"Maitre du jeu"} animatorStandSetted={false} />

      {/* If activity is not yet selected, choice ou create activity */}
      {!activityId ? (
        <ActivityChoice/>
      ) : (
        <>
          {renderActiveComponent()}
          <NavbarDown setActiveComponent={setActiveComponent} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default Gamemaster;
