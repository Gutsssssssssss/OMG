package com.ssafy.omg.domain.room.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RoomInfo implements Serializable {
    private String roomId;
    private String hostNickname;
    @JsonProperty("inRoomPlayers")
    private List<InRoomPlayer> inRoomPlayers;

    public RoomInfo(String roomId, String hostNickname) {
        this.roomId = roomId;
        this.hostNickname = hostNickname;
        this.inRoomPlayers = new ArrayList<>();
        this.inRoomPlayers.add(new InRoomPlayer(hostNickname, false));
    }
}
