/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import store from './src/Redux/store/store';
import { Provider as PaperProvider } from 'react-native-paper'; // Import PaperProvider
import 'react-native-gesture-handler';


const RootApp = () => (
    <Provider store={store}>
    <PaperProvider> 
      <App />
    </PaperProvider>
    </Provider>
  );

AppRegistry.registerComponent(appName, () => RootApp);
