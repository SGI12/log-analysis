import socket
import struct

class Client:
    def __init__(self):
        self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    def connect(self, host: str, port: int):
        self.socket.connect((host, port))

    def disconnect(self):
        self.socket.close()

    def send(self, data):
        request = struct.pack(">I", len(data)) + data.encode()
        self.socket.sendall(request)

    def receiveImpl(self, size):
        data = bytearray()
        while len(data) < size:
            packet = self.socket.recv(size - len(data))
            if not packet:
                return None

            data.extend(packet)

        return data

    def receive(self):
        raw_message_length = self.socket.recv(4)
        if not raw_message_length:
            return None

        message_length = struct.unpack(">I", raw_message_length)[0]
        return self.receiveImpl(message_length).decode()
