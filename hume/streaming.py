import asyncio

from hume import HumeStreamClient, StreamSocket
from hume.models.config import FaceConfig

async def main():
    client = HumeStreamClient("q0DM8nNcAAYH9n0rXPecNcHUbSmHUJnqJDJeW77i7OMLuaLr")
    config = FaceConfig(identify_faces=True)
    async with client.connect([config]) as socket:
        result = await socket.send_file("./data/streaming.json")
        print(result)

asyncio.run(main())