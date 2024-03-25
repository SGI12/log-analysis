import asyncio
import struct
from modules.logging.logger import *

class Server:
    def __init__(self, host, port, callback):
        self.host = host
        self.port = port
        self.callback = callback
        self.context = None
        self.server = None

    async def run(self):
        self.server = await asyncio.start_server(self.handleClient, self.host, self.port)
        print("server is running")

        async with self.server:
            await self.server.serve_forever()

    async def handleClient(self, reader, writer):
        print("accepted new client")

        # Читаем длину сообщения
        raw_message_length = await reader.read(4)
        if not raw_message_length:
            return None

        message_length = struct.unpack(">I", raw_message_length)[0]

        # Читаем сообщение
        request = bytearray()
        while len(request) < message_length:
            packet = await reader.read(message_length - len(request))
            if not packet:
                return None

            request.extend(packet)

        request = request.decode()

        response = self.callback(self.context, request)
        response = struct.pack(">I", len(response)) + response.encode()

        writer.write(response)

    def stop(self):
        self.server.stop()
