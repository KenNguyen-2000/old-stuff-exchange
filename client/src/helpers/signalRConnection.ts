import * as signalR from '@microsoft/signalr';
import interceptor from '../services/interceptor';
import * as SecureStorage from 'expo-secure-store';
import { navigate } from '../helpers/navigation.service';

class SignalRService {
  connection: signalR.HubConnection | null = null;

  getConnection = () => {
    if (!this.connection)
      this.connection = new signalR.HubConnectionBuilder()
        .withUrl(interceptor.getUri() + '/hub', {
          accessTokenFactory: async () => {
            const token = await SecureStorage.getItemAsync('token');

            return `${token}`;
          },
        })
        .build();

    return this.connection;
  };

  startConnection = async () => {
    try {
      const connection = this.getConnection();
      if (connection.state === signalR.HubConnectionState.Disconnected) {
        await connection.start();
        console.log('Connection started');
      }
    } catch (error) {
      console.log('Error on start connection ', error);
    }
  };

  stopConnection = async () => {
    try {
      if (this.connection) {
        await this.connection.stop();
        console.log('Connection terminated');
      }
    } catch (error) {
      console.log('Error on terminate connection');
    }
  };

  reconnect = async () => {
    if (
      this.connection &&
      this.connection.state === signalR.HubConnectionState.Disconnected
    ) {
      try {
        await this.connection.start();
        console.log('SignalR reconnected');
      } catch (error) {
        console.log('SignalR reconnection error: ', error);
      }
    }
  };
}

const signalRService = new SignalRService();
export default signalRService;
