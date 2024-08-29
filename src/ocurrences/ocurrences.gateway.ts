import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Ocurrence } from '@prisma/client';
import { Server } from 'http';

@WebSocketGateway({
  cors: {
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class OcurrencesGateway {
  @WebSocketServer() server: Server;

  notifyNewOcurrence(ocurrence: Ocurrence) {
    this.server.emit('newOcurrence', ocurrence);
  }

  notifyEditOcurrence(ocurrence: Ocurrence) {
    this.server.emit('editOcurrence', ocurrence);
  }
}
