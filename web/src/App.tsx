import styles from "./App.module.scss";
import { debugData } from "./utils/debugData";
import MainContent from "./contents/MainContent";
import { useNuiEvent } from "./hooks/useNuiEvent";
import { setPathImage } from "./utils/image";

debugData([
  {
    action: 'setVisible',
    data: true
  }
]);

function App() {
  useNuiEvent('setPathImage', (data: string) => {
    setPathImage(data)
  })
  
  return (
    <>
      <div className={styles.App}>
        <MainContent />
      </div>
    </>
  );
}

export default App;
