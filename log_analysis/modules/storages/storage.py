import psycopg2 as pg

class ConnectionData:
    def __init__(self):
        self.host = None
        self.port = None
        self.database = None
        self.user = None
        self.password = None

class Storage:
    def __init__(self, connection_data):
        self.connection = pg.connect(host=connection_data.host, port=connection_data.port, dbname=connection_data.database, user=connection_data.user, password=connection_data.password)

    def do(self, query, should_return=False):
        transaction = self.connection.cursor()
        transaction.execute(query)

        self.connection.commit()

        if should_return:
            return transaction.fetchall()
