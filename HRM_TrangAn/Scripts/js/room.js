var room_Token;
//var roomId;
var room;
var callClient;
$(document).ready(function () {
    api.setRestToken();
    console.log(roomId);
    //roomId = window.location.href.split("#")[0].split("?")[1].split("=")[1];
    join();
})
async function join() {
    const roomToken = await api.getRoomToken(roomId);
    room_Token = roomToken;

    await authen();
    await publish();
}

function authen() {
    return new Promise(async resolve => {
        //const userId = (Math.random() * 100000).toFixed(0);
        const userToken = await api.getUserToken(userId);

        if (!callClient) {
            const client = new StringeeClient();
            client.on('connect', function () {
                console.log('connected');
            });
            client.on("authen", function (res) {
                console.log("on authen: ", res);
                resolve(res);
            });
            callClient = client;
        }
        callClient.connect(userToken);
    });
}

async function publish(screenSharing = false) {
    const localTrack = await StringeeVideo.createLocalVideoTrack(
        callClient,
        {
            audio: true,
            video: true,
            screen: screenSharing,
            videoDimensions: { width: 640, height: 360 }
        }
    );

    const videoElement = localTrack.attach();
    addVideo(userId, videoElement);

    const roomData = await StringeeVideo.joinRoom(
        callClient,
        room_Token
    );
    const _room = roomData.room;
    console.log({ roomData, room });

    if (!room) {
        room = _room;
        room.clearAllOnMethos();
        room.on("addtrack", function (e) {
            const track = e.info.track;

            console.log("addtrack", track);
            if (track.serverId === localTrack.serverId) {
                console.log("local");
                return;
            }
            subscribe(track);
        });

        room.on("removetrack", function (e) {
            const track = e.track;
            if (!track) {
                return;
            }

            const mediaElements = track.detach();
            mediaElements.forEach(element => element.remove());
        });

        // Join existing tracks
        $.each(roomData.listTracksInfo, function (index, item) {
            console.log(item);
            subscribe(item)
        })
    }

    await room.publish(localTrack);
    console.log("room publish successful");
}

function addVideo(iduser, video) {
    video.setAttribute("controls", "true");
    video.setAttribute("playsinline", "true");
    var videoContainer = document.querySelector("#videos-" + iduser);
    videoContainer.appendChild(video);
}

async function subscribe(trackInfo) {
    const track = await room.subscribe(trackInfo.serverId);
    track.on("ready", function () {
        console.log(track);
        const videoElement = track.attach();
        addVideo(trackInfo.userPublish, videoElement);
    });
}