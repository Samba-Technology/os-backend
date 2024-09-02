import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Ocurrence } from '@prisma/client';
import { Server } from 'http';

@WebSocketGateway({
  cors: {
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class OccurrencesGateway {
  @WebSocketServer() server: Server;

  notifyNewOccurrence(occurrence: Ocurrence) {
    this.server.emit('newOccurrence', occurrence);
  }

  notifyEditOccurrence(occurrence: Ocurrence) {
    this.server.emit('editOccurrence', occurrence);
  }
}
